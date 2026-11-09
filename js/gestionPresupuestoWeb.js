export function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
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
    divGasto.appendChild(divEtiquetas);
    contenedor.appendChild(divGasto);
}
