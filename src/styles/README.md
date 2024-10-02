Here’s a detailed guide on how to use the color system in your Tailwind CSS project, covering all the key areas like backgrounds, text, buttons, cards, and hover states. This will help developers know exactly which colors to use and where to apply them, with customization tips for different UI elements.

---

# Tailwind CSS Color Usage Guide

This guide outlines how to apply and modify the various colors in your project for different UI components.

---

### 1. **Links**
   - **Accent**: Use `text-accent` for primary links. This is a bright color that draws attention.
   - **Highlight**: Use `text-highlight` for special or important links. Works well when you need to highlight a particular link in light mode.
   - **Gold** (Dark Mode): Use `dark:text-gold` for primary links in dark mode.
   - **Ocean** (Dark Mode): Use `dark:text-ocean` for important links in dark mode.

### 2. **Buttons**
   - **Primary Button Background**: Use `bg-accent` for main buttons that need to stand out (e.g., "Submit," "Sign Up").
   - **Secondary Button Background**: Use `bg-highlight` for less prominent buttons (e.g., "Learn More").
   - **Alert Button Background**: Use `bg-alert` for danger or destructive actions (e.g., "Delete").
   - **Gold** (Dark Mode): Use `dark:bg-gold` for primary buttons in dark mode.
   - **Ocean** (Dark Mode): Use `dark:bg-ocean` for secondary or action buttons in dark mode.
   - **Crimson** (Dark Mode): Use `dark:bg-crimson` for danger buttons (e.g., "Cancel") in dark mode.

### 3. **Cards**
   - **Card Background**: Use `bg-tertiary` for card backgrounds in light mode, providing a subtle contrast.
   - **Card Border**: Use `border-border` to add a light border around the card.
   - **Shadow** (Dark Mode): Use `dark:bg-shadow` for card backgrounds in dark mode.
   - **Coal Border** (Dark Mode): Use `dark:border-coal` for borders around cards in dark mode.

### 4. **Alerts**
   - **Alert Background**: Use `bg-alert` for alert components that signal important messages or errors.
   - **Alert Text**: Use `text-alert` for text within alert components.
   - **Crimson Background** (Dark Mode): Use `dark:bg-crimson` for alert backgrounds in dark mode.
   - **Crimson Text** (Dark Mode): Use `dark:text-crimson` for alert text in dark mode.

### 5. **General Backgrounds**
   - **Primary Background**: Use `bg-primary` for large areas such as the main page background or containers.
   - **Secondary Background**: Use `bg-secondary` for sections, cards, or smaller containers.
   - **Tertiary Background**: Use `bg-tertiary` for subtle background elements like dividers or modals.
   - **Shade** (Dark Mode): Use `dark:bg-shade` for primary background in dark mode.
   - **Dim** (Dark Mode): Use `dark:bg-dim` for secondary containers or sections in dark mode.
   - **Shadow** (Dark Mode): Use `dark:bg-shadow` for tertiary sections or elements like modals in dark mode.

### 6. **General Text**
   - **Deep Text**: Use `text-deep` for headings or important content that needs strong emphasis.
   - **Soft Text**: Use `text-soft` for less prominent text such as secondary descriptions or metadata.
   - **Muted Text**: Use `text-muted` for footnotes or placeholder text, where content is less important.
   - **Light Text** (Dark Mode): Use `dark:text-light` for main content in dark mode.
   - **Pale Text** (Dark Mode): Use `dark:text-pale` for secondary descriptions in dark mode.
   - **Faint Text** (Dark Mode): Use `dark:text-faint` for muted or placeholder text in dark mode.

### 7. **Borders**
   - **Light Border**: Use `border-border` for borders in light mode, ideal for separating sections or card outlines.
   - **Coal Border** (Dark Mode): Use `dark:border-coal` for dark mode borders to create subtle dividers between content areas.

### 8. **Hover States**
   - **Accent Hover**: Use `hover:bg-accent` for buttons or links that need a distinct hover state in light mode.
   - **Highlight Hover**: Use `hover:bg-highlight` for secondary button or link hover states.
   - **Alert Hover**: Use `hover:bg-alert` for danger button hovers, making the user more aware of the action.
   - **Gold Hover** (Dark Mode): Use `dark:hover:bg-gold` for hover effects on primary buttons in dark mode.
   - **Ocean Hover** (Dark Mode): Use `dark:hover:bg-ocean` for hover states on secondary buttons in dark mode.

### 9. **Disabled States**
   - **Muted Background**: Use `bg-muted` for disabled buttons or inputs in light mode.
   - **Faint Background** (Dark Mode): Use `dark:bg-faint` for disabled elements in dark mode, ensuring they appear visibly inactive.

---

### Summary of Color Names

#### **Light Theme**
   - `primary`, `secondary`, `tertiary`, `accent`, `highlight`, `alert`, `border`, `deep`, `soft`, `muted`.

#### **Dark Theme**
   - `shade`, `dim`, `shadow`, `gold`, `ocean`, `crimson`, `coal`, `light`, `pale`, `faint`.

---

## How to Customize the Colors

To change the colors, you can edit them directly in the `tailwind.config.ts` file under the `extend.colors` section. Here's a quick guide:

- For the **Light Theme**, you might adjust colors like `primary`, `secondary`, and `accent`.
- For the **Dark Theme**, you can modify the corresponding dark mode names like `shade`, `dim`, and `gold`.
- Use hover and disabled colors to ensure good interaction feedback for users.

By following these guidelines, you can maintain a clear and consistent color system for all the interactive elements in your application.