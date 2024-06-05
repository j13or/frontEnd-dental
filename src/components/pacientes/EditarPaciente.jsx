import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../utils/getToken';
import soloNumeros from '../../hooks/SoloNumeros';
import { toast } from 'react-toastify';

const EditarPaciente = ({
  crud,
  setCrud,
  selectPaciente,
  setSelectPaciente,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [allConsultorios, setallConsultorios] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/consultorio`;
    axios

      .get(url, config)
      .then((res) => {
        setallConsultorios(res.data.consultorios);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(allConsultorios);

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/paciente/${
      selectPaciente?.id
    }`;

    axios
      .patch(url, data, config)
      .then((res) => {
        toast.success('El paciente  se actualizo exitosamente');
        setCrud('');
        setSelectPaciente();
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
  console.log(selectPaciente);

  return (
    <div
      className={`crud__container  ${
        crud === 'updateUser' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Paciente {selectPaciente?.nombres}</h3>
        {crud === 'updateUser' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="carnet">Carnet de Identidad:</label>
              <input
                {...register('carnet')}
                id="carnet"
                defaultValue={selectPaciente.carnet}
                type="text"
                onKeyPress={soloNumeros}
                minLength={5}
                maxLength={8}
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
                defaultValue={selectPaciente.nombres}
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
                defaultValue={selectPaciente.apellidoPaterno}
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
                defaultValue={selectPaciente.apellidoMaterno}
              />
            </div>
            <div className="crud__div">
              <label htmlFor="genero">Genero:</label>
              <select
                {...register('genero')}
                id="genero"
                type="text"
                defaultValue={selectPaciente.genero}
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
                defaultValue={selectPaciente.telefono}
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
                defaultValue={selectPaciente.fechaDeNacimiento}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="alergia">Alergias:</label>
              <input
                {...register('alergia')}
                id="alergia"
                type="text"
                defaultValue={selectPaciente.alergia}
              />
            </div>
            <div className="crud__div">
              <label htmlFor="tipoDeSangre">Tipo de Sangre:</label>
              <input
                {...register('tipoDeSangre')}
                id="tipoDeSangre"
                type="text"
                defaultValue={selectPaciente.tipoDeSangre}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="consultorioId">Su consultorio:</label>
              <select
                {...register('consultorioId')}
                id="consultorioId"
                required
              >
                <option
                  value={selectPaciente?.consultorio?.id}
                  selected
                  disabled
                  hidden
                >
                  {selectPaciente?.consultorio.nombreConsultorio}
                </option>
                {allConsultorios?.map((consultorio) => (
                  <option value={consultorio.id} key={consultorio.id}>
                    {consultorio?.nombreConsultorio}
                  </option>
                ))}
              </select>
            </div>
          </section>
        ) : null}
        <section className="crud__sectionTwo">
          <button
            type="button"
            onClick={() => {
              setCrud(''), setSelectPaciente(), reset();
            }}
          >
            Cancelar
          </button>

          <button type="submit" className="crud__button">
            guardar
          </button>
        </section>
      </form>
    </div>
  );
};

export default EditarPaciente;
