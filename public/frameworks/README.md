# Framework Downloads - PDF Files

This directory contains framework documentation in both **Markdown** and **PDF** formats.

## Available Files:

### Markdown Source Files (✅ Available)

1. **k12-digital-campus-framework.md**
   - Main digital transformation framework
   - Comprehensive 12-section guide
   - Tables, budgets, implementation roadmap
   - Ready for PDF conversion

2. **k12-support-process-framework.md**
   - Support process documentation
   - Three-tier support model (AI, EdTech, IT Ops)
   - SLA recommendations, ticket fields, implementation checklist
   - Ready for PDF conversion

### PDF Files (🔄 To Be Generated)

1. **k12-digital-campus-framework.pdf**
   - Generated from `.md` source file

2. **k12-support-process-framework.pdf**
   - Generated from `.md` source file

3. **digital-literacy-framework.pdf**
   - Not yet created (source markdown needed)

## How to Generate PDFs from Markdown:

### Option 1: Pandoc (Recommended for Markdown)
Pandoc is a universal document converter that works great with markdown.

**Install Pandoc:**
```bash
# Ubuntu/Debian
sudo apt-get install pandoc texlive-latex-recommended texlive-fonts-recommended

# macOS
brew install pandoc basictex

# Windows
# Download from https://pandoc.org/installing.html
```

**Convert to PDF:**
```bash
# Basic conversion
pandoc k12-digital-campus-framework.md -o k12-digital-campus-framework.pdf

# With table of contents and styling
pandoc k12-digital-campus-framework.md \
  --toc \
  --toc-depth=2 \
  --pdf-engine=xelatex \
  -V geometry:margin=1in \
  -V fontsize=11pt \
  -o k12-digital-campus-framework.pdf

# Convert both frameworks
pandoc k12-digital-campus-framework.md -o k12-digital-campus-framework.pdf --toc
pandoc k12-support-process-framework.md -o k12-support-process-framework.pdf --toc
```

### Option 2: Markdown to PDF Online Tools
- **Markdown PDF** (VS Code extension)
- **Dillinger.io** - Online markdown editor with PDF export
- **StackEdit.io** - Markdown editor with PDF export
- **Marked 2** (macOS) - Professional markdown previewer

### Option 3: Print Web Page to PDF
1. Open the framework page in browser (e.g., https://learning.nyuchi.com/framework)
2. Press Ctrl/Cmd + P (Print)
3. Select "Save as PDF"
4. Adjust margins and remove headers/footers
5. Save with appropriate filename

### Option 4: Professional Design Tools
Create professionally designed PDFs with branding:
- **Canva** - Easy drag-and-drop design
- **Adobe InDesign** - Professional layout
- **Affinity Publisher** - One-time purchase alternative
- **Figma** - Collaborative design tool

**Professional PDF Features:**
- Nyuchi Learning branding and logo
- Table of contents with page numbers
- Headers and footers
- Consistent formatting and typography
- Zimbabwe flag colors as accents

---

## Temporary Solution

Until PDFs are generated, the download links will:
- Fall back to opening the web page
- Show a "PDF coming soon" message
- Or allow users to generate their own PDF using the methods above

## File Specifications

### Markdown Files (.md)
- **Format**: GitHub-flavored Markdown
- **Benefits:**
  - Easy to edit and version control
  - Can be converted to multiple formats (PDF, HTML, DOCX)
  - Readable as plain text
  - Perfect for collaboration and contributions
  - Searchable and accessible

### PDF Files (.pdf)
- **Format**: PDF/A for long-term archival
- **Max Size**: 10MB per file
- **Branding**: Include Nyuchi Learning logo
- **Licensing**: Include open framework license text
- **Version**: Add version number and date
- **Features**: Table of contents, page numbers, headers/footers

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
