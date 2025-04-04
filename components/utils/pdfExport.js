import { PDFDocument } from "pdf-lib";
import * as domToImage from "dom-to-image";

export async function exportToPDF(elementOrId, fileName = "export.pdf", options = {}) {
  // Constants for A4 dimensions and layout
  const A4_WIDTH = 590;
  const A4_HEIGHT = 830;
  const MARGIN = 15;
  const CONTENT_WIDTH = A4_WIDTH - (2 * MARGIN);
  const CONTENT_HEIGHT = A4_HEIGHT - (2 * MARGIN);
  
  // Get the DOM element whether an ID string or element is passed
  let element;
  if (typeof elementOrId === 'string') {
    element = document.getElementById(elementOrId);
    if (!element) {
      throw new Error(`Element with id "${elementOrId}" not found`);
    }
  } else if (elementOrId instanceof Element) {
    element = elementOrId;
  } else {
    throw new Error("Invalid input: must provide either an element ID string or DOM element");
  }

  try {
    // Wait for all images to load first
    const images = element.querySelectorAll('img');
    await Promise.all(
      Array.from(images).map(async (img) => {
        if (!img.complete) {
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
        }
        
        // Convert images to base64 to avoid CORS issues
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          img.src = dataUrl;
        } catch (error) {
          console.warn("Image conversion failed:", error);
        }
      })
    );

    // Enhanced domToImage options with higher scale for better quality
    const scale = 3;
    const domToImageOptions = {
      width: element.offsetWidth * scale,
      height: element.offsetHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        height: element.offsetHeight * scale + 'px',
        backgroundColor: 'white'
      },
      quality: 1.0,
      cacheBust: true,
      filter: (node) => {
        return !(node.tagName === "IMG" && !node.complete);
      },
      timeout: 15000,
      ...options
    };

    // Capture the entire content as a high-quality PNG
    const dataUrl = await domToImage.toPng(element, domToImageOptions);
    
    // Create an image to get dimensions
    const img = new Image();
    img.src = dataUrl;
    await new Promise((resolve) => (img.onload = resolve));

    // Calculate number of pages needed
    const aspectRatio = img.width / img.height;
    const totalHeight = (CONTENT_WIDTH / aspectRatio);
    const numberOfPages = Math.ceil(totalHeight / CONTENT_HEIGHT);

    // Create PDF document
    const pdfDoc = await PDFDocument.create();

    // Process each page
    for (let i = 0; i < numberOfPages; i++) {
      const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
      
      // Calculate the portion of the image for this page
      const pageSection = {
        x: 0,
        y: i * (img.height / numberOfPages),
        width: img.width,
        height: img.height / numberOfPages
      };

      // Create canvas for the page section
      const canvas = document.createElement('canvas');
      canvas.width = pageSection.width;
      canvas.height = pageSection.height;
      const ctx = canvas.getContext('2d');

      // Draw the section
      ctx.drawImage(
        img,
        pageSection.x,
        pageSection.y,
        pageSection.width,
        pageSection.height,
        0,
        0,
        pageSection.width,
        pageSection.height
      );

      // Convert to PNG and embed in PDF
      const pageDataUrl = canvas.toDataURL('image/png');
      const pngImage = await pdfDoc.embedPng(pageDataUrl);

      // Draw on PDF page with margins
      page.drawImage(pngImage, {
        x: MARGIN,
        y: A4_HEIGHT - CONTENT_HEIGHT - MARGIN,
        width: CONTENT_WIDTH,
        height: CONTENT_HEIGHT
      });
    }

    // Save and download PDF
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