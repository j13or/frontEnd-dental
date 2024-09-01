import React, { useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';

const ReportesTablaPlanTramiento = ({ planTratamientos }) => {
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Plan de Tratamientos',
    sheet: 'Plan de Tratamientos',
  });

  const handleDownload = () => {
    const clonedTable = tableRef.current.cloneNode(true);
    clonedTable
      .querySelectorAll('i')
      .forEach((icon) => icon.remove());
    onDownload(clonedTable);
  };
  return (
    <div className="reports_table_container">
      {' '}
      <button onClick={handleDownload}>Exportar Excel</button>
      <table className="table__container">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Telefono</th>
            <th>Consulta</th>
            <th>Observaciones</th>
            <th style={{ width: '150px' }}>Precio Total</th>
            <th style={{ width: '150px' }}>Acuenta</th>
            <th style={{ width: '150px' }}>Deuda</th>
            <th style={{ width: '150px' }}>
              Documento de la Consulta
            </th>
          </tr>
        </thead>
        <tbody>
          {planTratamientos?.map((planTratamiento) => (
            <tr key={planTratamiento.id}>
              <td>
                {planTratamiento?.paciente.nombres}{' '}
                {planTratamiento?.paciente.apellidoPaterno}{' '}
                {planTratamiento?.paciente.apellidoMaterno}
              </td>
              <td>{planTratamiento?.paciente.telefono}</td>
              <td>{planTratamiento.titulo}</td>
              <td>{planTratamiento.observaciones}</td>
              <td>{planTratamiento.montoTotal}</td>
              <td>{planTratamiento.acuenta}</td>
              <td>{planTratamiento.deuda}</td>

              <td>
                <a
                  href={planTratamiento.linkFile}
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
    </div>
  );
};

export default ReportesTablaPlanTramiento;
