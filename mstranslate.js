$(document).ready(function(){
  //GLOBALS
  console.log('loaded mstranslate')
    // localStorage.clear()
    var access_token
    var translationText = JSON.stringify("Hello how are you")
    var lang_from = JSON.stringify("en")
    var lang_to = JSON.stringify("fr")
    var translatedLang
    // $.get('https://api.cognitive.microsoft.com/sts/v1.0/issueToken')
    if (localStorage.getItem('token') === null) {
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
          console.log(localStorage.getItem('token'))
          translation(access_token)
        }

        function translation (access_token, translationText) {
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.microsofttranslator.com/V2/Http.svc/Translate?appid=&text="+text+"&from="+lang_from+"&to="+lang_to
            "method": "GET",
            "dataType": "text"
          }

          $.ajax(settings).done(function (data) {
            console.log(data);
            translatedLang = $(data).text()
            console.log(translatedLang)
          });


  }





    })
