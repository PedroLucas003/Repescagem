const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 8800;

// Configurações da API principal (OpenWeather)
const apiKeyPrimary = "ba041792daf2902748de400a4dbadba5";
const apiUrlPrimary = "https://api.openweathermap.org/data/2.5/weather";

// Configurações da API secundária (Weatherstack)
const apiKeySecondary = "435503e848b23243358f55cd8f3fe498";
const apiUrlSecondary = "http://api.weatherstack.com/current";

app.use(cors());

// Defina o caminho absoluto da pasta frontend
const frontendPath = path.join(__dirname, "../frontend");

// Serve os arquivos estáticos da pasta frontend
app.use(express.static(frontendPath));

// Rota para a página inicial (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Função de retry com fallback para API secundária
const fetchWithRetry = async (url, options, retries = 3, delay = 1000, isSecondary = false) => {
  try {
    // Tente buscar os dados da API atual
    return await axios.get(url, options);
  } catch (error) {
    if (retries <= 0) {
      if (!isSecondary) {
        // Se as tentativas esgotarem para a API principal, tente com a API secundária
        console.warn("Falha na API principal. Tentando com a API secundária...");

        // Configuração específica para a API Weatherstack
        return fetchWithRetry(apiUrlSecondary, {
          params: {
            access_key: apiKeySecondary,
            query: options.params.q,
            units: "m", // Configuração para obter temperaturas em Celsius
            language: "pt",
          },
        }, 3, 1000, true);
      }

      // Se também falhar com a API secundária, lance um erro
      console.error("Tentativas esgotadas em ambas as APIs.");
      throw new Error("Falha ao buscar dados em múltiplas tentativas nas APIs.");
    }

    console.warn(`Erro ao buscar dados. Tentando novamente em ${delay}ms...`);
    await new Promise(resolve => setTimeout(resolve, delay));

    // Tente novamente com a API atual
    return fetchWithRetry(url, options, retries - 1, delay * 2, isSecondary);
  }
};

// Rota para buscar dados climáticos com retry e failover
app.get("/weather", async (req, res) => {
  const { city } = req.query;

  try {
    // Primeiro, tente buscar os dados da API principal (OpenWeather)
    const response = await fetchWithRetry(apiUrlPrimary, {
      params: {
        q: city,
        units: "metric",
        appid: apiKeyPrimary,
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
