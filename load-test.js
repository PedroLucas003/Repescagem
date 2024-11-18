import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = 'http://localhost:8800/weather'; // Altere para a URL do seu backend

export default function () {
  const city = 'São Paulo'; // Defina a cidade para consultar

  // Envia a requisição GET para o endpoint
  const res = http.get(`${BASE_URL}?city=${city}`);

  // Verifica se a resposta foi bem-sucedida
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is less than 200ms': (r) => r.timings.duration < 200,
  });
}
