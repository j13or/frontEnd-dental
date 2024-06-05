import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../utils/getToken';
const UpdatePassword = ({ selectUser, setCrud }) => {
  const { register, handleSubmit, reset } = useForm();

  console.log(selectUser);
  const submit = () => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/usuario/reset-password/${selectUser.id}`;

    axios
      .get(url, config)
      .then((res) => {
        setCrud('');
        toast.success('La contraseña se Cambio exitosamente');
      })
      .catch((err) => {
        console.log(err);
        setCrud('');
        toast.error('Hubo un error al cambiar la contraseña');
      });
    reset();
  };
  return (
    <div className="crud__container">
      {' '}
      <form
        className="crud__form"
        onSubmit={handleSubmit(submit)}
        style={{ maxWidth: '400px' }}
      >
        <h3>Resetear Contaseña</h3>

        <section className="crud__sectionTwo">
          <button type="button" onClick={() => setCrud('')}>
            Cancelar
          </button>

          <button type="submit" className="crud__button">
            Resetear
          </button>
        </section>
      </form>
    </div>
  );
};

export default UpdatePassword;
