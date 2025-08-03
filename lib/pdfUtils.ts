// @ts-ignore
import html2pdf from "html2pdf.js";

export const downloadPDF = (
  element: HTMLElement,
  filename = "document.pdf"
) => {
  if (!element) return;

  html2pdf()
    .from(element)
    .set({
      margin: 0.5,
      filename,
      html2canvas: { scale: 2 },
      jsPDF: { format: "a4", orientation: "portrait" },
    })
    .save();
};
