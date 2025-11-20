# SideBar Component

## Purpose
Persistent vertical navigation used across all pages. Collapsible on mobile. Hosts a short list of user "quick links" to saved programs ("Jadwals Vault" preview).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeKey` | `'home' \| 'account' \| 'create' \| 'vault'` | `'home'` | Currently active navigation item |
| `vaultItems` | `Array<{ id: string; title: string; author: string; href?: string }>` | `[]` | Array of saved program quick links |
| `defaultVaultOpen` | `boolean` | `true` | Whether vault section is open by default (desktop only) |
| `onNav` | `(key: string) => void` | `undefined` | Callback fired when a top-level nav item is clicked |
| `onOpenProgram` | `(id: string) => void` | `undefined` | Callback fired when a quick link is clicked |

## Usage

```jsx
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

## Features
- Responsive: Fixed sidebar on desktop, offcanvas on mobile
- Accessible: ARIA labels, keyboard navigation, focus states
- Collapsible vault section with quick links
- Active state indication
- Hover and focus visual feedback

