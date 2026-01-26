import axios from "axios";

const DEPLOY_HOOK = process.env.DEPLOY_HOOK;
const TARGET_WORKSPACE = process.env.TARGET_WORKSPACE; // Nama workspace yang diizinkan

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const body = req.body;

    // Log untuk debugging (opsional, bisa dihapus nanti)
    console.log('Webhook received from:', body?.workspace_name);

    // --- LOGIKA VALIDASI BARU ---
    // Pastikan body ada, dan workspace_name sesuai
    if (!body || body.workspace_name !== TARGET_WORKSPACE) {
        console.log(`⛔ Ignored: Workspace is "${body?.workspace_name}", expected "${TARGET_WORKSPACE}"`);

        // Kita tetap return 200 agar Notion tidak menganggap error dan tidak melakukan retry
        return res.status(200).json({ message: "Ignored: Workspace not match" });
    }

    // --- EKSEKUSI DEPLOY ---
    if (DEPLOY_HOOK) {
        try {
            // Gunakan await agar function tidak tertutup sebelum request selesai
            await axios.post(DEPLOY_HOOK);
            console.log("✅ Vercel deploy triggered");
        } catch (err) {
            console.error("❌ Deploy hook failed:", err.message);
            // Opsional: return 500 jika deploy gagal, tapi biasanya log saja cukup
        }
    } else {
        console.warn("⚠️ DEPLOY_HOOK not defined");
    }

    return res.status(200).json({ ok: true });
}