// pages/api/placar.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface QueryParams {
  country?: string;
  league?: string;
}

const getPlacar = async (req: NextApiRequest, res: NextApiResponse) => {
  const { country, league }: QueryParams = req.query;
  const apiKey = '87002bfaeb67439ebfb3e258bb0139d1';  // Substitua pela chave de API fornecida pela Football Data API

  try {
    if (!country || !league) {
      throw new Error('País e liga são obrigatórios.');
    }

    // Obter informações sobre a liga
    const leagueResponse = await axios.get(
      `https://api.football-data.org/v2/competitions/${country}/${league}`,
      { headers: { 'X-Auth-Token': apiKey } }
    );

    // Obter partidas da liga
    const matchesResponse = await axios.get(
      `https://api.football-data.org/v2/competitions/${leagueResponse.data.id}/matches`,
      { headers: { 'X-Auth-Token': apiKey } }
    );

    const placarJogos = matchesResponse.data;

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
