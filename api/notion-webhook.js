import axios from "axios";
const DEPLOY_HOOK = process.env.DEPLOY_HOOK;

export default async function handler(req, res) {
    // if (req.method !== "POST") {
    //     return res.status(405).json({ error: "Method not allowed" });
    // }

    if (DEPLOY_HOOK) {
        axios.post(DEPLOY_HOOK)
            .then(() => console.log("✅ Vercel deploy triggered"))
            .catch(err => console.error("❌ Deploy hook failed:", err.message));
    } else {
        console.warn("⚠️ DEPLOY_HOOK not defined");
    }

    return res.status(200).json({ ok: true });
}
