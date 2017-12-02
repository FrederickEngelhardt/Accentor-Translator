//***GLOBALS
var text
const translateAccents = {
  yoda: "yoda.json",
  pirate: "pirate.json",
  gungan: "gungan.json",
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
function createSearchString (text) {
  return encodeURIComponent(text)
}
function sideNav (){
  $('.button-collapse').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true, // Choose whether you can drag to open on touch screens,
  })
}
function createNav(){
  for (let i in translateAccents){
    let groupClass = "translateAccents " + i
    let accents = JSON.stringify("<li class='"+groupClass+"'><a href=''#!'>"+i+"</a></li>")
    $(".accent-selector").append(accents)

  }
  for (let i in translateLanguages){
    let groupClass = "translateLanguages "+i
    let language = "<li class='"+groupClass+"'><a href=''#!'>"+translateLanguages[i]+"</a></li>"
    $(".language-selector").append(language)
  }
  for (let i in translateLanguages){
    let startClass = "start"+i
    let startLanguage = JSON.stringify("<li class='"+startClass+"'><a href=''#!'>"+translateLanguages[i]+"</a></li>")
    $(".starting-selector").append(startLanguage)
  }
}

// EVENT LISTENERS
function createListeners(){
  // SWAP LANGUAGES
  $("#swap").click(function(event){
    if (localStorage.getItem("outputName") === null){
      return
    }
    event.preventDefault()
    let holder1 = localStorage.getItem("inputName")
    let holder1Name = localStorage.getItem("inputLang")
    let holder2 = localStorage.getItem("outputName")
    let holder2Name = localStorage.getItem("name")
    //swaps full names for display reasons
    localStorage.setItem("inputLang", holder2Name)
    localStorage.setItem("name", holder1Name)
    // swaps name codes
    localStorage.setItem("outputName", holder1)
    localStorage.setItem("inputName", holder2)

    // GUI to show swap
    $("#input-title")[0].innerHTML = "Input Language: <span>"+localStorage.getItem("inputLang")+"</span>"
    $("#translation-title")[0].innerHTML = "Output Language: <span>"+localStorage.getItem("name")+"</span>"


  })
  // Click Enter to checkSubmit
  $(document).keypress(function(e) {
    if(e.which == 13) {
      if (localStorage.getItem("outputName") !== null || $("#input_text")[0].innerHTML === '' ){
        text = $("#input_text")[0]["value"]
        if (text === '') {return alert('Please input text.')}
        if (localStorage.getItem("type") === "lang"){
          msTranslation(text)
        }
        else if (localStorage.getItem("type") === "accent"){
          translate(text)
        }
      }
      else {return alert('Please select a language.')}
    }
  })
  // Click the submit button
  $("#submit").click(function(event){
    event.preventDefault()
    if (localStorage.getItem("outputName") !== null || $("#input_text")[0].innerHTML === '' ){
      text = $("#input_text")[0]["value"]
      if (localStorage.getItem("type") === "lang"){
        msTranslation(text)
      }
      else if (localStorage.getItem("type") === "accent"){
        translate(text)
      }
    }
    else {return alert('Please select a language.')}
  })
  $("#language").click(function(event){
    event.preventDefault()
  })
  $(".nav-head").click(function(event){
    event.preventDefault()
  })
  // Event Listeners for Output Accents
  for (let i in translateAccents){
    let search = '.'+i
    $(search).click(function(event){
      event.preventDefault()
      // $("#language")[0].innerHTML = "Language: "+i
      $("#translation-title")[0].innerHTML = "Output Accent: <span>"+i+"</span"
      localStorage.setItem("outputName",translateAccents[i])
      localStorage.setItem("name",i)
      localStorage.setItem("type","accent")
    })
  }
  // Event listeners for Output Languages
  for (let i in translateLanguages){
    let search = '.'+i
    $(search).click(function(event){
      event.preventDefault()
      // $("#language")[0].innerHTML = "Language: "+translateLanguages[i]
      $("#translation-title")[0].innerHTML = "Output Language <span>"+translateLanguages[i]+"</span>"
      localStorage.setItem("outputName",i)
      localStorage.setItem("name",translateLanguages[i])
      localStorage.setItem("type","lang")
    })
  }
  // Event listeners for Input language
  for (let i in translateLanguages){
    let search =".start"+i
    $(search).click(function(event){
      event.preventDefault()
      $("#input-title")[0].innerHTML = "Input Language <span>"+translateLanguages[i]+"</span>"
      localStorage.setItem("inputLang",translateLanguages[i])
      localStorage.setItem("inputName",[i])
    })
  }
}

function translate (text) {
  let searchString = createSearchString(text)
  let language = localStorage.getItem("outputName")
  let inputString = "http://api.funtranslations.com/translate/"+language+"?text=" + searchString;
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
        $("#inputField")[0].innerHTML = translatedString
        // return translatedString

    }).fail(function(err){
      console.log('Please wait an hour for the api to work. OR use a VPN.')
    })
    // return translatedString
  }
  function generateModal(){
    $('#modal1').modal('open');
    localStorage.setItem('message', true)
  }

$(document).ready(function(){
  // check to see if local storage contains a selected value when document loads
  if (localStorage.getItem("inputLang") === null){
    localStorage.setItem("inputLang","English")
    localStorage.setItem("inputName","en")
  }
  if (localStorage.getItem("outputName") !== null){
    $("#translation-title")[0].innerHTML = "Output Language: <span>"+localStorage.getItem("name")+"</span>"
  }
  if (localStorage.getItem("inputLang") !== null){
    $("#input-title")[0].innerHTML = "Input Language: <span>"+localStorage.getItem("inputLang")+"</span>"
  }
  sideNav()
  createNav()
  createListeners()
  $('#modal1').modal()
  if (localStorage.getItem('message') === null){
    generateModal()
  }
}) //end of document.ready
