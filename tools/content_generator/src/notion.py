import numpy as np
import notion.block
from notion.client import NotionClient
from notion.collection import CollectionRowBlock, CollectionView
from typing import Any, List


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


def fetch_page_markdown(client: NotionClient, id: str) -> str:
    page = client.get_block(id)
    block_pairs = zip(page.children, [None] + page.children[:-1])
    converted_blocks = [
        convert_block_to_markdown(pair[0], pair[1]) for pair in block_pairs
    ]
    return "\n".join([b for b in converted_blocks if b is not None])


def fetch_collection(client: NotionClient, url: str) -> List[CollectionRowBlock]:
    view = client.get_collection_view(url)
    return [row for row in view.collection.get_rows()]
