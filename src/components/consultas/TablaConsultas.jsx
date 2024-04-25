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
          <th style={{ width: '150px' }}>Precio Total</th>
          <th style={{ width: '150px' }}>Adelanto de Pago</th>
          <th style={{ width: '150px' }}>Documento de la Consulta</th>
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
            <td>{consulta.adelantoPago}</td>
            <td>
              <a
                href={consulta.linkFile}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Documento
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaConsultas;
