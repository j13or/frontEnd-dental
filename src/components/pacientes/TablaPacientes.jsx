import React from 'react';
import '../../pages/pagesStyle/tables.css';
import { Link } from 'react-router-dom';

const TablaPacientes = ({
  pacientes,
  setSelectPaciente,
  setCrud,
}) => {
  return (
    <table className="table__container">
      <thead>
        <tr>
          <th style={{ width: '120px' }}>Carnet de Identidad</th>
          <th>Nombres</th>
          <th>Apellido Paterno</th>
          <th>Apellido Materno</th>
          <th style={{ width: '100px' }}>Genero</th>
          <th style={{ width: '120px' }}>Telefono</th>
          <th style={{ width: '120px' }}>Fecha de Nacimiento</th>
          <th>Alergia</th>
          <th style={{ width: '100px' }}>Tipo de Sangre</th>
          <th style={{ width: '120px' }}>Historial</th>
          <th className="tablle__tdButton" style={{ width: '100px' }}>
            Editar
          </th>
          <th className="tablle__tdButton" style={{ width: '100px' }}>
            Eliminar
          </th>
        </tr>
      </thead>
      <tbody>
        {pacientes?.map((paciente) => (
          <tr key={paciente.id}>
            <td>{paciente.carnet}</td>
            <td>{paciente.nombres}</td>
            <td>{paciente.apellidoPaterno}</td>
            <td>{paciente.apellidoMaterno}</td>

            <td>{paciente.genero}</td>
            <td>{paciente.telefono}</td>
            <td>{paciente.fechaDeNacimiento}</td>
            <td>{paciente.alergia}</td>
            <td>{paciente.tipoDeSangre}</td>
            <td onClick={() => setSelectPaciente(paciente)}>
              <Link to={`/historial/${paciente.id}`}>
                Ver Historial
              </Link>
            </td>

            <td className="tablle__tdButton">
              <button
                className="edit-button"
                onClick={() => {
                  setSelectPaciente(paciente);
                  setCrud('updateUser');
                }}
              >
                Editar
              </button>
            </td>
            <td className="tablle__tdButton">
              <button
                className="delete-button"
                onClick={() => {
                  setSelectPaciente(paciente);
                  setCrud('deleteUser');
                }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaPacientes;
