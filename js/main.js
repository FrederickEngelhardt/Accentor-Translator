$(document).ready(function(){



  //***GLOBALS

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
        text = $("#input_text")[0]["value"]
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




  //
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

// check to see if local storage contains a selected value when document loads
    if (localStorage.getItem("selected") !== null){
      $("#language")[0].innerHTML = "Language: "+localStorage.getItem("selected")
      $("#translation-title")[0].innerHTML = localStorage.getItem("selected")
    }




}) //end of document.ready
