import React from 'react';

const TablaConsultas = ({ consultas }) => {
  return (
    <table className="table__container">
      <thead>
        <tr>
          <th>Paciente</th>
          <th>Telefono</th>
          <th>Consulta</th>
          <th>Descripcion</th>
          <th style={{ width: '100px' }}>Precio Total</th>
        </tr>
      </thead>
      <tbody>
        {consultas?.map((consulta) => (
          <tr key={consulta.id}>
            <td>
              {consulta?.paciente.nombres}{' '}
              {consulta?.paciente.apellidoPaterno}{' '}
              {consulta?.paciente.apellidoMaterno}
            </td>
            <td>{consulta?.paciente.telefono}</td>
            <td>{consulta.titulo}</td>
            <td>{consulta.descripcion}</td>

            <td>{consulta.montoTotal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaConsultas;
