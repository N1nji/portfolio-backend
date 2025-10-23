import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js"


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));