const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const languageTranslator = new LanguageTranslatorV3({
  authenticator: new IamAuthenticator({ apikey: 's9Re8_rW6FPLGzj85rhY6_ASeckxHsQm61tZTnlOJZhs' }),
  url:'https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/24b9dbfd-5db4-44a0-83bc-1602158cf3e1',
  version: '2018-05-01',
});

languageTranslator.translate(
  {
    text: 'A sentence must have a verb',
    source: 'en',
    target: 'ar'
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log('error: ', err);
  });

// languageTranslator.identify(
//   {
//     text:
//       'The language translator service takes text input and identifies the language used.'
//   })
//   .then(response => {
//     console.log(JSON.stringify(response.result, null, 2));
//   })
//   .catch(err => {
//     console.log('error: ', err);
//   });