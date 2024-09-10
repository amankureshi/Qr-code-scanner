import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const [scannerVisible, setScannerVisible] = useState(false);

  useEffect(() => {
    let scanner;
    if (scannerVisible) {
      scanner = new Html5QrcodeScanner("reader", {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      });
      scanner.render(success, error);
    }

    function success(result) {
      scanner.clear();
      setScanResult(result);
      setScannerVisible(false);
    }
    function error(err) {
      console.warn(err);
    }
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scannerVisible]);

  return (
    <div>
      <h1>QR Code Reader</h1>
      {scanResult ? (
        <div>
          Success: <a href={scanResult}>{scanResult}</a>
        </div>
      ) : scannerVisible ? (
        <div id="reader"></div>
      ) : (
        <button className="start-btn" onClick={() => setScannerVisible(true)}>
          Start Scanning
        </button>
      )}
    </div>
  );
}

export default Scanner;
