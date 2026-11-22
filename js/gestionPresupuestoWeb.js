import * as gesPres from './gestionPresupuesto.js';

export function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}
export function repintar() {
  // Mostrar el presupuesto en div#presupuesto
  mostrarDatoEnId('presupuesto', gesPres.mostrarPresupuesto());

  // Mostrar los gastos totales en div#gastos-totales
  mostrarDatoEnId('gastos-totales', gesPres.calcularTotalGastos());

  // Mostrar el balance total en div#balance-total
  mostrarDatoEnId('balance-total', gesPres.calcularBalance());

  // Borrar el contenido de div#listado-gastos-completo para no duplicar
  const listadoCompleto = document.getElementById('listado-gastos-completo');
  if (listadoCompleto) {
    listadoCompleto.innerHTML = '';
  }

  // Mostrar el listado completo de gastos en div#listado-gastos-completo
  const gastos = gesPres.listarGastos();
  for (const gasto of gastos) {
    mostrarGastoWeb('listado-gastos-completo', gasto);
  }
}
export function actualizarPresupuestoWeb() {
  const entrada = prompt('Introduce el nuevo presupuesto:');
  if (entrada === null) return;

  const nuevoPresupuesto = Number(entrada);
  if (!Number.isNaN(nuevoPresupuesto)) {
    gesPres.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
  }
}

const btnActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
if (btnActualizarPresupuesto) {
  btnActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);
}

export function nuevoGastoWeb() {
  const descripcion = prompt('Introduce la descripción del gasto:') ?? '';
  const valorTexto = prompt('Introduce el valor del gasto:') ?? '0';
  const fecha = prompt('Introduce la fecha del gasto (yyyy-mm-dd):') ?? '';
  const etiquetasTexto = prompt('Introduce las etiquetas separadas por comas (etiqueta1,etiqueta2,etiqueta3):') ?? '';

  const valor = Number(valorTexto);
  const etiquetas = etiquetasTexto.trim() !== ''
    ? etiquetasTexto.split(',').map(et => et.trim()).filter(et => et !== '')
    : [];

  const gasto = new gesPres.CrearGasto(descripcion, valor, fecha, ...etiquetas);
  gesPres.anyadirGasto(gasto);
  repintar();
}

const btnAnyadirGasto = document.getElementById('anyadirgasto');
if (btnAnyadirGasto) {
  btnAnyadirGasto.addEventListener('click', nuevoGastoWeb);
}

export function EditarHandle() {
  this.handleEvent = function () {
    const nuevaDescripcion = prompt('Introduce la nueva descripción:', this.gasto.descripcion) ?? this.gasto.descripcion;
    const nuevoValorTexto = prompt('Introduce el nuevo valor:', this.gasto.valor) ?? String(this.gasto.valor);
    const fechaPorDefecto = new Date(this.gasto.fecha).toISOString().slice(0, 10);
    const nuevaFecha = prompt('Introduce la nueva fecha (yyyy-mm-dd):', fechaPorDefecto) ?? fechaPorDefecto;
    const etiquetasPorDefecto = Array.isArray(this.gasto.etiquetas) ? this.gasto.etiquetas.join(',') : '';
    const nuevasEtiquetasTexto = prompt('Introduce las etiquetas separadas por comas:', etiquetasPorDefecto) ?? etiquetasPorDefecto;

    const nuevoValor = Number(nuevoValorTexto);
    const nuevasEtiquetas = nuevasEtiquetasTexto.trim() !== ''
      ? nuevasEtiquetasTexto.split(',').map(et => et.trim()).filter(et => et !== '')
      : [];

    this.gasto.actualizarDescripcion(nuevaDescripcion);
    if (!Number.isNaN(nuevoValor)) {
      this.gasto.actualizarValor(nuevoValor);
    }
    this.gasto.actualizarFecha(nuevaFecha);
    if (typeof this.gasto.anyadirEtiquetas === 'function') {
      this.gasto.anyadirEtiquetas(...nuevasEtiquetas);
    }

    repintar();
  };
}
export function mostrarGastoWeb(idElemento, gasto) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor) return;

    const divGasto = document.createElement("div");
    divGasto.className = "gasto";

    const divDesc = document.createElement("div");
    divDesc.className = "gasto-descripcion";
    divDesc.textContent = gasto.descripcion;
    divGasto.appendChild(divDesc);

    const divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = gasto.fecha;
    divGasto.appendChild(divFecha);

    const divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    const divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    
    if (gasto.etiquetas && Array.isArray(gasto.etiquetas)) {
        for (const etiqueta of gasto.etiquetas) {
            const spanEtiqueta = document.createElement("span");
            spanEtiqueta.className = "gasto-etiquetas-etiqueta";
            spanEtiqueta.textContent = etiqueta;
            divEtiquetas.appendChild(spanEtiqueta);
        }
    }
    const btnEditar = document.createElement('button');
      btnEditar.type = 'button';
      btnEditar.className = 'gasto-editar';
    btnEditar.textContent = 'Editar';

    const editarHandler = new EditarHandle();
      editarHandler.gasto = gasto;
      btnEditar.addEventListener('click', editarHandler);
      divGasto.appendChild(divEtiquetas);
      contenedor.appendChild(divGasto);
}

export function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor) return;

    const divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    const h1 = document.createElement("h1");
    let nombrePeriodo = periodo;
    if (periodo === "mes") nombrePeriodo = "mes";
    else if (periodo === "dia") nombrePeriodo = "día";
    else if (periodo === "anyo") nombrePeriodo = "año";

    h1.textContent = `Gastos agrupados por ${nombrePeriodo}`;
    divAgrupacion.appendChild(h1);

    for (const clave in agrup) {
        if (Object.prototype.hasOwnProperty.call(agrup, clave)) {
            const divDato = document.createElement("div");
            divDato.className = "agrupacion-dato";

            const spanClave = document.createElement("span");
            spanClave.className = "agrupacion-dato-clave";
            spanClave.textContent = clave;
            divDato.appendChild(spanClave);

            const spanValor = document.createElement("span");
            spanValor.className = "agrupacion-dato-valor";
            spanValor.textContent = agrup[clave];
            divDato.appendChild(spanValor);

            divAgrupacion.appendChild(divDato);
        }
    }

    contenedor.appendChild(divAgrupacion);
}