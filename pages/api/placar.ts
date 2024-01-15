// pages/api/placar.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface QueryParams {
  pais?: string;
  liga?: string;
}

const getPlacar = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pais, liga }: QueryParams = req.query;
  const api_key = 'MTM4NDEyXzE3MDUzMzIxMTRfOTk0NGEyZmM3NmY2YTRjYTVmY2FhODQ4NzA2NmVmYzllZWQ3MzU5ZA==';  // Substitua pela chave de API fornecida pela RapidAPI

  try {
    if (!pais || !liga) {
      throw new Error('País e liga são obrigatórios.');
    }

    // Você pode validar os valores de pais e liga aqui, se necessário

    const response = await axios.get('https://www.scorebat.com/video-api/v1/', {
      params: {
        key: api_key,
        search: `${pais} ${liga}`,
      },
    });

    const placarJogos = response.data;

    res.status(200).json(placarJogos);
  } catch (error) {
    console.error(error);

    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else if (error.message) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro ao obter o placar dos jogos.' });
    }
  }
};

export default getPlacar;
