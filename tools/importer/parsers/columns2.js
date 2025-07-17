/* global WebImporter */
export default function parse(element, { document }) {
  // Create the Columns block header
  const headerRow = ['Columns (columns2)'];
  // Gather all immediate visible content inside the .intro-text area (if any)
  let contentCell;
  const introText = element.querySelector('.intro-text');
  if (introText) {
    // Collect all child nodes (including text nodes!)
    const parts = Array.from(introText.childNodes).filter(node => {
      // Only include elements and non-empty text nodes
      return (node.nodeType === Node.ELEMENT_NODE) || (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);
    });
    if (parts.length > 0) {
      contentCell = parts;
    } else {
      // If .intro-text is empty, put a single empty div
      contentCell = document.createElement('div');
    }
  } else {
    // Fallback: use whatever is inside the element
    const fallbackParts = Array.from(element.childNodes).filter(node => {
      return (node.nodeType === Node.ELEMENT_NODE) || (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);
    });
    contentCell = fallbackParts.length > 0 ? fallbackParts : document.createElement('div');
  }
  // Build the table structure
  const cells = [
    headerRow,
    [contentCell]
  ];
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
