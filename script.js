const apiURL = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_9Tmj7QonHyhoicdrcYu1fImf4tCCsOKGLlxg5cfQ`;


async function init() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        const data = await response.json();
        console.log('Fertig', data);
    } catch (error) {
        console.error('Fehler aufgetreten:', error);
        errorFunction();
    }
}

function errorFunction() {
    console.log('Fehler aufgetreten');
}

function convert(){
 
}