const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 8800;
const apiKey = "ba041792daf2902748de400a4dbadba5";

app.use(cors());

// Rota para buscar dados climáticos
app.get("/weather", async (req, res) => {
  const { city } = req.query;

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
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
    res.status(500).json({ error: "Cidade não encontrada ou erro de conexão." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
