# JadwalGYM Front-End Components

React components for the JadwalGYM workout program platform. Built with React, Bootstrap 5, and custom CSS using design tokens.

## Project Structure

```
src/
  components/
    SideBar/
      SideBar.jsx          # Main sidebar navigation component
      SideBar.css          # Component-specific styles
      SideBar.md           # Component documentation
    GuestHome/
      GuestHome.jsx        # Landing page component
      ProgramCard.jsx      # Program card sub-component
      CategoryTile.jsx     # Category tile sub-component
      GuestHome.css        # Component-specific styles
    Rating/
      Rating.jsx           # Star rating component
      Rating.css           # Component-specific styles
  styles/
    tokens.css             # Design tokens (CSS variables)
    base.css               # Base styles and utilities
```

## Setup

### Prerequisites

- Node.js 16+ and npm/yarn
- React 18+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add Bootstrap 5 CSS to your main HTML file or entry point:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

Or import in your main CSS/JS file:
```css
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
```

3. Import the design tokens and base styles in your main CSS file:
```css
@import './styles/tokens.css';
@import './styles/base.css';
```

## Components

### SideBar

Persistent vertical navigation with collapsible vault section.

**Props:**
- `activeKey`: Currently active navigation item ('home' | 'account' | 'create' | 'vault')
- `vaultItems`: Array of saved program quick links
- `defaultVaultOpen`: Whether vault is open by default (desktop only)
- `onNav`: Callback when nav item is clicked
- `onOpenProgram`: Callback when quick link is clicked

**Usage:**
```jsx
import SideBar from './components/SideBar/SideBar';

<SideBar
  activeKey="home"
  vaultItems={[
    { id: '1', title: 'Morning Cardio', author: 'John Doe' },
    { id: '2', title: 'Strength Training', author: 'Jane Smith' }
  ]}
  onNav={(key) => console.log('Navigate to:', key)}
  onOpenProgram={(id) => console.log('Open program:', id)}
/>
```

### GuestHome

Landing page with search bar, popular programs grid, and categories grid.

**Props:**
- `popularPrograms`: Array of program objects
- `categories`: Array of category objects
- `onSearch`: Callback when search is submitted
- `onOpenProgram`: Callback when program card is clicked
- `onCategoryClick`: Callback when category tile is clicked

**Usage:**
```jsx
import GuestHome from './components/GuestHome/GuestHome';

<GuestHome
  popularPrograms={dummyPrograms}
  categories={dummyCategories}
  onSearch={(query) => console.log('Search:', query)}
  onOpenProgram={(id) => console.log('Open program:', id)}
  onCategoryClick={(id) => console.log('Category:', id)}
/>
```

### Rating

Reusable star rating input component.

**Props:**
- `value`: Controlled value (0-5)
- `defaultValue`: Uncontrolled initial value
- `onChange`: Callback when star is selected
- `onSubmit`: Callback when "Rate" button is clicked
- `size`: Size variant ('sm' | 'md' | 'lg')
- `label`: Accessible prompt text

**Usage:**
```jsx
import Rating from './components/Rating/Rating';

<Rating
  defaultValue={0}
  onChange={(value) => console.log('Selected:', value)}
  onSubmit={(value) => console.log('Rated:', value)}
  size="md"
  label="What is your opinion on this workout?"
/>
```

## Design Tokens

The project uses CSS custom properties for theming. Default theme is dark (black + turquoise/green).

**Key Tokens:**
- `--color-bg`: Background color
- `--color-surface`: Surface/card background
- `--color-primary`: Primary accent color (turquoise)
- `--color-text`: Primary text color
- `--color-text-muted`: Muted text color
- `--radius-2xl`: Large border radius
- `--shadow-soft`: Soft shadow
- `--focus-ring`: Focus ring color

To switch to light theme, add `data-theme="light"` to the `<html>` element.

## Accessibility

All components include:
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader friendly markup

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (Bootstrap 5 breakpoints)

## Development

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Notes

- Components use dummy data for now (no real API integration)
- Routing is handled by the parent application
- Components are designed to be portable and reusable
- All styling uses Bootstrap 5 utilities + custom CSS layer

