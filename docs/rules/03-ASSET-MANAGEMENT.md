# Asset Management

**Minimal asset tracking. Collect all assets before starting development.**

---

## Asset Categories

### 1. Images
- Product images
- Background images
- Hero images
- Logos
- Icons (if not SVG inline)

### 2. Fonts
- WOFF2 files (preferred)
- WOFF files (fallback)
- Font weights needed

### 3. Videos
- MP4 (H.264 codec)
- WebM (fallback)

### 4. Icons
- SVG files (preferred)
- Icon sprite sheets

---

## Storage Structure

```
prototype/
├── assets/                        # GLOBAL (shared across sections)
│   ├── fonts/
│   ├── icons/
│   └── images/
│
└── [section-name]/
    └── assets/                    # SECTION-SPECIFIC only
        ├── images/
        ├── icons/
        └── videos/
```

**Rule:** Global assets in `prototype/assets/`, section-specific in `prototype/[section-name]/assets/`

---

## Asset Collection Process

1. Extract Figma design
2. Identify all required assets
3. Create checklist using template (see `docs/templates/ASSETS-NEEDED.md`)
4. Send to user
5. Wait for all assets
6. Verify quality and format
7. Organize into folders
8. Start development

**DO NOT START DEVELOPMENT WITHOUT ALL ASSETS.**

---

## Asset Requirements

### Images
- Format: JPEG (photos), PNG (transparency), WebP (optimized)
- SVG for icons/logos
- Optimized/compressed

### Fonts
- Format: WOFF2 (preferred), WOFF (fallback)
- Include all weights used in design

### Videos
- Format: MP4 (primary), WebM (fallback)
- Max 5MB for web performance
- Compressed

---

## Liquid Asset Handling

**Prototype assets are for development only.**

In Liquid, use section settings:

```liquid
{% schema %}
{
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "video_url",
      "id": "video",
      "label": "Video URL"
    }
  ]
}
{% endschema %}

<img src="{{ section.settings.image | image_url: width: 1920 }}">
{{ section.settings.video | video_tag }}
```

**Merchants upload final assets via theme customizer.**

---

## When to Upload to /assets Folder

**Rare cases only:**
- Global custom fonts (no Google Fonts alternative)
- Icon sprite sheets (if not using inline SVG)

**Most assets:** Managed via section settings.
