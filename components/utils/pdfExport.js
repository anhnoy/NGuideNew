import { PDFDocument } from "pdf-lib";
import * as domToImage from "dom-to-image";

export async function exportToPDF(
  elementId,
  fileName = "export.pdf",
  options = {}
) {
  if (!elementId || typeof elementId !== "string") {
    throw new Error("Invalid elementId provided");
  }

  // Check browser environment
  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error("PDF export is only available in browser environment");
  }

  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // เพิ่มการรอให้รูปโหลดเสร็จก่อน
    const images = Array.from(element.getElementsByTagName("img"));
    await Promise.all(
      images.map(async (img) => {
        // Wait for images to load
        if (!img.complete) {
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
        }

        // แปลงรูปเป็น base64 เพื่อหลีกเลี่ยงปัญหา CORS
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          img.src = dataUrl;
        } catch (error) {
          // Continue with original image if conversion fails
        }
      })
    );

    // Enhanced domToImage options
    const domToImageOptions = {
      quality: 1.0,
      scale: 2,
      height: element.scrollHeight,
      width: element.scrollWidth,
      style: {
        transform: "scale(1)",
        "transform-origin": "top left",
        "background-color": "white",
      },
      cacheBust: true,
      // Skip broken images instead of failing
      filter: (node) => {
        if (node.tagName === "IMG" && !node.complete) {
          return false;
        }
        return true;
      },
      // Increased timeout for larger elements
      timeout: 15000,
      ...options,
    };

    // Try multiple image conversion methods
    let dataUrl;
    try {
      // First try PNG
      dataUrl = await domToImage.toPng(element, domToImageOptions);
    } catch (pngError) {
      try {
        // Fallback to JPEG if PNG fails
        dataUrl = await domToImage.toJpeg(element, {
          ...domToImageOptions,
          quality: 0.95,
        });
      } catch (jpegError) {}
    }

    // Create PDF
    const pdfDoc = await PDFDocument.create();

    // Convert data URL to bytes
    const imageBytes = await fetch(dataUrl)
      .then((response) => response.arrayBuffer())
      .catch((error) => {
        throw new Error("Failed to process image data");
      });

    // Determine image format and embed accordingly
    let pdfImage;
    if (dataUrl.includes("image/png")) {
      pdfImage = await pdfDoc.embedPng(imageBytes);
    } else {
      pdfImage = await pdfDoc.embedJpg(imageBytes);
    }

    // Calculate dimensions (fit to A4)
    const A4_WIDTH = 595;
    const A4_HEIGHT = 842;
    const scaleFactor = Math.min(
      A4_WIDTH / pdfImage.width,
      A4_HEIGHT / pdfImage.height
    );

    const width = pdfImage.width * scaleFactor;
    const height = pdfImage.height * scaleFactor;

    // Add page and draw image
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(pdfImage, {
      x: 0,
      y: 0,
      width: page.getWidth(),
      height: page.getHeight(),
    });

    // Save and download
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("PDF export failed:", error);
    throw error;
  }
}
