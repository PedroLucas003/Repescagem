const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 8800;
const apiKey = "ba041792daf2902748de400a4dbadba5";

app.use(cors());

// Defina o caminho absoluto da pasta frontend
const frontendPath = path.join(__dirname, "../frontend");

// Serve os arquivos estáticos da pasta frontend
app.use(express.static(frontendPath));

// Rota para a página inicial (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Função de retry com atraso exponencial
const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
  try {
    return await axios.get(url, options);
  } catch (error) {
    if (retries <= 0) {
      console.error("Tentativas esgotadas. Não foi possível obter os dados.");
      throw new Error("Falha ao buscar dados após múltiplas tentativas.");
    }

    console.warn(`Erro ao buscar dados. Tentando novamente em ${delay}ms...`);
    await new Promise(resolve => setTimeout(resolve, delay));

    return fetchWithRetry(url, options, retries - 1, delay * 2);
  }
};

// Rota para buscar dados climáticos com retry
app.get("/weather", async (req, res) => {
  const { city } = req.query;

  try {
    const response = await fetchWithRetry("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: city,
        units: "metric",
        appid: apiKey,
        lang: "pt_br",
      },
    });
    
    res.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar dados do clima:", error);
    res.status(500).json({ error: "Cidade não encontrada ou erro de conexão. Tente novamente mais tarde." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
