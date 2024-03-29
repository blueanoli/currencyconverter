const apiURL = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_9Tmj7QonHyhoicdrcYu1fImf4tCCsOKGLlxg5cfQ`;
let exchangeRates = {};

/**
 * Initializes the application by fetching data from a specified API URL.
 * Upon a successful response, the data is processed and stored in `exchangeRates`.
 * If the fetch operation or data processing fails, an error is logged to the console.
 * 
 * @async
 * @function init
 * @returns {Promise<void>} A promise that resolves when the fetch operation and data processing are complete.
 *                           If an error occurs, the promise will be rejected and the error will be logged, but not thrown.
 */
async function init() {
    try {
        const response = await fetch(apiURL);
        const data = await checkResponse(response);
        exchangeRates = data.data; 
    } catch (error) {
        console.error('Fehler aufgetreten:', error);
    }
}

/**
 * Checks the status of an HTTP response object. If the response is not 'ok', it throws an Error with the HTTP status.
 * If the response is 'ok', it returns the parsed JSON from the response body.
 * 
 * @function checkResponse
 * @param {Response} response - The response object to check, typically received from a fetch request.
 * @returns {Promise<Object>} A promise that resolves with the parsed JSON from the response body.
 * @throws {Error} Throws an error with the HTTP status code if the response is not 'ok'.
 */
function checkResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP-Fehler: ${response.status}`);
    }
    return response.json();
}

/**
 * Converts an amount from one currency to another using pre-loaded exchange rates.
 * It reads values for the source currency, target currency, and amount from HTML input elements identified by their IDs.
 * If the exchange rates are not loaded, it displays an alert to the user.
 * The conversion result is calculated and displayed in an HTML element identified by its ID.
 * 
 * @function convert
 * @returns {void} Does not return a value. The result of the conversion is displayed in an HTML element.
 * @throws {Error} Alerts the user if the exchange rates have not been loaded before conversion is attempted.
 */
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