from datetime import datetime
import glob
import re
from typing import List

from .blog import Article

DOMAIN = "https://www.kevlatus.de"


def build_rss_entry(article: Article) -> str:
    return "<item><title>{}</title><link>{}</link><description>{}</description></item>".format(
        article.title,
        "{}/blog/{}".format(DOMAIN, article.slug),
        article.description,
    )


def build_rss_feed(articles: List[Article]) -> str:
    entries = [build_rss_entry(article) for article in articles]
    channel_header = "<title>Kevin Latusinski's Blog</title><link>https://www.kevlatus.de/blog</link><description>Personal page and blog by Kevin Latusinski.</description>"

    return '<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel>{}{}</channel></rss>'.format(
        channel_header, "".join(entries)
    )


def write_rss_feed(rss: str) -> None:
    with open("public/rss.xml", "w") as file:
        file.write(rss)
