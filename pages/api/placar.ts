// pages/api/placar.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface QueryParams {
  pais?: string;
  liga?: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { pais, liga }: QueryParams = req.query;
  const api_key = 'ef45e1f729msha20112503006f59p1a0dfcjsnbc025f0df781';  // Substitua pela chave de API fornecida pela RapidAPI

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
      // O servidor respondeu com um código de status diferente de 2xx
      res.status(error.response.status).json(error.response.data);
    } else if (error.message) {
      // Erro local, como um parâmetro faltante ou inválido
      res.status(400).json({ error: error.message });
    } else {
      // Outro tipo de erro
      res.status(500).json({ error: 'Erro ao obter o placar dos jogos.' });
    }
  }
};
