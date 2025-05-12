

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
   "./posters/bowlPoster.png",
   "./posters/spoonPoster.png"];
let index = 0;

// let startXR = document.getElementById("startAR-button");
// let closeXR = document.getElementById("button-back");
let reticle;
let model;
let spawned = false;

function setIndex()
{
   let _result = "";
   _result = localStorage.getItem("result");
   if(_result==null)
   {
         _result = "Miniature Portrait";
   }
    else{
        _result = _result.toString().trim();
    }
   console.log(_result);
   switch (_result) 
   {
       case "Miniature Portrait":
           index = 0;
           break;
       case "Tea Bowl":
           index = 1;
           break;
       case "Seal Spoon":
           index = 2;
           break;
       default:
        index = 0;
           console.log("No match found for the result.");
   }
   
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
   
     setIndex();
     let modelViewer = document.getElementById("view");
    //let viewer = document.getElementById("view");
    modelViewer.src = models[index];
    modelViewer.poster = posters[index];
    
  // viewer.dismissPoster();
    var x = document.getElementById("audio");//createElement("AUDIO");
    x.src = audio[index];
}

let ignore = true;
function launchViewer()
{
   // setIndex();
   let modelViewer = document.getElementById("view");
   let exit = modelViewer.shadowRoot.querySelector('#default-exit-webxr-ar-button');
   exit.addEventListener("click", closeAR());
   exit.innerHTML = "Exit AR";
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
   window.open("./index.html","_self")
   modelViewer.exitXR();


  
  
}