from datetime import datetime
from enum import Enum
import json
from os import path
from pathlib import Path
from notion.client import NotionClient
from notion.collection import CollectionRowBlock
from slugify import slugify
from typing import Any, Dict, List, Tuple

from .notion import fetch_collection, fetch_page_markdown

DIR_BLOG = path.join("public", "assets", "blog")
DIR_ARTICLES = path.join(DIR_BLOG, "articles")

URL_ARTICLE_COLLECTION = "https://www.notion.so/165caedb0c704c538f4734687b6d10e6?v=03bee239ca704373b3cb2fb63d80271f"


def split_article_content(markdown: str) -> Tuple[str, str]:
    lines = markdown.split("\n")
    title = lines[0][3:]
    content = "\n".join(lines[2:])
    return title, content


class ArticleStatus(Enum):
    Draft = "1 draft"
    Final = "2 final"


class Article(object):
    id: str
    timestamp: datetime
    slug: str
    content: str
    title: str
    status: str
    description: str

    def __init__(
        self,
        id: str,
        title: str,
        content: str,
        timestamp: str,
        status: str,
        description: str,
    ) -> None:
        super().__init__()
        self.id = id
        self.timestamp = timestamp
        self.title = title
        self.content = content
        self.slug = slugify(title)
        self.status = status
        self.description = description

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
            "description": self.description,
        }


def convert_row_to_article(row: CollectionRowBlock, markdown: str) -> Article:
    title, content = split_article_content(markdown)
    description = content[:60] + "..."
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
        description=description,
    )


def fetch_articles(
    client: NotionClient, status: List[str] = None
) -> List[Article]:
    rows = [
        row
        for row in fetch_collection(client, URL_ARTICLE_COLLECTION)
        if status is None or row.Status in status
    ]
    pages = [fetch_page_markdown(client, row.id) for row in rows]
    tuples = zip(rows, pages)
    return [convert_row_to_article(row[0], row[1]) for row in tuples]


def write_article_file(article: Article) -> None:
    Path(DIR_ARTICLES).mkdir(parents=True, exist_ok=True)
    with open(
        path.join(DIR_ARTICLES, "{}.md".format(article.slug)), "w", encoding="utf-8"
    ) as file:
        file.write(article.content)


def write_article_list(articles: List[Article]) -> None:
    article_json = json.dumps(
        {
            "articles": [article.to_dict() for article in articles],
        }
    )

    with open(path.join(DIR_BLOG, "articles.json"), "w", encoding="utf-8") as file:
        file.write(article_json)