// exportUtils.js
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";

// Export selected items to CSV
export const exportToCSV = (data, title) => {
  const csvData = Papa.unparse(data);
  const blob = new Blob([csvData], { type: "text/csv" });
  // Generate a download link and initiate the download
  const url = URL.createObjectURL(blob);
  //A new <a> (anchor) element is created dynamically.

  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.toLocaleLowerCase()}.csv`; // specify the filename
  link.click(); //download the file
  URL.revokeObjectURL(url);
};

export const exportToPDF = (tableData, header, title) => {
  const doc = new jsPDF();
  // Set font and styling
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 255);
  doc.text(`Selected ${title}`, 10, 10);
 
  // Add table with headers and body
  autoTable(doc, {
    head: header,
    body: tableData,
    startY: 20, // Start the table below the title
    theme: "striped", // Add striped rows
    styles: {
      fontSize: 12,
      cellPadding: 5,
    },
    headStyles: {
      fillColor: [0, 51, 204], // Header background color (blue)
      textColor: [255, 255, 255], // Header text color (white)
      fontSize: 14,
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240], // Light gray for alternate rows
    },
  });
  // Current date
  const currentDate = new Date().toLocaleDateString();
  let y = doc.lastAutoTable.finalY + 10; // Get the last Y position from the table

  // Add date
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0); // Black color for the text
  doc.text(`Generated on: ${currentDate}`, 10, y);

  // Add footer text
  doc.setFontSize(8);
  doc.text(
    "This is a system-generated report. All rights reserved.",
    10,
    y + 10
  );
  doc.save(`${title.toLocaleLowerCase()}.pdf`);
};
