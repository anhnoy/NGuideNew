import { PDFDocument, rgb } from 'pdf-lib'
import * as domToImage from 'dom-to-image'

export async function exportToPDF(elementId, fileName = 'export.pdf') {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create()

    // Get the element to convert
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error('Element not found')
    }

    // Convert DOM to image
    const dataUrl = await domToImage.toPng(element, {
      quality: 1.0,
      scale: 2, // Increase quality
      style: {
        // Ensure any scrollable content is captured
        'max-height': 'none',
        'height': 'auto'
      }
    })

    // Convert data URL to bytes
    const response = await fetch(dataUrl)
    const imageBytes = await response.arrayBuffer()

    // Embed the image in the PDF
    const image = await pdfDoc.embedPng(imageBytes)

    // Calculate dimensions while maintaining aspect ratio
    const pdfPage = pdfDoc.addPage([image.width / 2, image.height / 2])
    const { width, height } = pdfPage.getSize()

    // Draw the image
    pdfPage.drawImage(image, {
      x: 0,
      y: 0,
      width,
      height
    })

    // Save the PDF
    const pdfBytes = await pdfDoc.save()

    // Trigger download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    return true
  } catch (error) {
    console.error('PDF export failed:', error)
    throw error
  }
}