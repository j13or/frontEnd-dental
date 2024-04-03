import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../pages/pagesStyle/crud.css';
import soloLetrasYEspacios from '../../hooks/LetrasYespacios';

const CreateUser = ({ crud, setCrud }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/usuario/signup`;

    axios
      .post(url, data)
      .then((res) => {
        setCrud('');
      })
      .catch((err) => {
        console.log(err);
        setCrud('');
      });
    reset();
  };

  return (
    <div
      className={`crud__container  ${
        crud === 'createUser' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Nuevo Usuario</h3>
        {crud === 'createUser' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="nombres">Nombres:</label>
              <input
                {...register('nombres')}
                id="nombres"
                type="text"
                onKeyPress={soloLetrasYEspacios}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="apellidos">Apellidos:</label>
              <input
                {...register('apellidos')}
                id="apellidos"
                type="text"
                onKeyPress={soloLetrasYEspacios}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="email">Correo:</label>
              <input
                {...register('email')}
                id="email"
                type="text"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="telefono">telefono:</label>
              <input
                {...register('telefono')}
                id="telefono"
                type="number"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="contraseña">Contraseña:</label>
              <input
                {...register('contraseña')}
                id="contraseña"
                type="password"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="rol">Rol:</label>
              <select
                {...register('rol')}
                id="rol"
                type="text"
                required
              >
                <option value="doctor">Administrador</option>
                <option value="secretaria">Doctor</option>
              </select>
            </div>
          </section>
        ) : null}
        <section className="crud__sectionTwo">
          <button type="button" onClick={() => setCrud('')}>
            Cancelar
          </button>

          <button type="submit" className="crud__button">
            Crear Usuario
          </button>
        </section>
      </form>
    </div>
  );
};

export default CreateUser;
