from __future__ import annotations

from datetime import datetime
import json
import notion.block
from notion.client import NotionClient
from notion.collection import CollectionRowBlock, NotionDate
from os import environ, path
from slugify import slugify
from typing import Any, Dict, List, Tuple


DIR_BLOG = path.join("public", "assets", "blog")
DIR_ARTICLES = path.join(DIR_BLOG, "articles")


def convert_bulleted_list_block(block: notion.block.BulletedListBlock) -> str:
    return "* {}".format(block.title)


def convert_code_block(block: notion.block.CodeBlock) -> str:
    return "```{}\n{}\n```\n".format(block.language, block.title)


def convert_image_block(block: notion.block.ImageBlock) -> str:
    return "![]({})\n".format(block.source)


def convert_numbered_list_block(block: notion.block.NumberedListBlock) -> str:
    return "1. {}".format(block.title)


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
        notion.block.ImageBlock: convert_image_block,
        notion.block.NumberedListBlock: convert_numbered_list_block,
        notion.block.SubheaderBlock: convert_subheader_block,
        notion.block.SubsubheaderBlock: convert_subsubheader_block,
        notion.block.TextBlock: convert_text_block,
    }

    if type(block) in cases:
        prefix = (
            "\n" if not is_list_block(block) and is_list_block(previous_block) else ""
        )
        return prefix + cases[type(block)](block)
    else:
        print("cannot convert block type " + str(type(block)))
        return ""


def fetch_article_markdown(client: NotionClient, id: str) -> str:
    page = client.get_block(id)
    block_pairs = zip(page.children, [None] + page.children[:-1])
    converted_blocks = [
        convert_block_to_markdown(pair[0], pair[1]) for pair in block_pairs
    ]
    return "\n".join(converted_blocks)


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

    def __init__(self, id: str, title: str, content: str, timestamp: str) -> None:
        super().__init__()
        self.id = id
        self.timestamp = timestamp
        self.title = title
        self.content = content
        self.slug = slugify(title)

    def get_content_path(self) -> str:
        return path.join(DIR_ARTICLES, "{}.md".format(self.slug))

    def to_dict(self) -> Dict[str, Any]:
        return {
            "content": self.get_content_path(),
            "slug": self.slug,
            "timestamp": self.timestamp.isoformat(),
            "title": self.title,
        }

    @staticmethod
    def from_notion_row(client: NotionClient, row: CollectionRowBlock) -> Article:
        markdown = fetch_article_markdown(client, row.id)
        title, content = split_article_content(markdown)
        return Article(
            id=row.id,
            title=title,
            content=content,
            timestamp=row.get_property("Release Date").start,
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
    final_rows = [
        row for row in blog_pipeline.collection.get_rows() if row.Status == "4 final"
    ]
    return [Article.from_notion_row(client, row) for row in final_rows]


notion_client = NotionClient(token_v2=environ.get("NOTION_TOKEN"))

articles = fetch_articles(notion_client)
for article in articles:
    write_article_file(article)

article_json = json.dumps(
    {
        "articles": [article.to_dict() for article in articles],
    }
)
with open(path.join(DIR_BLOG, "articles.json"), "w", encoding="utf-8") as file:
    file.write(article_json)
