const mammoth = require("mammoth");
const pdf = require("html-pdf");
const fs = require("fs");

// Custom CSS styles for the heading and signature
const customStyles = `
    <style>
        /* Centered heading */
        .heading {
            text-align: center;
            font-weight: bold;
            font-size: 24px; /* Adjust the font size as needed */
        }
        table {
            border-collapse: collapse;
            border: 1px solid black;
            width: 100%;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        img {
            max-width: 100%;
            height: auto;
        }

        /* Align signature to the right */
        .signature {
            text-align: right;
            margin-top: 20px; /* Adjust margin as needed */
        }
        body {
            padding: 50px;
        }
        .margin {
            margin-top: 120px;
            font-weight: bold;
            text-align: center;
        }
        .spacing {
            margin-top: 20px;
        }
        .flex {
            display: flex;
            justify-content: space-between;
        }
    </style>
`;

// Function to convert DOCX to HTML using mammoth
const convertDocxToHtml = (inputPath) => {
  return mammoth
    .convertToHtml({ path: inputPath })
    .then((result) => {
      let htmlContent = result.value;

      // Regular expressions to match dynamic content within curly brackets
      const regex1 = /\{(.+?)\}/g; // Matches content within curly brackets {}

      // Replace dynamic values while preserving the styles
      htmlContent = htmlContent.replace(
        regex1,
        '<span class="dynamic-value">$1</span>'
      );

      // Adding custom styles and wrapping the heading in a <div> with class 'heading'
      const modifiedHtml =
        customStyles +
        htmlContent
          .replace(
            "<p>Signature of the Head of the Department with date. Signature of the Principal with date.</p>",
            '<div class="flex"><p>Signature of the Head of the Department with date.</p> Signature of the Principal with date.</div>'
          )
          .replace(
            "<p>Signature of the student with date</p>",
            '<div class="signature">Signature of the student with date</div>'
          )
          .replace(
            "<p><strong>INSTRUCTIONS TO THE STUDENT</strong></p>",
            '<div class="margin">INSTRUCTIONS TO THE STUDENT</div>'
          )
          .replace(
            "<p>Subject for which candidate is Registering including practicals for the current semester</p>",
            '<p class="spacing">Subject for which candidate is Registering including practicals for the current semester</p>'
          );

      return modifiedHtml;
    })
    .catch((err) => {
      throw new Error(`Error during DOCX to HTML conversion: ${err.message}`);
    });
};

// Function to convert HTML to PDF using html-pdf
const convertHtmlToPdf = (html, outputPath) => {
  return new Promise((resolve, reject) => {
    pdf.create(html).toFile(outputPath, (err, res) => {
      if (err) {
        reject(`Error during HTML to PDF conversion: ${err.message}`);
      } else {
        resolve(`PDF created successfully: ${res.filename}`);
      }
    });
  });
};

// Main function to perform the conversion
const convertDocxToPdf = async (inputPath, pdfOutputPath) => {
  try {
    // Step 1: Convert DOCX to HTML
    const html = await convertDocxToHtml(inputPath);

    // Step 2: Convert HTML to PDF
    await convertHtmlToPdf(html, pdfOutputPath);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports = { convertDocxToPdf };
