---
name: Kinetic Horizon
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#594139'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#8d7168'
  outline-variant: '#e1bfb5'
  surface-tint: '#ab3500'
  primary: '#ab3500'
  on-primary: '#ffffff'
  primary-container: '#ff6b35'
  on-primary-container: '#5f1900'
  inverse-primary: '#ffb59d'
  secondary: '#875138'
  on-secondary: '#ffffff'
  secondary-container: '#fdb697'
  on-secondary-container: '#79452d'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#999a9a'
  on-tertiary-container: '#303233'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#832600'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#fdb697'
  on-secondary-fixed: '#351001'
  on-secondary-fixed-variant: '#6b3a23'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style
The design system is engineered for the high-velocity world of urban mobility and ride-hailing. The brand personality is energetic yet dependable, evoking a sense of forward motion and logistical precision. It prioritizes clarity and immediate recognition, ensuring users can navigate complex tasks—like booking a ride or tracking a delivery—under various lighting conditions and stress levels.

The aesthetic follows a **Corporate / Modern** style with a focus on utility. It utilizes a vibrant primary accent to draw attention to critical actions while maintaining a clean, professional foundation through expansive whitespace and a disciplined neutral palette. The interface feels lightweight and responsive, mirroring the efficiency of the services it powers.

## Colors
The color palette is anchored by a high-visibility primary orange, chosen for its association with energy and caution-to-action in urban environments. This is supported by a light secondary tint used for subtle backgrounds and non-urgent highlights.

The neutral scale is strictly functional:
- **Surface & Backgrounds:** Pure white is used for the primary canvas to maximize contrast, while a very light grey (#fafafa) identifies input areas and secondary containers.
- **Typography:** A deep charcoal (#333) provides optimal readability against white backgrounds, while mid-tones are reserved for metadata and placeholder text to maintain a clear visual hierarchy.
- **Divisions:** Hairline borders in #e0e0e0 provide structure without adding visual noise.

## Typography
This design system utilizes **Inter** exclusively to leverage its exceptional legibility and systematic, utilitarian feel. The type scale is designed to handle dense information—such as ride details or pricing—without sacrificing clarity.

- **Headlines:** Use tighter letter spacing and heavier weights to anchor sections.
- **Body Text:** Standard weights are used for readability, with a slightly generous line height to ensure ease of scanning.
- **Labels:** Small, often capitalized labels are used for categories and metadata to distinguish them from interactive body text.

## Layout & Spacing
The layout relies on a **fluid 12-column grid** for desktop and tablet, and a **4-column grid** for mobile. A consistent 8px base unit (the "spacing scale") governs all margins, padding, and gaps to ensure mathematical harmony across all screens.

On mobile devices, margins are constrained to 16px to maximize the available real estate for maps and lists. As the viewport expands to desktop, margins increase to 32px or more to prevent content from feeling stretched. Components like cards and list items should use "md" (16px) padding internally to maintain a professional, airy feel.

## Elevation & Depth
Depth in the design system is communicated through **tonal layers** and **ambient shadows**. 

1.  **Level 0 (Base):** The primary background (#ffffff).
2.  **Level 1 (Cards/Lists):** White surfaces with a subtle, 1px border (#e0e0e0) or a very soft, diffused shadow (0px 4px 12px rgba(0,0,0,0.05)).
3.  **Level 2 (Modals/Overlays):** Elevated surfaces with a more pronounced shadow (0px 8px 24px rgba(0,0,0,0.08)) to indicate they sit above the primary workflow.

This approach ensures that the most important information—like a "Confirm Ride" card—is visually prioritized without using heavy or distracting effects.

## Shapes
The shape language is defined by **rounded-lg (8px)** corners, which strikes a balance between professional discipline and modern friendliness. 

- **Buttons & Inputs:** Use the standard 8px radius.
- **Cards:** Use 16px (rounded-lg) to frame content more softly.
- **Chips & Tags:** May use pill-shaped (full radius) corners to distinguish them from interactive buttons.

This consistent use of rounded geometry makes the interface feel approachable and touch-friendly, essential for mobile-first utility apps.

## Components
- **Buttons:** The primary button is solid #FF6B35 with white text. Secondary buttons use #ffb899 with #333 text or a ghost style with a #e0e0e0 border. All buttons have a minimum height of 48px for touch-target compliance.
- **Input Fields:** Backgrounds are set to #fafafa with a #e0e0e0 border. On focus, the border transitions to #FF6B35. Placeholder text uses #aaa.
- **Cards:** White surfaces with 8px or 16px rounded corners. Use subtle borders for low-priority content and soft shadows for primary interaction points.
- **Chips:** Small, 32px height indicators with #ffb899 backgrounds and #333 text, used for filtering or status labels.
- **Lists:** Clean rows with 16px vertical padding and #e0e0e0 bottom dividers. Interactive list items should show a subtle #fafafa hover/tap state.
- **Checkboxes/Radios:** Primary color #FF6B35 used for active states to ensure they are easily visible against white backgrounds.