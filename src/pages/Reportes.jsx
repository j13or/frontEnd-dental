import React, { useEffect, useRef, useState } from 'react';
import './pagesStyle/consultas.css';
import './pagesStyle/reportes.css';

import axios from 'axios';
import config from '../utils/getToken';
import { useParams } from 'react-router-dom';
import ReportesTablaPlanTramiento from '../components/reportes/ReportesTablaPlanTramiento';
import ReportesTablaConsultas from '../components/reportes/ReportesTablaConsultas';
import ReportesTablaCitas from '../components/reportes/ReportesTablaCitas';
import { useDownloadExcel } from 'react-export-table-to-excel';

const Reportes = () => {
  const { id } = useParams();

  const today = new Date().toISOString().split('T')[0];
  const [crud, setCrud] = useState('');
  const [consultas, setConsultas] = useState();
  const [citas, setcitas] = useState();
  const [planTratamientos, setplanTratamientos] = useState();

  const [date, setDate] = useState(today);

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/plan-tratamiento/consultorio/${id}/?date=${date}`;
    axios
      .get(url, config)
      .then((res) => {
        setplanTratamientos(res.data.planTratamientos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [crud, date]);

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/cita/consultorio/${id}?fecha=${date}`;
    axios
      .get(url, config)
      .then((res) => {
        setcitas(res.data.citas);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [crud, date]);

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/consulta/consultorio/${id}?date=${date}`;
    axios
      .get(url, config)
      .then((res) => {
        setConsultas(res.data.consultas);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [crud, date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedDate = formData.get('date');
    setDate(selectedDate);
  };

  return (
    <div className="consultas__container">
      <section className="consultas__sectionOne">
        <h1>Reportes</h1>
      </section>
      <section className="reportes_sectionTwo">
        <h2>Seleccione El tipo de reporte</h2>
        <select
          name="selectReport"
          id="selectReport"
          onChange={(e) => setCrud(e.target.value)}
        >
          <option value="0">seleccione un Reporte</option>
          <option value="Citas">Citas</option>
          <option value="Consultas">Consultas</option>
          <option value="Pacientes">Pacientes</option>
        </select>
      </section>
      <section className="consultas__sectionThree">
        <h3>Filtrar por Fecha</h3>
        <form onSubmit={handleSubmit}>
          <input type="date" name="date" defaultValue={date} />
          <button type="submit">Filtrar</button>
        </form>
      </section>
      {crud === 'Citas' ? (
        <ReportesTablaCitas citas={citas} />
      ) : crud === 'Consultas' ? (
        <ReportesTablaConsultas consultas={consultas} />
      ) : (
        <ReportesTablaPlanTramiento
          planTratamientos={planTratamientos}
        />
      )}
    </div>
  );
};

export default Reportes;
