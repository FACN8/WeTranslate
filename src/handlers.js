const fs = require("fs");
const path = require("path");
const axios = require('axios')
require('dotenv').config()
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const languageTranslator = new LanguageTranslatorV3({
  authenticator: new IamAuthenticator({ apikey: 's9Re8_rW6FPLGzj85rhY6_ASeckxHsQm61tZTnlOJZhs' }),
  url:'https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/24b9dbfd-5db4-44a0-83bc-1602158cf3e1',
  version: '2018-05-01',
});

const handleHomeRoute = (request, response) => {
    const indexFilePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(indexFilePath, (err, file) => {
        if (err) {
            console.log(err);
            response.writeHead(500);
            response.end("an error occured");
        } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end(file);
        }
    });
};
const handlePublic = (request, response) => {
    const url = request.url;
    const extension = url.split(".")[1];
    const extensionType = {
        html: "text/html",
        css: "text/css",
        js: "application/javascript",
        ico: "image/x-icon"
    };
    const filePath = path.join(__dirname, "..", url);
    fs.readFile(filePath, (err, file) => {
        if (err) {
            console.log(err);
            response.writeHead(500);
            response.end("an error occured");
        } else {
            response.writeHead(200, { "Content-Type": extensionType[extension] });
            response.end(file);
        }
    });
};

const handleSearch = (req, res) => {
    console.log('inside search');
    let wordToTranslate = '';
    req.on('data', (input) => {
        wordToTranslate += input;
    })
    req.on('end', (input) => {
       
        console.log(JSON.parse(wordToTranslate).searchVal)
        
        languageTranslator.translate(
            {
              text: JSON.parse(wordToTranslate).searchVal,
              source: 'en',
              target: 'ar'
            })
            .then(response => {
                let translated =JSON.stringify(response.result, null, 2)
              console.log(translated);
              res.writeHead(200)
              res.end(translated)
            })
            .catch(err => {
              console.log('error: ', err);
            });

       
    })
    req.on('error', (error) => {
        console.error(error)
    })

}

const getRequest = (inp,targ,cb) => {

    axios({
        "method": "GET",
        "url": "https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate",
        "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
            "x-rapidapi-key": "923d81344bmsh9581457e6495a83p1a5f97jsn85f1fef09b83"
        }, "params": {
            "source": "auto",
            "target": "es",
            "input": "school"
        }
    })
        .then((result) => {

            cb(null, result)
        })
        .catch((error) => {
            cb(error)
        })
};

const postRequest = (body, url, cb) => {

    axios.post(url, body)
        .then((result) => {

            cb(null, result)
        })
        .catch((error) => {
            cb(error)
        })
};



module.exports = {
    getRequest,
    postRequest,
    handleHomeRoute,
    handlePublic,
    handleSearch
};
