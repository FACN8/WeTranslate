const inp = document.getElementById("search");
const transResult = document.getElementById('translated')

const myHandler =function(){ if(inp.value.length===0){transResult.value=''}else{translate();};}
const dHandler = debounced(200, myHandler);
inp.addEventListener("input",dHandler);

function translate() {
    let searchVal = inp.value
    postRequest({ searchVal }, '/search', (error, response) => {
        if (error) {
            console.log(error, 'No Error');
        }
        else if (response.status === 200) {
            console.log('the API should respond with a status code of 200')
            let translated = response.data.translations[0].translation
            transResult.value = translated;
            mode=false;
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

function debounced(delay, fn) {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    }
  }