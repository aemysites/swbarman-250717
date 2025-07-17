/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children
  const children = Array.from(element.children);

  // Extract top icon/heading columns (.col-md-4)
  const iconColumns = children.filter(c => c.classList.contains('col-md-4')).map(col => {
    // Create a wrapper div for stacking icon and heading
    const div = document.createElement('div');
    // Move the .fa-stack (icon)
    const icon = col.querySelector('.fa-stack');
    if (icon) div.appendChild(icon);
    // Move the heading
    const heading = col.querySelector('h4, h3, h2, h1');
    if (heading) div.appendChild(heading);
    return div;
  });

  // Find .col-md-6 paragraphs for the text rows
  const textCols = children.filter(c => c.classList.contains('col-md-6')).map(col => {
    // If there's only a <p>, use it; otherwise, use the whole col
    const para = col.querySelector('p');
    return para ? para : col;
  });

  // Ensure we have three columns for each row (pad with empty if needed)
  function padToThree(arr) {
    return arr.length === 3 ? arr : arr.concat(Array(3 - arr.length).fill(''));
  }

  const rows = [
    ['Columns (columns3)'],
    padToThree(iconColumns),
    padToThree(textCols),
  ];

  // Remove any trailing rows that are all empty
  while (rows.length > 2 && rows[rows.length - 1].every(cell => cell === '' || (cell.textContent && !cell.textContent.trim()))) {
    rows.pop();
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
