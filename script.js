const apiURL = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_9Tmj7QonHyhoicdrcYu1fImf4tCCsOKGLlxg5cfQ`;
let exchangeRates = {};

async function init() {
    try {
        const response = await fetch(apiURL);
        const data = await checkResponse(response);
        exchangeRates = data.data; 
    } catch (error) {
        console.error('Fehler aufgetreten:', error);
    }
}

function checkResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP-Fehler: ${response.status}`);
    }
    return response.json();
}

function convert() {
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;
    const amount = parseFloat(document.getElementById('input').value);

    if (Object.keys(exchangeRates).length === 0) {
        alert('Wechselkurse nicht geladen. Bitte versuchen Sie es später erneut.');
        return;
    }

    const rateFromBase = exchangeRates[fromCurrency];
    const rateToBase = exchangeRates[toCurrency];
    const result = amount * (rateToBase / rateFromBase);

    document.getElementById('output').value = result.toFixed(2);
}