import { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import TrustBar from '../components/TrustBar.jsx';
import Filters from '../components/Filters.jsx';
import VehicleGrid from '../components/VehicleGrid.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import Footer from '../components/Footer.jsx';
import * as api from '../lib/api.js';

export default function Home() {
  const [tipo, setTipo] = useState('todos');
  const [veiculos, setVeiculos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let cancelado = false;
    setCarregando(true);
    setErro(null);

    api
      .listarVeiculos({ tipo })
      .then((dados) => {
        if (!cancelado) setVeiculos(dados);
      })
      .catch((e) => {
        if (!cancelado) setErro(e.message);
      })
      .finally(() => {
        if (!cancelado) setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [tipo]);

  return (
    <>
      <Nav />
      <Hero />
      <TrustBar />
      <Filters ativo={tipo} onChange={setTipo} />
      {erro ? (
        <section style={{ padding: '40px 80px 110px', textAlign: 'center', color: '#E23D3D' }}>
          Não foi possível carregar o estoque. Verifique se a API está rodando.
        </section>
      ) : (
        <VehicleGrid veiculos={veiculos} carregando={carregando} />
      )}
      <CtaBanner />
      <Footer />
    </>
  );
}
