
let result;
var globalVariable ={
  result: null
};

function startScanning() {
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox:450,aspectRatio:1.333334 }, onScanSuccess, onScanError);
    }
  
  function onScanSuccess(qrCodeMessage) {
    // Handle the scanned QR code message
    console.log(`QR Code detected: ${qrCodeMessage}`);
    result = qrCodeMessage;
   

    window.open(`./${result}.html`,"_self")
    return result;
  }

function onScanError(errorMessage) {
    // Handle scan error
    console.warn(`QR Code scan error: ${errorMessage}`);
}



