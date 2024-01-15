// pages/index.tsx

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

interface FormData {
  pais: string;
  liga: string;
}

const Home: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(({ pais, liga }) => {
    window.location.href = `/placar?pais=${pais}&liga=${liga}`;
  });

  return (
    <div className={styles.container}>
      <h1>Bem-vindo ao Placar de Jogos!</h1>
      <p>Escolha o país e a liga para visualizar os placares:</p>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <label htmlFor="pais">País:</label>
        <select id="pais" name="pais" required {...register('pais')}>
          <option value="" disabled hidden>Selecione um país</option>
          <option value="Brazil">Brazil</option>
          <option value="Argentina">Argentina</option>
          <option value="Uruguay">Uruguay</option>
        </select>

        <label htmlFor="liga">Liga:</label>
        <select id="liga" name="liga" required {...register('liga')}>
          <option value="" disabled hidden>Selecione uma liga</option>
          <option value="Serie A">Serie A</option>
          <option value="Premier League">Premier League</option>
          <option value="La Liga">La Liga</option>
          <option value="Bundesliga">Bundesliga</option>
          <option value="MLS">MLS</option>
          <option value="Copa do Mundo">Copa do Mundo</option>
          <option value="Copa Libertadores">Copa Libertadores</option>
        </select>

        <button type="submit" className={styles.button}>Ver Placar</button>
      </form>

      <p>Ou escolha entre os campeonatos sugeridos:</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link href="/placar?pais=Brazil&liga=Serie A">
            <a>Serie A (Brazil)</a>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/placar?pais=Argentina&liga=Primera Division">
            <a>Primera Division (Argentina)</a>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/placar?pais=Uruguay&liga=Primera Division">
            <a>Primera Division (Uruguay)</a>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/placar?pais=England&liga=Premier League">
            <a>Premier League (England)</a>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/placar?pais=Spain&liga=La Liga">
            <a>La Liga (Spain)</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
