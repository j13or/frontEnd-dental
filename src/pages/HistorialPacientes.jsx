import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../utils/getToken';
import { useParams } from 'react-router-dom';
import ListaTratamiento from '../components/consultas/ListaTratamiento';
import './pagesStyle/historialPaciente.css';
const HistorialPacientes = () => {
  const { id } = useParams();

  const [consultas, setConsultas] = useState();
  const [tratamientosConsulta, setTratamientosConsulta] = useState();
  const [allCitas, setallCitas] = useState();
  const [verCitas, setverCitas] = useState(false);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/cita/paciente/${id}`;
    axios
      .get(url, config)
      .then((res) => {
        setallCitas(res.data.citas);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/consulta/paciente/${id}`;
    axios
      .get(url, config)
      .then((res) => {
        setConsultas(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="HistorialPacientes__container">
      <section className="HistorialPacientes__sectionOne">
        <h1>
          Historial del paciente {consultas?.paciente.nombres}{' '}
          {consultas?.paciente.apellidoPaterno}{' '}
          {consultas?.paciente.apellidoMaterno}
        </h1>
        <button onClick={() => setverCitas(!verCitas)}>
          {verCitas ? 'Ver Consultas' : 'Ver Citas'}
        </button>
      </section>
      {verCitas ? (
        <section className="HistorialPacientes__sectionTwo">
          <h3>Citas</h3>
          <table className="table__container">
            <thead>
              <tr>
                <th>Cita</th>
                <th>Descripcion</th>
                <th style={{ width: '150px' }}>fecha</th>
                <th style={{ width: '100px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {allCitas?.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.titulo}</td>
                  <td>{cita.descripcion}</td>
                  <td>{cita.fecha}</td>

                  <td>{cita.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <section className="HistorialPacientes__sectionTwo">
          <h3> Consultas</h3>
          <table className="table__container">
            <thead>
              <tr>
                <th>Consulta</th>
                <th>Descripcion</th>
                <th style={{ width: '150px' }}>
                  Lista de Tratamientos
                </th>
                <th style={{ width: '100px' }}>Precio Total</th>
              </tr>
            </thead>
            <tbody>
              {consultas?.consultas.map((consulta) => (
                <tr key={consulta.id}>
                  <td>{consulta.titulo}</td>
                  <td>{consulta.descripcion}</td>
                  <td
                    onClick={() => setTratamientosConsulta(consulta)}
                  >
                    Ver Lista
                  </td>
                  <td>{consulta.montoTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <ListaTratamiento
        tratamientosConsulta={tratamientosConsulta}
        setTratamientosConsulta={setTratamientosConsulta}
      />
    </div>
  );
};

export default HistorialPacientes;
