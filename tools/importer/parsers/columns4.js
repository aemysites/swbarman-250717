/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single column containing the block name
  const headerRow = ['Columns (columns4)'];

  // Get all direct child divs (columns)
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // There are 3 col-md-4 for the first row, 2 col-md-6 for second row
  const col4 = children.filter(c => c.classList.contains('col-md-4'));
  const col6 = children.filter(c => c.classList.contains('col-md-6'));

  // First row: 3 col-md-4, pad right to 4 columns
  const row1 = [col4[0] || '', col4[1] || '', col4[2] || '', ''];
  // Second row: 2 col-md-6, pad right to 4 columns
  const row2 = [col6[0] || '', col6[1] || '', '', ''];

  // Construct cell data: header row as single column, then 4 columns for each content row
  const cells = [
    headerRow,
    row1,
    row2
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
