/* global WebImporter */
export default function parse(element, { document }) {
  // Find the heading (if any) in the columns block
  const heading = element.querySelector('.section-subhead-head');
  // Find all immediate column children
  const columns = Array.from(element.querySelectorAll(':scope > .col-md-6'));

  // Build the block table data array
  const cells = [];
  // Table header as required by block name/variant
  cells.push(['Columns (columns5)']);

  // If there's a heading, make it its own row, spanning all columns
  if (heading) {
    cells.push([heading]);
  }

  // Add the columns row(s) if any columns found
  if (columns.length) {
    cells.push(columns);
  }

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}