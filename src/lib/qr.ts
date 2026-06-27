import QRCode from "qrcode";
import { jsPDF } from "jspdf";

export async function generateQrDataUrl(url: string, size = 1024): Promise<string> {
  return QRCode.toDataURL(url, {
    width: size,
    margin: 2,
    errorCorrectionLevel: "H",
    color: { dark: "#0A0A0A", light: "#FFFFFF" },
  });
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export async function downloadQrPdf(url: string, businessName: string) {
  const dataUrl = await generateQrDataUrl(url, 1024);
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, 210, 297, "F");
  doc.setTextColor(212, 175, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("KACH QR CODE", 105, 30, { align: "center" });
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.text(businessName, 105, 50, { align: "center" });
  doc.addImage(dataUrl, "PNG", 55, 80, 100, 100);
  doc.setFontSize(10);
  doc.setTextColor(180, 180, 180);
  doc.text("Scan to view profile", 105, 200, { align: "center" });
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(url, 105, 210, { align: "center" });
  doc.save(`${businessName}-qr.pdf`);
}

export function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .substring(0, 60) || `client-${Date.now()}`
  );
}

export function buildClientUrl(slug: string): string {
  if (typeof window === "undefined") return `/c/${slug}`;
  return `${window.location.origin}/c/${slug}`;
}
