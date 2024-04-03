import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../utils/getToken';
import './consultasStyle/crearConsulta.css';
const CrearConsulta = ({
  crud,
  setCrud,
  selectPaciente,
  setSelectDiente,
  listaTratamientos,
  setListaTratamientos,
  setVerPacientes,
  setVerOdontograma,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/consulta/${
      selectPaciente.id
    }`;

    const newData = {
      data,
      tratamientosDental: listaTratamientos,
    };
    axios
      .post(url, newData, config)
      .then((res) => {
        setListaTratamientos([]);
        setCrud('');
        setSelectDiente();
        setVerPacientes(false);
        setVerOdontograma(false);
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
  const montoTotal = () => {
    let total = 0;

    total = listaTratamientos?.reduce(
      (acc, tratamiento) => acc + Number(tratamiento.precio),
      0
    );

    return total;
  };

  return (
    <div
      className={`AñadirTratamiento__container ${
        crud ? 'crearConsulta' : 'AñadirTratamiento__closeContainer'
      }`}
    >
      <form
        className="crearConsulta_form"
        onSubmit={handleSubmit(submit)}
      >
        <h3>
          Guardar la consulta para el Paciente{' '}
          {selectPaciente?.nombres} {selectPaciente?.apellidoPaterno}
        </h3>
        {crud === 'crearConsulta' ? (
          <section className="crearConsulta__sectionOne ">
            <div className="crearConsultaForm__div">
              <label htmlFor="titulo">Titulo:</label>
              <input
                {...register('titulo')}
                id="titulo"
                type="text"
                onKeyPress={soloLetrasYEspacios}
                required
              />
            </div>
            <div className="crearConsultaForm__div">
              <label htmlFor="descripcion">Descripcion:</label>
              <textarea
                {...register('descripcion')}
                id="descripcion"
                onKeyPress={soloLetrasYEspacios}
                rows={4}
                required
              />
            </div>
            <div className="crearConsultaForm__div">
              <label htmlFor="montoTotal">Precio Total:</label>
              <input
                {...register('montoTotal')}
                id="montoTotals"
                type="montoTotal"
                value={montoTotal()}
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

export default CrearConsulta;
