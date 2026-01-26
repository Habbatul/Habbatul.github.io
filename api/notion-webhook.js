// import { fetchNotionArticles } from "../scripts/fetch-notion.js";

const DEPLOY_HOOK = process.env.DEPLOY_HOOK;

export default async function handler(req, res) {
    // if (req.method !== "POST") {
    //     return res.status(405).json({ error: "Method not allowed" });
    // }

    // fetchNotionArticles().catch(err => {
    //     console.error("Error fetchNotionArticles:", err);
    // });

    if (DEPLOY_HOOK) {
        fetch(DEPLOY_HOOK, { method: "POST" })
            .then(() => console.log("✅ Vercel deploy triggered"))
            .catch(err => console.error("❌ Deploy hook failed:", err));
    } else {
        console.warn("⚠️ DEPLOY_HOOK not defined in env");
    }

    return res.status(200).json({ ok: true });
}
