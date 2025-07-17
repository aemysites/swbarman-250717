/* global WebImporter */
export default function parse(element, { document }) {
  // Find all .col-md-4 direct children (icon+heading columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > .col-md-4'));

  // Find all .col-md-6 direct children (center content rows with <p>)
  const col6Divs = Array.from(element.querySelectorAll(':scope > .col-md-6')).filter(div => div.querySelector('p'));
  const paragraphs = col6Divs.reduce((acc, col) => {
    const ps = Array.from(col.querySelectorAll('p'));
    return acc.concat(ps);
  }, []);

  // The header must be a single cell (row with one column)
  const headerRow = ['Columns (columns6)'];
  // The content rows should have the same number of columns as .col-md-4 divs
  const numCols = columnDivs.length;
  // First content row: the three icon+heading columns
  const contentRow = columnDivs;
  // Second content row: only the middle cell has content, the rest are empty
  const subRow = Array.from({length: numCols}, (_, idx) => (idx === 1 ? paragraphs : ''));

  // Compose the table as specified: header row with 1 column, then content rows
  const cells = [headerRow, contentRow, subRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
