/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Hero'];

  // 2nd row: Background image (none present in HTML), leave blank:
  const bgRow = [''];

  // 3rd row: All main content
  // Find the content container
  const container = element.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;
  const col = row.querySelector('.col-lg-12');
  if (!col) return;

  // We'll append all relevant elements to a fragment for the content cell, in their order
  const frag = document.createDocumentFragment();

  // Heading
  const h2 = col.querySelector('h2');
  if (h2) frag.appendChild(h2);
  // Subheading
  const h3 = col.querySelector('h3');
  if (h3) frag.appendChild(h3);
  // Links/CTAs (h5 with links)
  // There are two h5s: first with links, second with table disclaimer
  const h5s = col.querySelectorAll('h5');
  let firstH5WithLinks = null;
  let secondH5WithTable = null;
  if (h5s.length === 2) {
    firstH5WithLinks = h5s[0];
    secondH5WithTable = h5s[1];
  } else if (h5s.length === 1) {
    // fallback: just single h5, check contents
    if (h5s[0].querySelector('a')) {
      firstH5WithLinks = h5s[0];
    } else {
      secondH5WithTable = h5s[0];
    }
  }
  if (firstH5WithLinks) frag.appendChild(firstH5WithLinks);
  // Main description paragraph
  const p = col.querySelector('p');
  if (p) frag.appendChild(p);
  // Disclaimer (table inside h5)
  if (secondH5WithTable) frag.appendChild(secondH5WithTable);

  const contentRow = [frag];

  // Compose the table
  const cells = [
    headerRow,
    bgRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
