import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../pages/pagesStyle/crud.css';
import config from '../../utils/getToken';

const CrearPacientes = ({ crud, setCrud }) => {
  const { register, handleSubmit, reset } = useForm();
  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/paciente`;

    axios
      .post(url, data, config)
      .then((res) => {
        setCrud('');
      })
      .catch((err) => {
        console.log(err);
        setCrud('');
      });
    reset();
  };

  function soloLetrasYEspacios(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      !(charCode >= 65 && charCode <= 90) && // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32 && // Espacio
      charCode !== 8 // Tecla de retroceso
    ) {
      event.preventDefault();
    }
  }

  return (
    <div
      className={`crud__container  ${
        crud === 'createUser' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Nuevo Paciente</h3>
        {crud === 'createUser' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="carnet">Carnet de Identidad:</label>
              <input
                {...register('carnet')}
                id="carnet"
                type="number"
                required
              />
            </div>
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
              <label htmlFor="apellidoPaterno">
                Apellido Paterno:
              </label>
              <input
                {...register('apellidoPaterno')}
                id="apellidoPaterno"
                type="text"
                onKeyPress={soloLetrasYEspacios}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="apellidoMaterno">
                Apellido Materno:
              </label>
              <input
                {...register('apellidoMaterno')}
                id="apellidoMaterno"
                type="text"
                onKeyPress={soloLetrasYEspacios}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="genero">Genero:</label>
              <select
                {...register('genero')}
                id="genero"
                type="text"
                required
              >
                <option value="Masculino">Maculino</option>
                <option value="Femenino">Femenino</option>
              </select>
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
              <label htmlFor="fechaDeNacimiento">
                Fecha de Nacimiento:
              </label>
              <input
                {...register('fechaDeNacimiento')}
                id="fechaDeNacimiento"
                type="date"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="alergia">Alergias:</label>
              <input
                {...register('alergia')}
                id="alergia"
                type="text"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="tipoDeSangre">Tipo de Sangre:</label>
              <input
                {...register('tipoDeSangre')}
                id="tipoDeSangre"
                type="text"
                required
              />
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

export default CrearPacientes;
