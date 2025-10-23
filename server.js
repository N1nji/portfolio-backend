import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js"


dotenv.config();

const app = express();

// Configuração de CORS
const allowedOrigins = [
  "https://portfolio-frontend-kappa-five.vercel.app", // frontend no Vercel
  "http://localhost:5173",
];

app.use(cors({
    origin: function(origin, callback) {
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = `CORS policy: origin ${origin} not allowed`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
    
app.use(express.json());

// Rotas
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));