
let result;


function startScanning() {
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox:450, aspectRatio:innerHeight / innerWidth }, onScanSuccess);
    }
  
  function onScanSuccess(qrCodeMessage) {
    // Handle the scanned QR code message
    console.log(`QR Code detected: ${qrCodeMessage}`);
    result = qrCodeMessage;
   
    localStorage.setItem("result", result);

    window.open(`./portrait.html`,"_self")
    
  }





