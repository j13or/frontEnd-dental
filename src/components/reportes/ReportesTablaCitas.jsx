import React, { useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';

const ReportesTablaCitas = ({ citas }) => {
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Reporte Cita',
    sheet: 'Reporte Cita',
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
            <th>Paciente</th>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {citas?.map((cita) => (
            <tr key={cita.id}>
              <td>
                {cita?.paciente.nombres}{' '}
                {cita?.paciente.apellidoPaterno}{' '}
                {cita?.paciente.apellidoMaterno}
              </td>
              <td>{cita.titulo}</td>
              <td>{cita.descripcion}</td>
              <td>{cita.fecha}</td>
              <td>{cita.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportesTablaCitas;
