import React, { useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';

const ReportesTablaConsultas = ({ consultas }) => {
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Users table',
    sheet: 'Users',
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
      <table className="table__container" ref={tableRef}>
        <thead>
          <tr>
            <th>titulo</th>
            <th>descripcion</th>
            <th>pago</th>
          </tr>
        </thead>
        <tbody>
          {consultas?.map((consulta) => (
            <tr key={consulta.id}>
              <td>{consulta.titulo}</td>
              <td>{consulta.descripcion}</td>
              <td>{consulta.pago}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportesTablaConsultas;
