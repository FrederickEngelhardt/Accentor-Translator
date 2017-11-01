$(document).ready(function(){
  //GLOBALS
  // TRANSLATION LANGUAGE CODES:
  // https://msdn.microsoft.com/en-us/library/hh456380.aspx
  console.log("loaded mstranslate")
    // localStorage.clear()
    var text = "My api actually works"
    var access_token
    var lang_from = "en"
    var lang_to = "fr"
    var translatedLang
    // $.get('https://api.cognitive.microsoft.com/sts/v1.0/issueToken')
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
            translation(access_token)
          })
        }
        else {
          console.log(localStorage.getItem("token"))
          translation()
        }

        function translation () {
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.microsofttranslator.com/V2/Http.svc/Translate?"+
            "appid=Bearer "+localStorage.getItem("token")+
            "&text="+encodeURIComponent(text)+
            "&from="+encodeURIComponent(lang_from)+
            "&to="+encodeURIComponent(lang_to),
            "method": "GET",
            "dataType": "text"
          }
          $.ajax(settings).done(function (data) {
            translatedLang = $(data).text()
            console.log(translatedLang)
          }).fail(function (){
            localStorage.removeItem("token")
            console.log('There was an error. Perhaps the token has expired. Please click the button again and your token will be refreshed.')
          });


  }
    })
