import { useEffect, useRef } from "react";

interface UpiQrCodeProps {
  upiId: string;
  amount: number;
  name: string;
  note?: string;
  size?: number;
}

export function UpiQrCode({ upiId, amount, name, note = "GuideSoft Payment", size = 200 }: UpiQrCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const upiString = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    
    // Generate QR code using a simple matrix approach
    generateQR(canvasRef.current, upiString, size);
  }, [upiId, amount, name, note, size]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="p-4 bg-white rounded-2xl shadow-lg">
        <canvas ref={canvasRef} width={size} height={size} className="rounded-lg" />
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Scan with any UPI app to pay
      </p>
    </div>
  );
}

// Minimal QR code generator using the QR code API image
function generateQR(canvas: HTMLCanvasElement | null, data: string, size: number) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}&margin=8`;
  img.onload = () => {
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
  };
  img.onerror = () => {
    // Fallback: draw a placeholder
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#6b7280";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("QR Code", size / 2, size / 2);
  };
}