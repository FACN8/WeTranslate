
document.getElementById("translate").addEventListener("click", translate);

function translate() {
    console.log('clicked')
    var searchVal = document.getElementById('search').value
    postRequest({ searchVal }, '/search', (error, response) => {
        if (error) {
            console.log(error, 'No Error');
        }
        else if (response.status === 200) {
            console.log('the API should respond with a status code of 200')
            let translated = response.data.translations[0].translation
            document.getElementById('translated').textContent = translated
            console.log(translated)
        } else { console.log('our server error') }

    })
}

const postRequest = (body, url, cb) => {

    axios.post(url, body)
        .then((result) => {

            cb(null, result)
        })
        .catch((error) => {
            cb(error)
        })
};