import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../consultasStyle/AñadirTratamiento.css';

const AñadirTratamiento = ({
  selectPaciente,
  selectDiente,
  setSelectDiente,
  setListaTratamientos,
  listaTratamientos,
}) => {
  const { register, handleSubmit, reset } = useForm();

  console.log(selectDiente);
  const [dienteSeleccionado, setDienteSeleccionado] = useState(
    selectDiente?.codigoDiente
  );

  const [tratamientoSeleccionado, setTratamientoSeleccionado] =
    useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    setTratamientoSeleccionado(
      listaTratamientos.find(
        (item) => Number(item.codigoDiente) === dienteSeleccionado
      )?.tratamiento
    );
    setPrecio(
      listaTratamientos.find(
        (item) => Number(item.codigoDiente) === dienteSeleccionado
      )?.precio || 0
    );
  }, [dienteSeleccionado]);
  const fechaActual = new Date().getFullYear();
  const fechaNacimiento = new Date(
    selectPaciente?.fechaDeNacimiento
  ).getFullYear();
  const esMayorDe14 = fechaActual - fechaNacimiento > 14;

  const numberDientes = [];
  let limiteSuperior;
  if (esMayorDe14) {
    limiteSuperior = 48;
    for (let i = 11; i <= limiteSuperior; i++) {
      if (
        i === 18 ||
        i === 20 ||
        i === 29 ||
        i === 30 ||
        i === 39 ||
        i === 40
      ) {
        continue;
      }
      numberDientes.push(i);
    }
  } else {
    limiteSuperior = 85;
    for (let i = 51; i <= limiteSuperior; i++) {
      if (
        i === 56 ||
        i === 57 ||
        i === 58 ||
        i === 59 ||
        i === 60 ||
        i === 66 ||
        i === 67 ||
        i === 68 ||
        i === 69 ||
        i === 70 ||
        i === 76 ||
        i === 77 ||
        i === 78 ||
        i === 79 ||
        i === 80
      ) {
        continue;
      }
      numberDientes.push(i);
    }
  }

  const handleDienteChange = (e) => {
    const nuevoDiente = e.target.value;
    setDienteSeleccionado(nuevoDiente);
  };

  const handleTratamientoChange = (e) => {
    const nuevoTratamiento = e.target.value;
    setTratamientoSeleccionado(nuevoTratamiento);
  };

  const handleprecioChange = (e) => {
    const precio = e.target.value;
    setPrecio(precio);
  };

  const tratamientos = [
    'Apiceptomía',
    'Carillas',
    'Cirugía',
    'Cororona',
    'Curetaje',
    'Endodoncia',
    'Esquelético',
    'Estética',
    'Exploración',
    'Extrusión',
    'Furcas',
    'Girar',
    'Impresiones',
    'Inclinación',
    'Limpieza',
    'Movilidad',
    'Obturación',
    'Ortodoncia',
    'Perno',
    'Puente',
    'Quitar',
    'Radiografía',
    'Reconstrucción',
    'Sangrado',
    'Sellador',
    'Sensibilidad',
    'Supurado',
    'Tornillo',
    'Tornillo Solo',
    'Tratamiento',
  ];

  const submit = (data) => {
    const updatedList = listaTratamientos.map((item) => {
      if (item.codigoDiente === data.codigoDiente) {
        return data;
      }
      return item;
    });
    if (
      !updatedList.some(
        (item) => item.codigoDiente === data.codigoDiente
      )
    ) {
      updatedList.push(data);
    }
    setListaTratamientos(updatedList);
    setSelectDiente();
  };
  const eliminar = () => {
    const nuevoListaTratamientos = listaTratamientos.filter(
      (item) => Number(item.codigoDiente) !== dienteSeleccionado
    );

    setListaTratamientos(nuevoListaTratamientos);
    setSelectDiente();
  };

  return (
    <div
      className={`AñadirTratamiento__container ${
        selectDiente ? '' : 'AñadirTratamiento__closeContainer'
      }`}
    >
      <form
        className="AñadirTratamiento__form"
        onSubmit={handleSubmit(submit)}
      >
        <h2>Añadir Tratamiento</h2>
        <section className="AñadirTratamientoForm__sectionOne">
          <div className="AñadirTratamientoForm__div">
            <label htmlFor="codigoDiente">Seleccione diente</label>
            <select
              {...register('codigoDiente')}
              id="codigoDiente"
              value={dienteSeleccionado}
              onChange={handleDienteChange}
              required
            >
              {numberDientes.map((diente, index) => (
                <option key={index} value={diente}>
                  {diente}
                </option>
              ))}
            </select>
          </div>
          <div className="AñadirTratamientoForm__div">
            <label htmlFor="tratamiento">
              Selecciona Tratamiento:
            </label>
            <select
              id="tratamiento"
              type="text"
              value={tratamientoSeleccionado}
              {...register('tratamiento')}
              onChange={handleTratamientoChange}
              required
            >
              {tratamientos.map((traamiento, index) => (
                <option key={index} value={traamiento}>
                  {traamiento}
                </option>
              ))}
            </select>
          </div>
          <div className="AñadirTratamientoForm__div">
            <label htmlFor="precio">Precio:</label>
            <input
              {...register('precio')}
              id="precio"
              type="number"
              value={precio}
              onChange={handleprecioChange}
              required
            />
          </div>
        </section>
        <section className="AñadirTratamientoForm__sectionTwo">
          {listaTratamientos.find(
            (item) => Number(item.codigoDiente) === dienteSeleccionado
          ) ? (
            <button type="button" onClick={eliminar}>
              Eliminar
            </button>
          ) : null}
          <button type="button" onClick={() => setSelectDiente()}>
            Cancelar
          </button>
          <button type="submit">Añadir</button>
        </section>
      </form>
    </div>
  );
};

export default AñadirTratamiento;
