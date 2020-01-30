const inp = document.getElementById("search");
const transResult = document.getElementById("translated");
const myHandler = function() {
  if (inp.value.length === 0) {
    transResult.value = "";
  } else {
    translate();
  }
};
const dHandler = debounced(200, myHandler);
inp.addEventListener("input", dHandler);

function translate() {
  let searchVal = inp.value;
  let fromLang = document.getElementById("from").value;
  let toLang = document.getElementById("to").value;
  postRequest({ searchVal, fromLang, toLang }, "/search", (error, response) => {
    if (error) {
        transResult.value = "something went wrong please contact us";
    } else if (response.status === 200) {
      let translated = response.data.translations[0].translation;
      transResult.value = translated;
        } else {
      transResult.value = "something went wrong please contact us";
    }
  });
}

const postRequest = (body, url, cb) => {
  axios
    .post(url, body)
    .then(result => {
      cb(null, result);
    })
    .catch(error => {
      cb(error);
    });
};

function debounced(delay, fn) {
  let timerId;
  return function(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}
