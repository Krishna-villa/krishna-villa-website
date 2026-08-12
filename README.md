# Krishna Villa

Static website for **Krishna Villa**, a boutique homestay in Udaipur, Rajasthan. The site showcases rooms, local experiences, photo gallery, guest reviews, and booking contact details.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, highlights, and overview |
| Rooms | `rooms.html` | Room types and amenities |
| Experiences | `experiences.html` | Local activities and curated stays |
| Gallery | `gallery.html` | Photo gallery with lightbox |
| About | `about.html` | Story and host introduction |
| Reviews | `reviews.html` | Guest testimonials |
| Location | `location.html` | Map, directions, and nearby attractions |
| Contact | `contact.html` | Booking inquiry form and contact info |

## Tech stack

- **HTML5** — semantic, multi-page layout
- **CSS3** — shared stylesheet with a Rajasthan-inspired palette (maroon, gold, cream)
- **Vanilla JavaScript** — no frameworks or build step
- **Google Fonts** — Playfair Display & Poppins

## Project structure

```
krishna-villa/
├── index.html          # Homepage
├── rooms.html
├── experiences.html
├── gallery.html
├── about.html
├── reviews.html
├── location.html
├── contact.html
├── css/
│   └── style.css       # Shared styles for all pages
├── js/
│   └── main.js         # Mobile nav, scroll reveal, lightbox, FAQ, form
├── img/                # SVG placeholder images
└── images/             # Directory for real photos
```

## Getting started

No install or build step is required.

**Option 1 — open directly**

Open `index.html` in your browser.

**Option 2 — local server (recommended)**

A local server avoids path issues and behaves closer to production:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (if npx is available)
npx serve .
```

Then visit [http://localhost:8000](http://localhost:8000).

## Features

- Responsive layout with mobile navigation
- Scroll-reveal animations
- Gallery lightbox (keyboard and click navigation)
- FAQ accordion on relevant pages
- Contact form with client-side validation
- WhatsApp and click-to-call links in the header

## Customization

- **Contact details** — update phone, email, and WhatsApp links in each page header/footer
- **Images** — replace SVG placeholders in `img/` with real photos in `images/`, then update `src` attributes in the HTML
- **Colors & typography** — edit CSS variables at the top of `css/style.css`
- **Content** — edit text directly in the HTML files

## Deployment

Upload the project folder to any static host (GitHub Pages, Netlify, Vercel, or shared hosting). Ensure all paths remain relative so the site works without a backend.

## License

All rights reserved — Krishna Villa.
