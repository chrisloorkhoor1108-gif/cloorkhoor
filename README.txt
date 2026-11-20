CHRISTOPHER LOORKHOOR — EDITABLE EPORTFOLIO

Extract the entire ZIP, then open index.html in your browser.
Open the files in a code editor to make changes. Save and refresh your browser.

index.html       Homepage (latest layout, About Me before projects)
homepage.css     Homepage-specific formatting
styles.css       Shared formatting for all pages
script.js        Navigation and page behavior
research.html    Research overview
sorbents.html    CO2 capture and sorbent research
catalysis.html   Catalysis and sustainable fuels
projects.html    Engineering projects, including SMR and iGEM
resume.html      Embedded full engineering resume + links to resume/CV PDFs
contact.html     Dedicated Contact page (email and LinkedIn)
assets/          Images, blank placeholders, resume/CV PDFs, and workbook

REPLACE HOMEPAGE IMAGES
Blank homepage images are in assets/homepage/.
Put your real images in that folder and edit the matching src in index.html.
Example:
  src="assets/homepage/portrait.svg"
becomes:
  src="assets/homepage/my-portrait.jpg"
Add descriptive alt text to each real image.
Keep the folder structure intact so links and images continue to work.

This is a local copy of the published website. Editing these files does not automatically update the live website.

EDITING GUIDE

Each HTML file now has labeled comment banners for its major sections.
Search for SECTION, INTRODUCTION, or ARTIFACT PREVIEWS.
Paragraphs are on separate, indented lines inside <p>...</p>.
Change the words inside a tag; keep the opening and closing tags.
Image comments show where to edit src and alt.
Links use href for their destination and the words between <a>...</a> for their label.
CSS rules have one property per line. Colors are listed at the top of styles.css.
Mobile rules are inside @media blocks.

NOVEMBER 2026 UPDATE — RESUME, CONTACT, AND LARGE MONITORS
- Navigation > Résumé opens resume.html, which shows the complete bundled résumé PDF
  directly on the page. The hero's Open Resume and Open CV links still work.
- Navigation > Contact now opens contact.html (not the Résumé page).
- The footer and other navigation keep the existing design.
- On large screens, page content is centered and the homepage hero has a maximum
  width to prevent it stretching too far apart.
- To replace your résumé, overwrite assets/Christopher_Loorkhoor_Resume.pdf
  and keep the filename. To replace the CV, overwrite
  assets/Christopher_Loorkhoor_Academic_CV.pdf.
- To update GitHub Pages, upload the contents of this website folder, not the ZIP,
  into the SAME existing repository and commit the changes. Include contact.html.

NOVEMBER 2026 UPDATE — GOALS PAGE REMOVED
- The standalone Goals page has been removed from this site.
- All navigation and related links to goals.html have been removed.
- When publishing to an EXISTING GitHub repository, also delete the old
  goals.html file from the repository and commit that deletion. Simply
  uploading this new ZIP will not remove old files from the repository.
