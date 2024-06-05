const soloNumeros = (event) => {
  const charCode = event.which ? event.which : event.keyCode;
  if (
    !(charCode >= 48 && charCode <= 57) && // Números del 0 al 9
    charCode !== 8 // Tecla de retroceso
  ) {
    event.preventDefault();
  }
};

export default soloNumeros;
