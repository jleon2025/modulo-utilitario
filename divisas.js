// Consulta el tipo de cambio USD <-> CRC y actualiza el HTML

function actualizarDivisas() {
    fetch('https://api.exchangerate.host/latest?base=USD&symbols=CRC')
        .then(r => r.json())
        .then(data => {
            if (data && data.rates && data.rates.CRC) {
                const usdToCrc = data.rates.CRC;
                const usdToCrcElem = document.getElementById('usd-to-crc');
                const crcToUsdElem = document.getElementById('crc-to-usd');
                if (usdToCrcElem && crcToUsdElem) {
                    usdToCrcElem.textContent = '₡' + usdToCrc.toFixed(2);
                    crcToUsdElem.textContent = '$' + (1 / usdToCrc).toFixed(4);
                }
            }
        })
        .catch(() => {
            const usdToCrcElem = document.getElementById('usd-to-crc');
            const crcToUsdElem = document.getElementById('crc-to-usd');
            if (usdToCrcElem && crcToUsdElem) {
                usdToCrcElem.textContent = '₡---.--';
                crcToUsdElem.textContent = '$---.--';
            }
        });
}

// Espera a que el DOM esté listo antes de ejecutar
document.addEventListener('DOMContentLoaded', function() {
    actualizarDivisas();
    setInterval(actualizarDivisas, 30 * 60 * 1000);
});
