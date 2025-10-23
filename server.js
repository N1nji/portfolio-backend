import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";

dotenv.config();
console.log(process.env.EMAIL_USER);


const app = express();


const allowedOrigins = [
  "https://portfolio-n1nji.vercel.app",
  "http://localhost:5173",
];

app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true); // permite requests de ferramentas tipo o Postman
    if(allowedOrigins.indexOf(origin) === -1){
        const msg = `CORS policy: origin ${origin} not allowed`;
        return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "OPTIONS"], // permite preflight
  allowedHeaders: ["Content-Type", "Authorization"], // headers permitidos
  credentials: true,
}));

// Resposta para preflight (OPTIONS)
app.options("*", cors());

app.use(express.json());

// Rotas
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

app.get("/", (req, res) => {
  res.send("🔥 API N1S1 Games rodando com sucesso!");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
