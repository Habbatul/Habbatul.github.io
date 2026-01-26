import { Client } from "@notionhq/client";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const run = async () => {
    const res = await notion.search({
        filter: {
            property: "object",
            value: "data_source",
        },
    });

    console.log(
        res.results.map(ds => ({
            id: ds.id,
            title: ds.title?.[0]?.plain_text,
        }))
    );
};

run();
