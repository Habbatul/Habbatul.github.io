import axios from "axios";
import crypto from "crypto";

// KONFIGURASI PENTING: Matikan body parser otomatis agar kita bisa baca Raw Body
export const config = {
    api: {
        bodyParser: false,
    },
};

const DEPLOY_HOOK = process.env.DEPLOY_HOOK;
const TARGET_WORKSPACE = process.env.TARGET_WORKSPACE;
const NOTION_SECRET = process.env.NOTION_WEBHOOK_SECRET; // Token dari langkah "Handshake" awal Notion

// Helper untuk membaca Raw Body dari stream
async function getRawBody(req) {
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    return Buffer.concat(buffers).toString("utf-8");
}

export default async function handler(req, res) {
    let bodyCek = '';

    try {
        bodyCek = req.bodyCek;
        console.log('Body:', bodyCek);
    } catch (e) {
        console.log('No body or failed to parse body');
    }

    if (req.method !== "POST") {
        return res.status(200).json({ error: "Method not allowed" });
    }

    try {
        // 1. Ambil Raw Body & Signature Header
        const rawBody = await getRawBody(req);
        const signature = req.headers["x-notion-signature"];


        const isSecretLoaded = !!NOTION_SECRET;
        console.log(`🔑 NOTION_SECRET Loaded? ${isSecretLoaded} (Length: ${NOTION_SECRET ? NOTION_SECRET.length : 0})`);
        console.log(`📨 Header 'x-notion-signature': ${signature || "MISSING"}`);

        // 2. Cek Validitas Signature (Security Check)
        // Jika NOTION_SECRET ada, kita WAJIB validasi. 
        if (NOTION_SECRET && signature) {
            const hmac = crypto.createHmac("sha256", NOTION_SECRET);
            const digest = "sha256=" + hmac.update(rawBody).digest("hex");

            console.log(`🧮 Calculated Digest (Server): ${digest}`);
            console.log(`🆚 Compare: ${digest === signature ? "MATCH ✅" : "MISMATCH ❌"}`);
            
            // Gunakan timingSafeEqual untuk mencegah timing attacks
            const isValid = crypto.timingSafeEqual(
                Buffer.from(signature),
                Buffer.from(digest)
            );

            if (!isValid) {
                console.error("⛔ Security Error: Invalid Notion Signature");
                return res.status(200).json({ error: "Invalid signature" });
            }
        } else {
            console.warn("⚠️ Warning: Skipping signature validation (Missing secret or header)");
            return res.status(200).json({ message: "Skipping signature validation (Missing secret or header)" });
        }

        // 3. Parse Raw Body ke JSON Object
        const body = JSON.parse(rawBody);

        // --- SKENARIO 1: HANDSHAKE AWAL (Saat setup Webhook) ---
        // Notion mengirim token verifikasi di awal. Kita bisa log ini untuk diambil.
        if (body.verification_token) {
            console.log("👋 Notion Initial Handshake!");
            console.log("🔑 YOUR VERIFICATION TOKEN:", body.verification_token);
            // Simpan token ini ke .env sebagai NOTION_WEBHOOK_SECRET
            return res.status(200).json({ message: "Verification token received" });
        }

        // --- SKENARIO 2: EVENT NORMAL ---

        console.log('Webhook received from:', body?.workspace_name);

        // Validasi Workspace Name (Double protection)
        if (body.workspace_name !== TARGET_WORKSPACE) {
            console.log(`⛔ Ignored: Workspace is "${body?.workspace_name}"`);
            return res.status(200).json({ message: "Ignored: Workspace mismatch" });
        }

        // Eksekusi Deploy Hook
        if (DEPLOY_HOOK) {
            console.log("🚀 Triggering Vercel Deploy...");
            await axios.post(DEPLOY_HOOK);
            console.log("✅ Vercel deploy triggered");
        }

        return res.status(200).json({ ok: true });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(200).json({ ok: true });
    }

}