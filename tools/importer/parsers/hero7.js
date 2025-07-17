/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content container
  let mainContent = element.querySelector('.col-lg-12.text-center');
  if (!mainContent) mainContent = element;

  // Find all relevant child elements in proper order
  // These selectors ensure we get only the direct children in the presented order
  const children = Array.from(mainContent.childNodes).filter(node => {
    // include element nodes, skip empty text nodes
    return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim() !== '');
  });

  // Compose the content cell (all elements except the table header row, and background row)
  // The background image row is empty (since none is present in the HTML)
  // We'll gather all elements except for script/style, and skip empty text nodes
  const contentElements = [];
  for (const node of children) {
    if (node.nodeType === 1) {
      // If it's an element, always include
      contentElements.push(node);
    } else if (node.nodeType === 3 && node.textContent.trim()) {
      // If it's a non-empty text node, wrap in a span for HTML inclusion
      const span = document.createElement('span');
      span.textContent = node.textContent.trim();
      contentElements.push(span);
    }
  }

  // Create the block table: 1 col, 3 rows (header, background image, content)
  const cells = [
    ['Hero'],
    [''], // No background image in this example
    [contentElements]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
