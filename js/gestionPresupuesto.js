// Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (typeof valor === "number" && valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else {
        console.log("Error: el valor introducido no es un número válido");
        return -1;
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = (typeof valor === "number" && valor >= 0) ? valor : 0;

    if (fecha && !isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now();
    }

    this.etiquetas = [];

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }

    this.mostrarGasto = function () {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function (nuevoValor) {
        if (typeof nuevoValor === "number" && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    this.mostrarGastoCompleto = function () {
        let texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.";
        texto += "\n" + "Fecha: " + new Date(this.fecha).toLocaleString();
        texto += "\n" + "Etiquetas:";
        for (let etiqueta of this.etiquetas) {
            texto += "\n" + "- " + etiqueta;
        }
        texto += "\n";
        return texto;
    };

    this.actualizarFecha = function (nuevaFecha) {
        if (!isNaN(Date.parse(nuevaFecha))) {
            this.fecha = Date.parse(nuevaFecha);
        }
    };

    this.borrarEtiquetas = function (...etiquetasBorrar) {
        this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasBorrar.includes(etiqueta));
    };
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    let indice = gastos.findIndex(gasto => gasto.id === id);
    if (indice !== -1) {
        gastos.splice(indice, 1);
    }
}

function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
