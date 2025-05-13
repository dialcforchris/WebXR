
let result;


function startScanning() {
    const html5QrCode = new Html5Qrcode("reader");
    let aspect = 0;
    if(innerHeight>innerWidth)
    {
      aspect = innerHeight / innerWidth;
    }
    else
    {
      aspect = innerWidth / innerHeight;
    }
   
    html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox:{width:450, height:450}, aspectRatio: aspect}, onScanSuccess);
    }
  
  function onScanSuccess(qrCodeMessage) {
    // Handle the scanned QR code message
    console.log(`QR Code detected: ${qrCodeMessage}`);
    result = qrCodeMessage;
   
    localStorage.setItem("result", result);

    window.open(`./portrait.html`,"_self")
    
  }





