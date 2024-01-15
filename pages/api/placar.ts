// pages/api/placar.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const getPlacar = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Simulando uma requisição para a JSONPlaceholder
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

    const placarJogos = response.data;

    res.status(200).json(placarJogos);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Erro ao obter o placar dos jogos.' });
  }
};

export default getPlacar;
