const url = 'https://tgrafen1.github.io/fx-calculator/rates.json'

document.querySelectorAll('select').forEach(element => {
    element.innerHTML = `
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CHF">CHF</option>
        <option value="SEK">SEK</option>
    `;
});

document.querySelector('button').addEventListener('click', () =>{
    const inputValue = document.querySelector('[name="input-value"]').value;
    const inputCurrency = document.querySelector('[name="input-currency"]').value;
    const outputCurrency = document.querySelector('[name="output-currency"]').value;

    convert(inputValue, inputCurrency, outputCurrency)
        .then((outputValue) => {
            document.querySelector('[name="output-value"]').value=outputValue;
        });
})

function convert(inputValue, inputCurrency, outputCurrency) {

    //const url = 'https://data.fixer.io/api/latest?base=EUR&symbols=USD,SEK,CHF&access_key=';

    return new Promise((resolve, reject) => {

        fetch(url).then(response => {
            if (response.status == 200) {
                return response.json().rates;
            } else {
                return Promise.reject('Failed to download rates');
            }
        }).then((rates) => {

            rates["EUR"] = 1;

            if (inputCurrency != "EUR") {
                inputValue = inputValue / rates[inputCurrency];
            }

            resolve(inputValue * rates[outputCurrency]);
        });

    });


}