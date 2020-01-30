const fs = require("fs");
const path = require("path");
const axios = require('axios')
require('dotenv').config()
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const languageTranslator = new LanguageTranslatorV3({
  authenticator: new IamAuthenticator({ apikey: process.env.apiKey}),
  url:process.env.url,
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


module.exports = {
    handleHomeRoute,
    handlePublic,
    handleSearch
};
