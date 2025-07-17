/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Partition columns by col-md-4 (first row) and col-md-6 (second row)
  const firstRowCols = columns.filter(col => col.classList.contains('col-md-4'));
  const secondRowCols = columns.filter(col => col.classList.contains('col-md-6'));

  // Helper to build a cell from a column
  function cellFromColumn(col) {
    // We'll gather all children of the column
    const content = [];
    for (let node of col.childNodes) {
      if (node.nodeType === 1) { // element node
        content.push(node);
      }
    }
    // If only one element, don't wrap in array
    return content.length === 1 ? content[0] : content;
  }

  // Build table rows
  const headerRow = ['Columns (columns4)'];
  // Only add row if there are columns
  const rows = [headerRow];
  if (firstRowCols.length > 0) {
    rows.push(firstRowCols.map(cellFromColumn));
  }
  if (secondRowCols.length > 0) {
    rows.push(secondRowCols.map(cellFromColumn));
  }

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
