## Nature Distilled — Design System

### Color Palette

| Role | Value | Usage |
|------|-------|-------|
| Background Start | #FFFBF5 | Cream |
| Background Mid | #FDF0E8 | Soft peach |
| Background End | #F5EFE8 | Warm beige |
| Primary | #E8866A (warm-500) | Buttons, active states |
| Primary Light | #F5A67F (warm-400) | Accents |
| Muted Text | hsl(25,8%,35%) | Body text |
| Sage | #6A9A6F | Growth/nature accents |
| Clover | #3D7A41 | Achievement/milestone |

### Texture
- SVG grain filter: feTurbulence fractalNoise, 0.9 frequency, 4 octaves, 4% opacity
- Applied via body::before fixed overlay, pointer-events: none

### Decorative Elements
- Left-top: warm terracotta leaf (#C67B5C, 15% opacity)
- Right-bottom: olive green leaf (#6B7B3C, 8% opacity)
- SVG paths with subtle stroke lines

### Animations
- Page transitions: 300ms easeOut (enter), 200ms easeIn (exit)
- Micro-interactions: 150-300ms
- Celebration: 1.2s particle burst with 0-0.2s random delays
- Respects prefers-reduced-motion

### Icons
- All UI icons: Lucide React (consistent 20-22px, stroke-width 1.5-2.5)
- No emojis as UI controls (mood emojis are content, not UI)
