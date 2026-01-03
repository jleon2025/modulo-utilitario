let tipoCambioCRC = 0;

function actualizarDivisas() {
    fetch('https://open.er-api.com/v6/latest/USD')
        .then(r => r.json())
        .then(data => {
            if (data && data.rates && data.rates.CRC) {
                tipoCambioCRC = data.rates.CRC;

                // Actualizar Módulo 1 (Colón -> Dólar)
                const usdToCrcElem = document.getElementById('usd-to-crc');
                const crcToUsdElem = document.getElementById('crc-to-usd');
                if (usdToCrcElem && crcToUsdElem) {
                    usdToCrcElem.textContent = '₡' + tipoCambioCRC.toFixed(2);
                    crcToUsdElem.textContent = '$' + (1 / tipoCambioCRC).toFixed(4);
                }

                // Actualizar Módulo 2 (Dólar -> Colón)
                const usdToCrcElem2 = document.getElementById('usd-to-crc-2');
                const crcToUsdElem2 = document.getElementById('crc-to-usd-2');
                if (usdToCrcElem2 && crcToUsdElem2) {
                    usdToCrcElem2.textContent = '₡' + tipoCambioCRC.toFixed(2);
                    crcToUsdElem2.textContent = '$' + (1 / tipoCambioCRC).toFixed(4);
                }

                // Actualizar conversiones manuales si hay algo escrito
                convertirManual();
                convertirManualUsd();
            }
        })
        .catch(() => {
            const ids = ['usd-to-crc', 'crc-to-usd', 'usd-to-crc-2', 'crc-to-usd-2'];
            ids.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = el.id.includes('crc') ? '₡---.--' : '$---.--';
            });
        });
}

function convertirManual() {
    const inputCrc = document.getElementById('input-crc');
    const resultadoUsd = document.getElementById('resultado-usd');
    if (inputCrc && resultadoUsd && tipoCambioCRC > 0) {
        const montoCrc = parseFloat(inputCrc.value);
        if (!isNaN(montoCrc)) {
            const equivalenciaUsd = montoCrc / tipoCambioCRC;
            resultadoUsd.textContent = '$' + equivalenciaUsd.toFixed(2);
        } else {
            resultadoUsd.textContent = '$0.00';
        }
    }
}

function convertirManualUsd() {
    const inputUsd = document.getElementById('input-usd');
    const resultadoCrc = document.getElementById('resultado-crc');
    if (inputUsd && resultadoCrc && tipoCambioCRC > 0) {
        const montoUsd = parseFloat(inputUsd.value);
        if (!isNaN(montoUsd)) {
            const equivalenciaCrc = montoUsd * tipoCambioCRC;
            resultadoCrc.textContent = '₡' + equivalenciaCrc.toFixed(2);
        } else {
            resultadoCrc.textContent = '₡0.00';
        }
    }
}

// Espera a que el DOM esté listo antes de ejecutar
document.addEventListener('DOMContentLoaded', function () {
    actualizarDivisas();
    setInterval(actualizarDivisas, 30 * 60 * 1000);

    // Escuchar cambios en los inputs manuales
    const inputCrc = document.getElementById('input-crc');
    if (inputCrc) {
        inputCrc.addEventListener('input', convertirManual);
    }

    const inputUsd = document.getElementById('input-usd');
    if (inputUsd) {
        inputUsd.addEventListener('input', convertirManualUsd);
    }
});
