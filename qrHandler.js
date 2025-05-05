
let result;


function startScanning() {
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox:450,aspectRatio:1.333334 }, onScanSuccess, onScanError);
    }
  
  function onScanSuccess(qrCodeMessage) {
    // Handle the scanned QR code message
    console.log(`QR Code detected: ${qrCodeMessage}`);
    result = qrCodeMessage;
   
    localStorage.setItem("result", result);

    window.open(`./portrait.html`,"_self")
    
  }

function onScanError(errorMessage) {
    // Handle scan error
    console.warn(`QR Code scan error: ${errorMessage}`);
}



