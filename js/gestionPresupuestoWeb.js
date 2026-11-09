/**
 * @param {string} idElemento - ID del elemento HTML.
 * @param {string|number} valor - Valor a mostrar.
 */
function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}