/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure block header matches example exactly
  const headerRow = ['Columns (columns4)'];

  // Get all direct children (columns as .col-*)
  const children = Array.from(element.children);

  // Build table rows: first row = first 4 columns, second row = 5th column + 3 empty
  const firstRow = [children[0] || '', children[1] || '', children[2] || '', children[3] || ''];
  const secondRow = [children[4] || '', '', '', ''];

  const cells = [
    headerRow,
    firstRow,
    secondRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
