Here is the **updated brief** including the outer wrapper div with the background color:

---

# **Section: Shop Collection Arch — Development Brief (Updated)**

### **Overview**

Refer to the desktop prototype in:
`@prototype/section-shop-collection-arch/`
Use this brief + prototype to form the final layout before coding.

---

## **0. Outer Wrapper**

* A main wrapper `<div>` around the entire section.
* **Background color:** `#FFFAF5`.

---

## **1. Main Container (Desktop Base Layout)**

* Figma artboard: **1440 × 1158**
* Implementation: **1440 × 1160** (divisible by 8 for consistency)
* Padding:

  * **Top / Bottom:** 152px
  * **Left / Right:** 48px

---

## **2. Heading — “Radiance Collection”**

* Fixed width: **344px**
* Typography specs: pull directly from Figma.
* Responsiveness:

  * Desktop **1250px – 1440px+** → width stays fixed (344px).
  * Below this → normal responsive scaling.

---

## **3. Video Arch + Inner Box Structure**

### **3a. Position**

* Arch container starts **72px below the heading**.

### **3b. Video Arch Container**

* **Clip-path** creates the arch shape.
* Size: **472px (W) × 712px (H)**.
* Video rules:

  * Looping, muted autoplay.
  * Accepts **all video types** — YouTube, Vimeo, CDN direct links (remove current limitation of YT/Vimeo only).

### **3c. Inner Rectangular Box**

* Size: **272px (W) × 432px (H)**.
* Positioned **56px from the bottom** of the arch container (positioning method flexible).

### **3d. Inner Arch Clip (White Mask)**

* Acts as the masked arch inside the rectangle.
* Size: **232px (W) × 264px (H)**.
* Positioned **16px from the bottom**, centered horizontally.
* Border radius matching arch curvature.

### **3e. CTA Button**

* Placed inside the clipped arch.
* Outlined style (per Figma).
* Positioned **16px from the bottom** of the clip-path container.

---

## **4. Large Circle Element**

* Size: **1272px (W) × 424px (H)**.
* Border:

  * Thickness: **10px**
  * Color: **#3E6282**
* Rotation: **-16deg**.

---

## **5. Side Images (Left & Right)**

* Size: **224px (W) × 304px (H)** each.
* Left image:

  * Bottom aligns visually with the **bottom of the video arch**.
* Right image:

  * Top aligns with the **top of the video arch**.

---

## **6. Z-Index Stacking (Bottom → Top)**

1. Circle
2. Rotating star around circle
3. Side images
4. Video arch container
5. Inner rectangle
6. Inner clipped arch
7. CTA button

---

## **7. Assets Provided***
1. Round over-titled
2. video arch svg
3. inner rectange arch clipped in white already created
