/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content area
  const container = element.querySelector('.container');
  if (!container) return;
  const mainCol = container.querySelector('.col-lg-12.text-center');
  if (!mainCol) return;

  // Get relevant pieces from the main content area
  const h2 = mainCol.querySelector('h2'); // Title (Heading)
  const h3 = mainCol.querySelector('h3'); // Subheading
  // The first h5 with links (CTA links)
  let h5Links = null;
  const h5s = mainCol.querySelectorAll('h5');
  if (h5s.length > 0) {
    for (let i = 0; i < h5s.length; i++) {
      if (h5s[i].querySelector('a')) {
        h5Links = h5s[i];
        break;
      }
    }
  }
  // The descriptive paragraph
  const para = mainCol.querySelector('p');
  // The h5 containing the FDIC disclaimer table
  let fdic = null;
  if (h5s.length > 0) {
    for (let i = 0; i < h5s.length; i++) {
      if (h5s[i].querySelector('table')) {
        fdic = h5s[i];
        break;
      }
    }
  }

  // Compose the content cell: include all present elements in order
  const contentEls = [];
  if (h2) contentEls.push(h2);
  if (h3) contentEls.push(h3);
  if (h5Links) contentEls.push(h5Links);
  if (para) contentEls.push(para);
  if (fdic) contentEls.push(fdic);

  // Compose the table cells: header, (no background image), then content
  const cells = [
    ['Hero'],
    [''],
    [contentEls.length === 1 ? contentEls[0] : contentEls]
  ];

  // Create the Hero block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
