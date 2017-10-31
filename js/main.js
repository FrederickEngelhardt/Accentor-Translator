$(document).ready(function(){
  console.log('loaded')
  if (localStorage.getItem("selected") !== null){
    $("#language")[0].innerHTML = "Language: "+localStorage.getItem("selected")
    $("#translation-title")[0].innerHTML = localStorage.getItem("selected")
  }
// GLOBALS
  // localStorage.clear()
  // var access_token
  // var translationText = "Hello how are you"
  // var lang_from = "english"
  // var lang_to = "french"
  // // $.get('https://api.cognitive.microsoft.com/sts/v1.0/issueToken')
  // if (localStorage.getItem('token') === null) {
  //   var settings = {
  //     "async": true,
  //     "crossDomain": true,
  //     "url": "https://api.cognitive.microsoft.com/sts/v1.0/issueToken",
  //     "method": "POST",
  //     "headers": {
  //       "ocp-apim-subscription-key": "1e3e69b05f15457f8b9fe8d4edf44a38",
  //       "content-type": "application/json",
  //       "accept": "application/jwt",
  //       "cache-control": "no-cache",
  //     }
  //   }
  //   $.ajax(settings).done(function (response) {
  //     // console.log(response);
  //     access_token = response
  //     localStorage.setItem('token',access_token)
  //     console.log(response)
  //     translation(access_token)
  //   })
  // }
  // else {
  //   console.log(localStorage.getItem('token'))
  //   translation(access_token)
  // }
  //
  // function translation (access_token, translationText) {
  //   var translation_request = {
  //     "appid": null,
  //     "url": "https://api.microsofttranslator.com/V2/Http.svc/Translate",
  //     "method": "POST",
  //     "text": translationText,
  //     "from": lang_from,
  //     "to": lang_to,
  //     "headers": {
  //       // "ocp-apim-subscription-key": "1e3e69b05f15457f8b9fe8d4edf44a38",
  //       "Authorization": "Bearer" + " " + access_token,
  //       // "accept": "application/jwt",
  //       // "cache-control": "no-cache",
  //     }
  //     }
  //     $.ajax(translation_request).done(function (response) {
  //       // console.log(response);
  //       localStorage.setItem(translationText,response)
  //       console.log(response)
  //     })
  //
  //
  //   }
    // JSON.stringify()




           //
          //  onload = function ()
          //  {
          //    console.log('loaded scripts')
          //      var from = "en", to = "es", text = "hello world", appid = null;
          //      var s = document.createElement("script");
          //      s.src = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate" +
          //          "?Ocp-Apim-Subscription-Key " + encodeURIComponent('1e3e69b05f15457f8b9fe8d4edf44a38') +
          //          "&from=" + encodeURIComponent(from) +
          //          "&to=" + encodeURIComponent(to) +
          //          "&appid=" + encodeURIComponent(appId) +
          //          "&text=" + encodeURIComponent(text) +
          //          "&oncomplete=mycallback";
          //      document.body.appendChild(s);
          //  }
           //
          //  function mycallback(response)
          //  {
          //      alert(response);
          //  }



  // var key1 = "1e3e69b05f15457f8b9fe8d4edf44a38"

  //***GLOBALS
  function createSearchString (text) {
    console.log(text);
    return encodeURIComponent(text)
  }
  let selection = null
  const translateType = {
    yoda: "yoda.json",
    pirate: "pirate.json",
    piglatin: "piglatin.json",
    dothraki: "dothraki.json",
    huttese: "huttese.json",
    oldenglish: "oldenglish.json",
    shakespeare: "shakespeare.json",
    klingon: "klingon.json",
    jive: "jive.json",
    cockney: "cockney.json",
    morse: "morse.json",
    us2uk: "us2uk.json",
    brooklyn: "brooklyn.json",
    australian: "australian.json",
    boston: "boston.json",
    austrian: "austrian.json",
    braille: "braille.json",
    emoji: "emoji.json"
  }
  function createNav(){
    for (let i in translateType){
      // console.log(i)
      let groupClass = JSON.stringify("translateType " + i)
      let language = "<li class="+groupClass+"><a href=''#!'>"+i+"</a></li>"
      $(".language-selector").append(language)

    }
  }
  createNav()



  // EVENT LISTENERS

  // Creates event listeners for all classes in translateType
  function createListeners(){
    $(".submit-button").click(function(event){
      event.preventDefault()
      console.log('clicked')
      if (localStorage.getItem("selected") !== null || $("#input_text")[0].innerHTML === '' ){
        let text = $("#input_text")[0]["value"]
        console.log(text);
        translate(text)
      }
      else {return alert('Please select a language.')}
    })
    $("#language").click(function(event){
      event.preventDefault()
    })
    $(".nav-head").click(function(event){
      event.preventDefault()
    })
    for (let i in translateType){
      let search = '.'+i
      $(search).click(function(event){
        event.preventDefault()
        $("#language")[0].innerHTML = "Language: "+i
        $("#translation-title")[0].innerHTML = i
        localStorage.setItem("selected",i)
      })
    }
  }
  createListeners()

  $('.button-collapse').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true, // Choose whether you can drag to open on touch screens,
    onOpen: function(el) {return console.log('hello')},
    onClose: function() {
      return console.log('closed')
    }
  });


  // TEST
  function translate (text) {
    let searchString = createSearchString(text)
    let language = localStorage.getItem("selected")
    console.log(language)
    let inputString = "http://api.funtranslations.com/translate/"+language+"?text=" + searchString
    console.log(inputString)
    apiSearch(inputString)
  }
  function apiSearch (inputString) {
    let search = {
      "method": "POST",
      "url": inputString,
      "dataType": "json",
    }
    $.ajax(search).done(function(data) {
          let translatedString = data.contents.translated
          console.log(translatedString)
          $("#inputField")[0].innerHTML = translatedString
          // return translatedString

      }).fail(function(err){
        console.log('Please wait an hour for the api to work. OR use a VPN.')
      })
      return translatedString
    }







}) //end of document.ready
