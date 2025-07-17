/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children
  const children = Array.from(element.children);
  // Get all .col-md-4 columns (icons + headings)
  const colMd4s = children.filter(c => c.classList.contains('col-md-4'));
  // Get all .col-md-6 columns (text blocks)
  const colMd6s = children.filter(c => c.classList.contains('col-md-6'));

  // Build columns for first row: icons with headings
  const firstRow = colMd4s.map(col => {
    const cellContent = [];
    // Only reference existing elements
    const icon = col.querySelector('.fa-stack');
    if (icon) cellContent.push(icon);
    const heading = col.querySelector('h4');
    if (heading) cellContent.push(heading);
    return cellContent;
  });

  // There should be 3 columns in total. If less, pad with empty strings.
  while (firstRow.length < 3) firstRow.push('');

  // Each .col-md-6 should provide text for a new row (center column)
  const textRows = colMd6s.map(col => {
    // There are always 3 columns in the block
    // Place the paragraph in the center cell
    const cells = ['', '', ''];
    const p = col.querySelector('p');
    if (p) cells[1] = p;
    return cells;
  });

  // Table header
  const headerRow = ['Columns (columns3)'];
  // Final table structure
  const tableRows = [headerRow, firstRow, ...textRows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
