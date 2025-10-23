import nodemailer from "nodemailer";

export const sendContactMessage = async (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${firstName} ${lastName}" <${email}>`,
            to: process.env.EMAIL_USER,
            subject: `Mensagem de ${firstName} ${lastName} - N1S1 Games`,
            html: `
                <h3>Nova mensagem do site - N1S1 Games!</h3>
                <p><strong>Nome:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensagem:</strong></p>
                <p>${message}</p>
            `,
        });

        res.status(200).json({ message: "Mensagem enviada com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao enviar a mensagem. "});
    }
};
