/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all immediate child divs
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // There are 3 main columns (col-md-4) with icon + heading
  const mainColumns = columnDivs.filter(div => div.classList.contains('col-md-4'));

  // There are two col-md-6 divs with description text, each surrounded by col-md-3 (empty)
  const colMd6Divs = columnDivs.filter(div => div.classList.contains('col-md-6'));

  // Build the header row
  const headerRow = ['Columns (columns3)'];

  // First content row: 3 columns, each cell is the full col-md-4 div (icon + heading)
  const columnsRow = mainColumns.map(div => div);

  // Next rows: for each col-md-6, we create a row with content centered in 3 columns
  // Format: [empty, content, empty] if 3 columns
  const rows = colMd6Divs.map(div => ['', div, '']);

  const cells = [
    headerRow,
    columnsRow,
    ...rows
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
