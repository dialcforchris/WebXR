

// import { CanvasUI } from './libs/CanvasUI.js'
// import { ARButton } from './libs/ARButton.js';
// import { LoadingBar } from './libs/LoadingBar.js';
// import { Player } from './libs/Player.js';
// import { RGBELoader } from './libs/three/jsm/RGBELoader.js';
// import { XRGestures } from './libs/XRGestures.js';

const models = ["./portrait.gltf",
    "./bowl.gltf",
   "./spoon.gltf"];
    const audio = ["./audio/Miniature-Portrait_FINAL.wav",
   "./audio/Tea-Bowl_FINAL.wav",  
   "./audio/Seal-Spoon_FINAL_V2.wav"];
   
   const posters = ["./posters/portraitPoster.png",
   "./posters/bowlPoster.jpg",
   "./posters/spoonPoster.png"];
let index = 0;

// let startXR = document.getElementById("startAR-button");
// let closeXR = document.getElementById("button-back");
let reticle;
let model;
let spawned = false;

function setIndex()
{
    let title = document.getElementById("title");
   let _result = "";
   _result = localStorage.getItem("result");
   if(_result==null)
   {
         _result = "Miniature Portrait";
   }
    else{
        _result = _result.toString().trim();
    }
    let text="";
   console.log(_result);
   switch (_result) 
   {
       case "Miniature Portrait":
        text = "Miniature\nPortrait";
           index = 0;
           break;
       case "Tea Bowl":
        text = "Tea\nBowl";
           index = 1;
           break;
       case "Seal Spoon":
        text = "Seal\nSpoon";
           index = 2;
           break;
       default:
        index = 0;
        text = "Miniature\nPortrait";
           console.log("No match found for the result.");
   }
   title.textContent = text;
   return index;
}

function getFilePath()
{
    setIndex();
    return models[index];
}
let clone;

function setup()
{
    let exit = document.getElementById("exit-button");
    exit.style.display = "none";
     setIndex();
     let modelViewer = document.getElementById("view");
    //let viewer = document.getElementById("view");
    modelViewer.src = models[index];
    let image = document.getElementById("circle-image");
    image.src = posters[index];
    
  // viewer.dismissPoster();
    var x = document.getElementById("audio");//createElement("AUDIO");
    x.src = audio[index];
}

let ignore = true;
function launchViewer()
{
    let exit = document.getElementById("exit-button");
    exit.style.display = "block";
    let start = document.getElementById("start-button");
    start.style.display = "none";
   // setIndex();
   let modelViewer = document.getElementById("view");
   modelViewer.activateAR();
  // let exit = modelViewer.shadowRoot.querySelector('#default-exit-webxr-ar-button');
 //  exit.addEventListener("click", closeAR());
   //exit.innerHTML = "Exit AR";
//    let image = document.getElementById("circle-image");
//    image.style.display = "none";
    playAudio();
    // let exit = document.getElementById("exit");
    // exit.style.display = "block";
    //  exit.addEventListener("click", closeAR())
}

function playAudio() {
   var x = document.getElementById("audio");//createElement("AUDIO");

    x.play();
}

function pauseAudio() {
   var x = document.getElementById("audio");//createElement("AUDIO");
 x.pause();
}

function closeAR()
{ 
    pauseAudio();
    let modelViewer = document.getElementById("view");

    //{
     //   ignore = false;
       // return;
    //}
   window.open("./intro.html","_self")
  // modelViewer.exitXR();


  
  
}