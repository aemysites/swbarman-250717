/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct column divs (col-md-6)
  const columns = Array.from(element.querySelectorAll(':scope > div.col-md-6'));

  if (columns.length === 0) return;

  // Properly structure the table: header row should be a single cell, content row matches the column count
  const cells = [];
  // Header row: single cell only
  cells.push(['Columns (columns5)']);
  // Content row: one cell for each column
  cells.push(columns);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
