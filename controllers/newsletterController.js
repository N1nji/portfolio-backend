import fetch from "node-fetch";

export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email || typeof email !== "string" || !email.trim()) {
            return res.status(400).json({ error: "Email é obrigatório" });
    }   

    const BREVO_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID);

    if (!BREVO_KEY) {
        console.error("BREVO_API_KEY não definido no .env");
        return res.status(500).json({ error: "Serviço de newsletter indisponível" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email.trim())) {
        return res.status(400).json({ error: "Email inválido" });
    }

    const payload = {
        email: email.trim(),
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
    };

    const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",   
            "api-key": BREVO_KEY,
        },
        body: JSON.stringify(payload),
    });

    const text = await response.text();
    if(!response.ok) {
        console.error("Brevo error:", response.status, text);
        return res.status(500).json({ error: "Erro ao se inscrever no Brevo", details: text });
    }

    console.log("Brevo sucesso:", text);
    return res.status(200).json({ message: "Inscrito com sucesso!" });

} catch (err) {
    console.error("Erro newslette:", err);
    return res.status(500).json({ error: "Erro interno ao processar inscrição" });
    }
};