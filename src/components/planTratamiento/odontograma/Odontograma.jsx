import React, { useState } from 'react';
import AñadirTratamiento from './AñadirTratamiento';
import Maxilar from './Maxilar';
import Mandibular from './Mandibular';
import '../consultasStyle/odontograma.css';
import CrearConsulta from '../CrearConsulta';

const Odontograma = ({
  crud,
  verOdontograma,
  setVerOdontograma,
  setCrud,
  selectPaciente,
  setVerPacientes,
}) => {
  const [selectDiente, setSelectDiente] = useState();
  const [listaTratamientos, setListaTratamientos] = useState([]);

  return (
    <div
      className={`odontograma__container ${
        verOdontograma ? '' : 'odontograma__closeContainer'
      }`}
    >
      {verOdontograma ? (
        <section className="odontograma__sectionOne">
          <article className="odontograma__sectionOne__article">
            <h2>ODONTOGRAMA DENTAL</h2>
            <p>Seleccione un Diente</p>
          </article>
          <div className="odontograma__sectionOne__div">
            <Maxilar
              setSelectDiente={setSelectDiente}
              listaTratamientos={listaTratamientos}
              selectPaciente={selectPaciente}
            />
            <Mandibular
              setSelectDiente={setSelectDiente}
              listaTratamientos={listaTratamientos}
              selectPaciente={selectPaciente}
            />
          </div>
          <article className="odontograma__sectionOne__buttons">
            <button onClick={() => setVerOdontograma(false)}>
              Atras
            </button>
            <button onClick={() => setCrud('crearConsulta')}>
              Continuar
            </button>
          </article>
        </section>
      ) : null}
      {selectDiente ? (
        <AñadirTratamiento
          selectPaciente={selectPaciente}
          selectDiente={selectDiente}
          setSelectDiente={setSelectDiente}
          setListaTratamientos={setListaTratamientos}
          listaTratamientos={listaTratamientos}
        />
      ) : (
        ''
      )}
      <CrearConsulta
        setCrud={setCrud}
        crud={crud}
        selectPaciente={selectPaciente}
        setSelectDiente={setSelectDiente}
        listaTratamientos={listaTratamientos}
        setVerPacientes={setVerPacientes}
        setListaTratamientos={setListaTratamientos}
        setVerOdontograma={setVerOdontograma}
      />
    </div>
  );
};

export default Odontograma;
