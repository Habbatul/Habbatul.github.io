export default async function handler(req, res) {
    console.log('=== NOTION WEBHOOK VERIFICATION HIT ===');
    console.log('Method:', req.method);
    console.log('Headers:', req.headers);

    let body = '';

    try {
        body = req.body;
        console.log('Body:', body);
    } catch (e) {
        console.log('No body or failed to parse body');
    }

    // SELALU balikin 200 biar Notion anggap endpoint reachable
    return res.status(200).json({ ok: true });
}
