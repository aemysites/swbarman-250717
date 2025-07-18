/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per requirements
  const headerRow = ['Columns (columns6)'];

  // Get all direct child divs
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Identify the three icon columns (col-md-4)
  const iconCols = children.filter(div => div.classList.contains('col-md-4'));
  // These should be 3 columns exactly, but handle if not
  const rowIcons = [
    iconCols[0] || '',
    iconCols[1] || '',
    iconCols[2] || ''
  ];

  // Now, get the two paragraphs (col-md-6) that represent the two text rows
  const textCols = children.filter(div => div.classList.contains('col-md-6'));
  // There are two rows of text, both centered, so they go in the middle column (col 2)
  // Each row: [ '', text, '' ]
  const rowText1 = [ '', textCols[0] || '', '' ];
  const rowText2 = [ '', textCols[1] || '', '' ];
  
  const cells = [
    headerRow,
    rowIcons,
    rowText1,
    rowText2
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
