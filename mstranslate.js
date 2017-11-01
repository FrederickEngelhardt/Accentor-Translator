const translateLanguages = {
  "af": "Afrikaans",
  "ar": "Arabic",
  "bs-Latn": "Bosnian (Latin)",
  "bg": "Bulgarian",
  "ca": "Catalan",
  "zh-CHS": "Chinese Simplified",
  "zh-CHT": "Chinese Traditional",
  "hr": "Croatian",
  "cs": "Czech",
  "da": "Danish",
  "nl": "Dutch",
  "en": "English",
  "et": "Estonian",
  "fi": "Finnish",
  "fr": "French",
  "de": "German",
  "el": "Greek",
  "ht": "Haitian Creole",
  "he": "Hebrew",
  "hi": "Hindi",
  "mww": "Hmong Daw",
  "hu": "Hungarian",
  "id": "Indonesian",
  "it": "Italian",
  "ja": "Japanese",
  "sw": "Kiswahili",
  "tlh": "Klingon",
  "tlh-Qaak": "Klingon (pIqaD)",
  "ko": "Korean",
  "lv": "Latvian",
  "lt": "Lithuanian",
  "ms": "Malay",
  "mt": "Maltese",
  "no": "Norwegian",
  "fa": "Persian",
  "pl": "Polish",
  "pt": "Portuguese",
  "otq": "Querétaro Otomi",
  "ro": "Romanian",
  "ru": "Russian",
  "sr-Cyrl": "Serbian (Cyrillic)",
  "sr-Latn": "Serbian (Latin)",
  "sk": "Slovak",
  "sl": "Slovenian",
  "es": "Spanish",
  "sv": "Swedish",
  "th": "Thai",
  "tr": "Turkish",
  "uk": "Ukrainian",
  "ur": "Urdu",
  "vi": "Vietnamese",
  "cy": "Welsh",
  "yua": "Yucatec Maya"
}

// GLOBALS
// var text = "My api actually works"
var access_token
var lang_from = "en"
var translatedLang


function msTranslation (text) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.microsofttranslator.com/V2/Http.svc/Translate?"+
    "appid=Bearer "+localStorage.getItem("token")+
    "&text="+encodeURIComponent(text)+
    "&from="+encodeURIComponent(lang_from)+
    "&to="+encodeURIComponent(localStorage.getItem("selected")),
    "method": "GET",
    "dataType": "text"
  }
  $.ajax(settings).done(function (data) {
    translatedLang = $(data).text()
    console.log(translatedLang)
    $("#inputField")[0].innerHTML = translatedLang
  }).fail(function (){
    localStorage.removeItem("token")
    console.log('There was an error. Perhaps the token has expired. Please click the button again and your token will be refreshed.')
  });
}

$(document).ready(function(){
    if (localStorage.getItem("token") === null) {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.cognitive.microsoft.com/sts/v1.0/issueToken",
        "method": "POST",
        "headers": {
          "ocp-apim-subscription-key": "1e3e69b05f15457f8b9fe8d4edf44a38",
          "content-type": "application/json",
          "accept": "application/jwt",
          "cache-control": "no-cache",
        }
      }
      $.ajax(settings).done(function (response) {
            // console.log(response);
            access_token = response
            localStorage.setItem('token',access_token)
            console.log(response)
            msTranslation(text)
          })
      }
      else {
        console.log(localStorage.getItem("token"))
        msTranslation(text)
        }
    })
