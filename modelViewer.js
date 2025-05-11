

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

let startXR = document.getElementById("startAR-button");
let closeXR = document.getElementById("button-back");
let reticle;
let model;
let spawned = false;


//startXR?.addEventListener("click", activateXR);
//closeXR?.addEventListener("click", closeAR);

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
    
    let viewer = document.getElementById("view");
    viewer.src = models[index];
    viewer.poster = posters[index];
  // viewer.dismissPoster();
    var x = document.getElementById("audio");//createElement("AUDIO");
    x.src = audio[index];
}

function launchViewer()
{
   // setIndex();
   
    playAudio();
}


// async function activateXR() {

//    setIndex();
//    var x = document.getElementById("audio");//createElement("AUDIO");
//    x.src = audio[index];
//    document.getElementById("buttonHolder").style.display = "none";
//    document.getElementById("overlay").style.display = "grid";

//    console.log(index);
//    // Add a canvas element and initialize a WebGL context that is compatible with WebXR.
//    const canvas = document.createElement("canvas");
//    document.body.appendChild(canvas);
//   // const button = document.createElement("button");
//   // button.onclick = closeAR();
//    //document.body.canvas.appendChild(button);
//    const gl = canvas.getContext("webgl", { xrCompatible: true });

//    // To be continued in upcoming steps.
//    const scene = new THREE.Scene();

//    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//    directionalLight.position.set(10, 15, 10);
//    scene.add(directionalLight);

//    // Set up the WebGLRenderer, which handles rendering to the session's base layer.
//    const renderer = new THREE.WebGLRenderer({
//        alpha: true,
//        preserveDrawingBuffer: true,
//        canvas: canvas,
//        context: gl
//    });
//    renderer.autoClear = false;
//    // The API directly updates the camera matrices.
//    // Disable matrix auto updates so three.js doesn't attempt
//    // to handle the matrices independently.
//    const camera = new THREE.PerspectiveCamera();
//    camera.matrixAutoUpdate = false;
//    //add back button
   
   
//    let uiElement = document.getElementById("overlay");
//    //input listeners
//    uiElement.addEventListener("touchstart", process_touchstart, false);
//    uiElement.addEventListener("touchmove", process_touchmove, false);
//    uiElement.addEventListener("touchcancel", process_touchcancel, false);
//    uiElement.addEventListener("touchend", process_touchend, false);
//    // Initialize a WebXR session using "immersive-ar".
//    const session = await navigator.xr.requestSession("immersive-ar", { requiredFeatures: ['hit-test'],
//        optionalFeatures:['dom-overlay'], domOverlay: { root: uiElement, type: "screen" } }); 
//    session.updateRenderState({
//        baseLayer: new XRWebGLLayer(session, gl)
       
//    });
// // session.domOverlayState = {
// //     root: uiElement,type:"screen"};

//    // A 'local' reference space has a native origin that is located
//    // near the viewer's position at the time the session was created.
//    const referenceSpace = await session.requestReferenceSpace('local');


//    // Create another XRReferenceSpace that has the viewer as the origin.
//    const viewerSpace = await session.requestReferenceSpace('viewer');
//    // Perform hit testing using the viewer as origin.
//    const hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
//    const loader = new THREE.GLTFLoader();
  
//    loader.load("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf", function (gltf) {
//        reticle = gltf.scene;
//        reticle.visible = false;
//        scene.add(reticle);
//    })

   
//    loader.load(models[index], function (gltf) {
//        model = gltf.scene;
//    });    
   
   

//    session.addEventListener("select", spawnModel);
//    function spawnModel(event)
//    {
//        if (model&&spawned==false) {
//            clone = model.clone();
//            clone.position.copy(reticle.position);
//            clone.rotateY(180);
//            scene.add(clone);
//            directionalLight.target = clone;
//            //light.target = clone;
//            reticle.visible = false;
           
//            //scene.add(light.target);    
//            playAudio();  
//            session.removeEventListener("select",spawnModel); 
//            spawned= true;
//            playAudio();
//        }
   
     
//    }
//    // Create a render loop that allows us to draw on the AR view.
//    const onXRFrame = (time, frame) => {

//        // Queue up the next draw request.
//        session.requestAnimationFrame(onXRFrame);

//        // Bind the graphics framebuffer to the baseLayer's framebuffer
//        gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer)

//        // Retrieve the pose of the device.
//        // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
//        const pose = frame.getViewerPose(referenceSpace);
//        if (pose) {
//            // In mobile AR, we only have one view.
//            const view = pose.views[0];

//            const viewport = session.renderState.baseLayer.getViewport(view);
//            renderer.setSize(viewport.width, viewport.height)

//            // Use the view's transform matrix and projection matrix to configure the THREE.camera.
//            camera.matrix.fromArray(view.transform.matrix)
//            camera.projectionMatrix.fromArray(view.projectionMatrix);
//            camera.updateMatrixWorld(true);
//            const hitTestResults = frame.getHitTestResults(hitTestSource);
//            if (hitTestResults.length > 0 && reticle&&!spawned) {
//                const hitPose = hitTestResults[0].getPose(referenceSpace);
//                reticle.visible =true;
//                reticle.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z)
//                reticle.updateMatrixWorld(true);
//            }
        
//            // Render the scene with THREE.WebGLRenderer.
//            renderer.render(scene, camera)
//        }
//    }
//    session.requestAnimationFrame(onXRFrame);
// }

function playAudio() {
   var x = document.getElementById("audio");//createElement("AUDIO");

    x.play();
}



// let touchpositions = [new THREE.Vector2(), new THREE.Vector2()];

// // touchstart handler
// function process_touchstart(ev) {
//    // Use the event's data to call out to the appropriate gesture handlers
//    switch (ev.touches.length) {
//      case 1:
//        console.log("one touch start");
//        touchpositions[0].set(ev.touches[0].clientX, ev.touches[0].clientY);
//        //handle_one_touch(ev);
//        break;
//      case 2:
//      console.log("two touch start");  
//      touchpositions[1].set(ev.touches[1].clientX, ev.touches[1].clientY);
//      //handle_two_touches(ev);
//        break;
//      case 3:
//      console.log("three touch start");  
//      //handle_three_touches(ev);
//        break;
//      default:
//      console.log("gesture not supported"); 
//      // gesture_not_supported(ev);
//        break;
//    }
//  }
 
//  function rotate(ev) 
//  {
//    //clone.
//  }

//  function scale(ev)
//  {

//  }

//  function process_touchmove(ev) 
//  {
  
//    if(clone==null)
//        return;

//    switch (ev.touches.length) {
//        case 1:
//            let diff = 0;
//        let curr = ev.touches[0].clientX;//, ev.touches[0].clientY);
//        diff+= curr-touchpositions[0].x
//        console.log(diff); 
//        // if(diff<0)
//        // {
//        //     diff = 360-diff;
//        // }
//        console.log(diff); 
//        const radians = ( diff / 100 ) % ( 2 * Math.PI );
//        clone.rotateY(radians);
//          break;
//        case 2:
//            let currPos = new THREE.Vector2(ev.touches[0].clientX, ev.touches[0].clientY);
//            let currPos2 = new THREE.Vector2(ev.touches[1].clientX, ev.touches[1].clientY);
//           let dist= currPos.distanceTo( currPos2 ) - touchpositions[0].distanceTo( touchpositions[1] );
//           let scale = new THREE.Vector3(clone.scale.x+dist*0.01, clone.scale.y+dist*0.01, clone.scale.z+dist*0.01);
//           scale.clamp(new THREE.Vector3(0.5,0.5,0.5), new THREE.Vector3(1.5,1.5,1.5));
//            clone.scale.set(scale.x, scale.y, scale.z);
//        console.log("two touch start");  
//          break;
//        case 3:
//        console.log("three touch start");  
//        //handle_three_touches(ev);
//          break;
//        default:
//        console.log("gesture not supported"); 
//        // gesture_not_supported(ev);
//          break;
//  }

//  for(let i=0; i<ev.touches.length; i++)
//    {   
//        touchpositions[i].set(ev.touches[i].clientX, ev.touches[i].clientY);
//        console.log("touch move"+ i + " " + touchpositions[i]);
//    }
// }
//  function process_touchcancel(ev)
//  {
//    console.log("touch cancel");
//  }
//  function process_touchend(ev) 
//  {
//    // Use the event's data to call out to the appropriate gesture handlers
//    switch (ev.touches.length) {
//      case 1:
//        {
//            console.log("one touch end");
//        break;}
//      case 2:
//        console.log("two touch end");
// //        handle_two_touches(ev);
//        break;
//      case 3:
//        console.log("three touch end");

//        break;
//      default:
//        console.log("gesture not supported");
// //        gesture_not_supported(ev);
//        break;
//    }
//  }


//  function handle_one_touch(ev) {}
 
//  function handle_two_touches(ev) {}
   
//  function handle_three_touches(ev) {}
   
//    function gesture_not_supported(ev) {}

function pauseAudio() {
   var x = document.getElementById("audio");//createElement("AUDIO");
 x.pause();
}

function closeAR()
{ 
   window.open("./index.html","_self")
   session.end();
   pauseAudio();
   document.body.removeChild(canvas);
   document.body.removeChild(button);  
   model = null;
   spawned = false;
   reticle = null;
  
}