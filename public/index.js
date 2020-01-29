const inp = document.getElementById("search");
const transResult = document.getElementById('translated')
let textLength = searchVal.length;
let mode = false;
inp.addEventListener("input", function(){
    if(!mode){translate()};
  });

function translate() {
    mode=true;
    let searchVal = inp.value
   
    if(textLength === searchVal.length){
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
else{
    transResult.value = '...'
    textLength = searchVal.length;
    setTimeout(translate, 1000);
}
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