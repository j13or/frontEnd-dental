import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../utils/getToken';
import './pagesStyle/home.css';
import GraficaPorMes from '../components/home/GraficaPorMes';

const Home = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes actual y agregar un cero si es necesario

  const [consultas, setConsultas] = useState();
  const [citas, setCitas] = useState();
  const [pacientes, setPacientes] = useState();
  const [allConsultas, setallConsultas] = useState();

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/consulta?mes=${month}&año=${year}`;
    axios
      .get(url, config)
      .then((res) => {
        setConsultas(res.data.consultas);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const today = new Date(Date.now() - 5 * 60 * 60 * 1000);
    const formattedDate = today.toISOString().split('T')[0];

    const url = `${
      import.meta.env.VITE_URL_API
    }/cita?fecha=${formattedDate}`;
    axios
      .get(url, config)
      .then((res) => {
        setCitas(res.data.citas);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/paciente`;
    axios
      .get(url, config)
      .then((res) => {
        setPacientes(res.data.pacientes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(consultas);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/consulta`;
    axios
      .get(url, config)
      .then((res) => {
        setallConsultas(res.data.consultas);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="home__container">
      <section className="home__sectionOne">
        <div className="home__sectionOne__div">
          <p>Consultas</p>
          <span>{consultas?.length}</span>
          <i className="bx bxs-note"></i>
        </div>
        <div className="home__sectionOne__div">
          <p>Citas Hoy</p>
          <span>{citas?.length}</span>
          <i className="bx bxs-notepad"></i>
        </div>
        <div className="home__sectionOne__div">
          <p>Pacientes</p>
          <span>{pacientes?.length}</span>
          <i className="bx bxs-user-account"></i>
        </div>
      </section>
      <GraficaPorMes allConsultas={allConsultas} />
    </div>
  );
};

export default Home;
