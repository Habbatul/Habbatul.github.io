import { Client, iteratePaginatedAPI } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from "fs";
import path from "path";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

const DATA_SOURCE_ID = "2f2d0dbc-0c2e-8094-98ed-000b2ab0f8cc";

//helper untuk slug
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

async function run() {
    console.log("📡 Fetching articles...");

    fs.mkdirSync("src/content", { recursive: true });

    let listOfArticles = [];

    // iteratePaginatedAPI -> otomatis handle >100 page
    for await (const page of iteratePaginatedAPI(
        notion.dataSources.query.bind(notion.dataSources),
        {
            data_source_id: DATA_SOURCE_ID,
        }
    )) {
        const props = page.properties;
        const title = props.Name?.title?.[0]?.plain_text || "untitled";
        const published = props.Status?.status?.name === "Published";
        if (!published) continue;
        const slug = props.Slug?.rich_text?.[0]?.plain_text || slugify(title);
 
        const publicationDate = props.PublicationDate?.date?.start || new Date().toISOString().split('T')[0];
        const updateDate = props.UpdateDate?.date?.start || null;
        // console.log(updateDate);
        const category = props.Category?.status?.name;
        
        let mdBlocks = await n2m.pageToMarkdown(page.id);
        let md = n2m.toMarkdownString(mdBlocks);


        const frontmatter = `
# *${title}*

Publication Date: "${publicationDate}"

${updateDate != null ? `Update Date: "${updateDate}"` : ''}

---
`;

        fs.writeFileSync(
            path.join("src/content", `${slug}.md`),
            frontmatter + md.parent
        );

        listOfArticles.push({
            title: title,
            date: publicationDate,
            url: `./src/content/${slug}.md`,
            category: category
        });

        console.log(`✅ ${slug}.md generated`);

    }

    fs.writeFileSync(
        path.join("src/content", "articles.json"),
        JSON.stringify(listOfArticles, null, 2) // null,2 buat rapi
    );
}

run().catch(console.error);

export { run as fetchNotionArticles };
