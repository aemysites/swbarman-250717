/* global WebImporter */
export default function parse(element, { document }) {
  // The first row must be a single cell with the block name
  const headerRow = ['Columns (columns5)'];

  // Get the .col-md-6 immediate children (these are the columns)
  const columns = Array.from(element.querySelectorAll(':scope > .col-md-6'));

  // For each column, collect ALL child nodes (preserving icons, headings, br, etc)
  const contentCells = columns.map(col => {
    const nodes = Array.from(col.childNodes).filter(n => {
      // Remove empty text nodes
      return !(n.nodeType === Node.TEXT_NODE && n.textContent.trim() === '');
    });
    // If only one node, just return it; if multiple, return array
    return nodes.length === 1 ? nodes[0] : nodes;
  });

  // The second row is a single array, but with multiple cells for each column
  const tableRows = [headerRow, contentCells];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
