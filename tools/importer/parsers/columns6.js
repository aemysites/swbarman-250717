/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell as required
  const headerRow = ['Columns (columns6)'];

  // Get all immediate child <div>s
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Find first row: the three .col-md-4 elements (icon + heading)
  const iconCols = children.filter(div => div.classList.contains('col-md-4'));
  while (iconCols.length < 3) iconCols.push(''); // Pad if fewer than 3

  // Find paragraphs inside .col-md-6 (centered descriptions)
  const contentCols = children.filter(div => div.classList.contains('col-md-6'));
  // Each content row must have three columns: [ '', content, '' ]
  const contentRows = contentCols.map(col => ['', col, '']);

  // Build all rows: header is a single cell, others are three columns
  const cells = [
    headerRow,
    iconCols,
    ...contentRows
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
