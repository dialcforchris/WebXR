const models = ["./minaturePortrait.gltf",
    "./TestModel.gltf",
     "./TestModel.gltf"];
let index = -1;
let video = document.getElementById("video");
let reticle;
let model;
let spawned = false;

async function activateXR(_idx) {
    console.log(_idx);
    // Add a canvas element and initialize a WebGL context that is compatible with WebXR.
    //I think i need to get the created canvas element and set it to active 
    const canvas = document.getElementById("canvas");//createElement("canvas");
    document.body.appendChild(canvas);
   // const button = document.createElement("button");
   // button.onclick = closeAR();
    //document.body.canvas.appendChild(button);
    const gl = canvas.getContext("webgl", { xrCompatible: true });
    index = _idx;
    // To be continued in upcoming steps.
    const scene = new THREE.Scene();

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 15, 10);
    scene.add(directionalLight);

    // Set up the WebGLRenderer, which handles rendering to the session's base layer.
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true,
        canvas: canvas,
        context: gl
    });
    renderer.autoClear = false;

    // The API directly updates the camera matrices.
    // Disable matrix auto updates so three.js doesn't attempt
    // to handle the matrices independently.
    const camera = new THREE.PerspectiveCamera();
    camera.matrixAutoUpdate = false;
    //add back button
    let uiElement = document.getElementById("button-back");
    // Initialize a WebXR session using "immersive-ar".
    const session = await navigator.xr.requestSession("immersive-ar", { requiredFeatures: ['hit-test'],optionalFeatures:['dom-overlay'], domOverlay: { root: uiElement } }); session.updateRenderState({
        baseLayer: new XRWebGLLayer(session, gl)
    });

    // A 'local' reference space has a native origin that is located
    // near the viewer's position at the time the session was created.
    const referenceSpace = await session.requestReferenceSpace('local');


    // Create another XRReferenceSpace that has the viewer as the origin.
    const viewerSpace = await session.requestReferenceSpace('viewer');
    // Perform hit testing using the viewer as origin.
    const hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
    const loader = new THREE.GLTFLoader();
    
    loader.load("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf", function (gltf) {
        reticle = gltf.scene;
        reticle.visible = false;
        scene.add(reticle);
    })

    
    loader.load(models[_idx], function (gltf) {
        model = gltf.scene;
    });    
    
    session.addEventListener("select", spawnModel,);
    function spawnModel(event)
{
    if (model&&spawned==false) {
        const clone = model.clone();
        clone.position.copy(reticle.position);
        scene.add(clone);
        directionalLight.target = clone;
        //light.target = clone;
        reticle.visible = false;
        
        //scene.add(light.target);    
        playAudio();  
        session.removeEventListener("select",spawnModel); 
        spawned= true;
        playAudio();
    }
}

    //session.addEventListener("select", function () {
    //    if (model&&!spawned) {
    //         const clone = model.clone();
    //         clone.position.copy(reticle.position);
    //         loader.view.Scene.removeChild(reticle);
    //         scene.add(clone);
    //         light.target = clone;
    //         scene.removeChild(reticle);
    //         reticle = null;
    //         scene.add(light.target);    
    //         playAudio();  
    //         session.removeEventListener("select"); 
    //         spawned= true;
    //         playAudio();
    //     }
    // });

   
    // Create a render loop that allows us to draw on the AR view.
    const onXRFrame = (time, frame) => {

        // Queue up the next draw request.
        session.requestAnimationFrame(onXRFrame);

        // Bind the graphics framebuffer to the baseLayer's framebuffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer)

        // Retrieve the pose of the device.
        // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
        const pose = frame.getViewerPose(referenceSpace);
        if (pose) {
            // In mobile AR, we only have one view.
            const view = pose.views[0];

            const viewport = session.renderState.baseLayer.getViewport(view);
            renderer.setSize(viewport.width, viewport.height)

            // Use the view's transform matrix and projection matrix to configure the THREE.camera.
            camera.matrix.fromArray(view.transform.matrix)
            camera.projectionMatrix.fromArray(view.projectionMatrix);
            camera.updateMatrixWorld(true);
            const hitTestResults = frame.getHitTestResults(hitTestSource);
            if (hitTestResults.length > 0 && reticle&&!spawned) {
                const hitPose = hitTestResults[0].getPose(referenceSpace);
                reticle.visible =true;
                reticle.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z)
                reticle.updateMatrixWorld(true);
            }
            // Render the scene with THREE.WebGLRenderer.
            renderer.render(scene, camera)
        }
    }
    session.requestAnimationFrame(onXRFrame);
}

function playAudio() {
    var x = document.getElementById("audio");//createElement("AUDIO");
    // x.src = audio[0];
     x.play();

}


function pauseAudio() {
    var x = document.getElementById("audio");//createElement("AUDIO");
  x.pause();
}

function videoStream() {
    video = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({ video: {facingMode: 'environment'} , audio: false}).then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });

}


function closeAR()
{ window.open("./index.html","_self")
    session.end();
    pauseAudio();
    document.body.removeChild(canvas);
    document.body.removeChild(button);  
    model = null;
    spawned = false;
    reticle = null;
   
}