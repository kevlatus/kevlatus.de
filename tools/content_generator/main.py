from __future__ import annotations

from notion.client import NotionClient
from os import environ

from src.blog import (
    ArticleStatus,
    fetch_articles,
    write_article_file,
    write_article_list,
)
from src.sitemap import build_sitemap, write_sitemap

if __name__ == "__main__":

    notion_client = NotionClient(token_v2=environ.get("NOTION_TOKEN"))

    articles = fetch_articles(
        notion_client, [ArticleStatus.Final.value, ArticleStatus.Draft.value]
    )
    for article in articles:
        write_article_file(article)

    write_article_list(articles)

    sitemap = build_sitemap(articles)
    write_sitemap(sitemap)
