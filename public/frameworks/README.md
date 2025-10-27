# Framework Downloads - PDF Files

Place PDF versions of framework documentation here.

## Required Files:

1. **k12-digital-campus-framework.pdf**
   - Main digital transformation framework
   - Content from `/framework` page

2. **k12-support-process-framework.pdf**
   - Support process documentation
   - Three-tier support model
   - Content from `/support-framework` page

3. **digital-literacy-framework.pdf**
   - Comprehensive mobile-first digital literacy framework
   - Student standards (Ages 5-18+)
   - Adult/teacher framework
   - Digital citizenship
   - Content from `/digital-literacy-framework` page

## How to Generate PDFs:

### Option 1: Print to PDF from Browser
1. Open the framework page in browser
2. Press Ctrl/Cmd + P (Print)
3. Select "Save as PDF"
4. Save with appropriate filename
5. Place in this directory

### Option 2: Use a PDF Generation Tool
- **wkhtmltopdf**: Command-line HTML to PDF
  ```bash
  wkhtmltopdf https://learning.nyuchi.com/framework k12-digital-campus-framework.pdf
  ```
- **Puppeteer**: Node.js library
- **Prince XML**: Commercial solution
- **Pandoc**: Markdown/HTML to PDF converter

### Option 3: Design in Canva/Adobe
Create professionally designed PDFs with:
- Nyuchi Learning branding
- Table of contents
- Page numbers
- Headers/footers
- Consistent formatting

## Temporary Solution:

Until PDFs are generated, the download links will:
- Fall back to opening the web page
- Show a "PDF coming soon" message
- Or directly download the current HTML page

## File Specifications:

- **Format**: PDF/A for long-term archival
- **Max Size**: 10MB per file
- **Branding**: Include Nyuchi Learning logo
- **Licensing**: Include open framework license text
- **Version**: Add version number and date

## License Text to Include:

```
K-12 Digital Campus Framework
Created by Nyuchi Learning (Division of Nyuchi Africa)
Version 1.0 | October 2025

This framework is open and freely shareable.
You may use, copy, adapt, and distribute this framework.
No attribution required, but appreciated.

For updates and more frameworks: https://learning.nyuchi.com
```
