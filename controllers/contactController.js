import axios from "axios";

export const sendContactMessage = async (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    console.log("📩 Novo contato recebido:", req.body);

    try {
        const response = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: { 
                    name: `${firstName} ${lastName}`, 
                    email: process.env.EMAIL_USER
                },
                replyTo: { 
                    email, 
                    name: `${firstName} ${lastName}` 
                },
                to: [{ 
                    email: process.env.EMAIL_USER, 
                    name: "N1S1 Games" 
                }],
                subject: `Mensagem de ${firstName} ${lastName} - N1S1 Games`,
                htmlContent: `
                    <h3>Nova mensagem do site - N1S1 Games!</h3>
                    <p><strong>Nome:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mensagem:</strong></p>
                    <p>${message}</p>
                `,
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("✅ Mensagem enviada com sucesso via Brevo!", response.data);
        res.status(200).json({ message: "Mensagem enviada com sucesso!" });

    } catch (error) {
        console.error("❌ Erro ao enviar pelo Brevo:", error.response?.data || error.message);
        res.status(500).json({ 
            error: "Erro ao enviar a mensagem.", 
            details: error.response?.data || error.message,
        });
    }
};
