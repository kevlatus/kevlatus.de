from __future__ import annotations

from datetime import datetime
import json
import notion.block
from notion.client import NotionClient
from notion.collection import CollectionRowBlock, CollectionView
import numpy as np
from os import environ, path
from pathlib import Path
from slugify import slugify
from typing import Any, Dict, List, Tuple


DIR_BLOG = path.join("public", "assets", "blog")
DIR_ARTICLES = path.join(DIR_BLOG, "articles")


def get_table_data(view: CollectionView) -> List[List[Any]]:
    schema = view.collection.get("schema")
    column_ids = [
        c["property"]
        for c in view.get("format.table_properties")
        if c["property"] in schema
    ]

    rows = [row for row in view.collection.get_rows()]
    if len(rows) == 0:
        return None
    column_names = [schema[id]["name"] for id in column_ids]
    column_types = [schema[id]["type"] for id in column_ids]
    values = [
        [
            str(row.get_property(c)) if row.get_property(c) is not None else ""
            for c in column_names
        ]
        for row in rows
    ]
    return [column_names] + values, column_types


def build_md_table_row(values: List[str], lengths: List[int]) -> str:
    def pad(value: str, length: int) -> str:
        return "".ljust(length - len(value))

    cells = ["| {}{} ".format(v, pad(v, lengths[i])) for i, v in enumerate(values)]
    return "".join(cells) + "|"


def build_md_table_divider(lengths: List[int], types: List[str]) -> str:
    def left_flag(type: str) -> str:
        return " "

    def content(length: int) -> str:
        return "".ljust(length, "-")

    def right_flag(type: str) -> str:
        return ":" if type == "number" else " "

    cells = [
        "|{}{}{}".format(left_flag(types[i]), content(l), right_flag(types[i]))
        for i, l in enumerate(lengths)
    ]
    return "".join(cells) + "|"


def convert_bulleted_list_block(block: notion.block.BulletedListBlock) -> str:
    return "* {}".format(block.title)


def convert_code_block(block: notion.block.CodeBlock) -> str:
    return "```{}\n{}\n```\n".format(block.language.lower(), block.title)


def convert_collection_view_block(block: notion.block.CollectionViewBlock) -> str:
    default_view = block.views[0]
    if default_view.get("type") != "table":
        print(
            "Default view for this collection is not a table. "
            "Skipping markdown generation"
        )
        return None

    table_data, table_types = get_table_data(default_view)
    if table_data is None:
        return None

    value_lengths = np.array([[len(v) for v in row] for row in table_data])
    max_lengths = np.apply_along_axis(np.max, 0, value_lengths)

    table_header = build_md_table_row(table_data[0], max_lengths)
    table_divider = build_md_table_divider(max_lengths, table_types)
    table_body = "\n".join(
        [build_md_table_row(row, max_lengths) for row in table_data[1:]]
    )

    return "{}\n{}\n{}\n".format(table_header, table_divider, table_body)


def convert_image_block(block: notion.block.ImageBlock) -> str:
    return "![]({})\n".format(block.source)


def convert_numbered_list_block(block: notion.block.NumberedListBlock) -> str:
    return "1. {}".format(block.title)


def convert_page_block(block: notion.block.PageBlock) -> str:
    return None


def convert_subheader_block(block: notion.block.SubheaderBlock) -> str:
    return "## {}\n".format(block.title)


def convert_subsubheader_block(block: notion.block.SubsubheaderBlock) -> str:
    return "### {}\n".format(block.title)


def convert_text_block(block: notion.block.TextBlock) -> str:
    return "{}\n".format(block.title)


def is_list_block(block: notion.block.Block) -> bool:
    return (
        type(block) == notion.block.BulletedListBlock
        or type(block) == notion.block.NumberedListBlock
    )


def convert_block_to_markdown(
    block: notion.block.Block, previous_block: notion.block.Block
) -> str:
    cases = {
        notion.block.BulletedListBlock: convert_bulleted_list_block,
        notion.block.CodeBlock: convert_code_block,
        notion.block.CollectionViewBlock: convert_collection_view_block,
        notion.block.ImageBlock: convert_image_block,
        notion.block.NumberedListBlock: convert_numbered_list_block,
        notion.block.PageBlock: convert_page_block,
        notion.block.SubheaderBlock: convert_subheader_block,
        notion.block.SubsubheaderBlock: convert_subsubheader_block,
        notion.block.TextBlock: convert_text_block,
    }

    if type(block) in cases:
        converted = cases[type(block)](block)
        if converted is None:
            return None

        prefix = (
            "\n" if not is_list_block(block) and is_list_block(previous_block) else ""
        )
        return prefix + converted
    else:
        print("cannot convert block type " + str(type(block)))
        return None


def fetch_article_markdown(client: NotionClient, id: str) -> str:
    page = client.get_block(id)
    block_pairs = zip(page.children, [None] + page.children[:-1])
    converted_blocks = [
        convert_block_to_markdown(pair[0], pair[1]) for pair in block_pairs
    ]
    return "\n".join([b for b in converted_blocks if b is not None])


def split_article_content(markdown: str) -> Tuple[str, str]:
    lines = markdown.split("\n")
    title = lines[0][3:]
    content = "\n".join(lines[2:])
    return title, content


class Article(object):
    id: str
    timestamp: datetime
    slug: str
    content: str
    title: str
    status: str

    def __init__(
        self,
        id: str,
        title: str,
        content: str,
        timestamp: str,
        status: str,
    ) -> None:
        super().__init__()
        self.id = id
        self.timestamp = timestamp
        self.title = title
        self.content = content
        self.slug = slugify(title)
        self.status = status

    @property
    def content_path(self):
        return path.join(DIR_ARTICLES, "{}.md".format(self.slug))

    def to_dict(self) -> Dict[str, Any]:
        return {
            "content": self.content_path,
            "slug": self.slug,
            "timestamp": self.timestamp.isoformat()
            if self.timestamp is not None
            else None,
            "title": self.title,
            "status": self.status,
        }

    @staticmethod
    def from_notion_row(client: NotionClient, row: CollectionRowBlock) -> Article:
        markdown = fetch_article_markdown(client, row.id)
        title, content = split_article_content(markdown)
        timestamp = (
            row.get_property("Release Date").start
            if row.get_property("Release Date") is not None
            else None
        )
        return Article(
            id=row.id,
            title=title,
            content=content,
            timestamp=timestamp,
            status=row.Status,
        )


def write_article_file(article: Article) -> None:
    with open(
        path.join(DIR_ARTICLES, "{}.md".format(article.slug)), "w", encoding="utf-8"
    ) as file:
        file.write(article.content)


def fetch_articles(client: NotionClient) -> List[Article]:
    blog_pipeline = client.get_collection_view(
        "https://www.notion.so/165caedb0c704c538f4734687b6d10e6?v=03bee239ca704373b3cb2fb63d80271f"
    )
    rows = [
        row
        for row in blog_pipeline.collection.get_rows()
        if row.Status in ["1 draft", "2 final"]
    ]
    return [Article.from_notion_row(client, row) for row in rows]


notion_client = NotionClient(token_v2=environ.get("NOTION_TOKEN"))

articles = fetch_articles(notion_client)
Path(DIR_ARTICLES).mkdir(parents=True, exist_ok=True)
for article in articles:
    write_article_file(article)

article_json = json.dumps(
    {
        "articles": [article.to_dict() for article in articles],
    }
)
with open(path.join(DIR_BLOG, "articles.json"), "w", encoding="utf-8") as file:
    file.write(article_json)
