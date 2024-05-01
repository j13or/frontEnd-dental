import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import config from '../../utils/getToken';
import { toast } from 'react-toastify';

const AgregarConsulta = ({ crud, setCrud, tratamientosConsulta }) => {
  const { register, handleSubmit, reset } = useForm();

  console.log(tratamientosConsulta);
  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/consulta/${
      tratamientosConsulta.id
    }`;

    axios
      .post(
        url,
        {
          ...data,
          consultorioId: tratamientosConsulta.consultorioId,
        },
        config
      )
      .then((res) => {
        setCrud('');
        toast.success('La consulta  se creo exitosamente');
      })
      .catch((err) => {
        toast.error('hubo un error al crear la consulta');
        setCrud('');
      });
    reset();
  };

  return (
    <div
      className={`crud__container  ${
        crud === 'create' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>
          Nuevo Consulta para el tratamiento{' '}
          {tratamientosConsulta?.titulo}
        </h3>
        {crud === 'create' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="titulo">Titulo:</label>
              <input
                {...register('titulo')}
                id="titulo"
                type="text"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="descripcion">Observaciones:</label>
              <textarea
                {...register('descripcion')}
                id="descripcion"
                type="text"
                rows={3}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="pago">pago:</label>
              <input
                {...register('pago')}
                id="pago"
                type="number"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="deuda">deuda pendiente:</label>
              <input
                id="deuda"
                type="text"
                value={tratamientosConsulta?.deuda}
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
            Crear Consulta
          </button>
        </section>
      </form>
    </div>
  );
};

export default AgregarConsulta;
