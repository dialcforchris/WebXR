function onScanSuccess(qrCodeMessage) {
    // Handle the scanned QR code message
    console.log(`QR Code detected: ${qrCodeMessage}`);
}

function onScanError(errorMessage) {
    // Handle scan error
    console.warn(`QR Code scan error: ${errorMessage}`);
}

const html5QrCode = new Html5Qrcode("reader");
const qrCodeSuccessCallback = onScanSuccess;
const qrCodeErrorCallback = onScanError;

html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    qrCodeSuccessCallback,
    qrCodeErrorCallback
).catch(err => {
    console.error(`Unable to start scanning: ${err}`);
});