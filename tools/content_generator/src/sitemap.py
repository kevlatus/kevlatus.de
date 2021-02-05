from __future__ import annotations
from datetime import datetime
import glob
import json
from os.path import join
import re
from typing import List

from .blog import Article

DOMAIN = "https://www.kevlatus.de"


def build_page_paths() -> List[str]:
    exclude_pattern = re.compile(r"\\[_[][^.]*.tsx")
    return [
        file_path.replace("pages\\", "")
        .replace(".tsx", "")
        .replace("\\index", "")
        .replace("index", "")
        for file_path in glob.glob("pages/**/*.tsx", recursive=True)
        if exclude_pattern.search(file_path) is None
    ]


def build_blog_paths(articles: List[Article]) -> List[str]:
    return ["blog/{}".format(article.slug) for article in articles]


def build_page_entry(path: str, date: datetime) -> str:
    date_str = re.sub(r"T.*", "", date.isoformat())
    return "<url><loc>{}/{}</loc><lastmod>{}</lastmod></url>".format(
        DOMAIN, path, date_str
    )


def build_sitemap(articles: List[Article]) -> str:
    paths = [*build_page_paths(), *build_blog_paths(articles)]
    entries = [build_page_entry(path, datetime.now()) for path in paths]

    return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">{}</urlset>'.format(
        "".join(entries)
    )


def write_sitemap(sitemap: str) -> None:
    with open("public/sitemap.xml", "w") as file:
        file.write(sitemap)
