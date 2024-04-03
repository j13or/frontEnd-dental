import React from 'react';
import '../../pages/pagesStyle/tables.css';

const TableUsers = ({ allUsers, setSelectUser, setCrud }) => {
  return (
    <table className="table__container">
      <thead>
        <tr>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Correo</th>
          <th>Telefono</th>
          <th>Rol</th>
          <th className="tablle__tdButton">Editar</th>
          <th className="tablle__tdButton">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {allUsers?.map((user) => (
          <tr key={user.id}>
            <td>{user.nombres}</td>
            <td>{user.apellidos}</td>
            <td>{user.email}</td>
            <td>{user.telefono}</td>
            <td>{user.rol}</td>
            <td className="tablle__tdButton">
              <button
                className="edit-button"
                onClick={() => {
                  setSelectUser(user);
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
                  setSelectUser(user);
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

export default TableUsers;
