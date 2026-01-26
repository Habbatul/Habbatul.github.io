import { fetchNotionArticles } from "../scripts/fetch-notion.js";

export default async function handler(req, res) {
    // if (req.method !== "POST") return res.status(405).end();

    // Fire-and-forget supaya Notion cepat dapat 200
    fetchNotionArticles().catch(console.error);

    return res.status(200).json({ ok: true });
}