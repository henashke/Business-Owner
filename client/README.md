# Eyebrow Artist Management - Client

A React + TypeScript + Vite application for managing eyebrow artist customers with a modern UI using Material-UI.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **MobX** - State management
- **Material-UI (MUI)** - Component library and styling
- **Axios** - HTTP client

## Features

- Full CRUD operations for customers
- Form validation
- Responsive design using MUI Grid system
- Error handling with alert dialogs
- Delete confirmation dialogs
- Active/Inactive customer status
- Real-time state management with MobX

## Project Structure

```
src/
├── components/          # React components
│   ├── CustomerManager.tsx   # Main customer management component
│   ├── CustomerForm.tsx      # Customer form (create/edit)
│   └── CustomerList.tsx      # Customer list table
├── context/            # React context providers
│   └── StoreContext.tsx      # MobX store provider
├── services/           # API services
│   └── customerApi.ts        # Axios API client
├── stores/            # MobX stores
│   └── CustomerStore.ts      # Customer state management
├── App.tsx            # Main app component with MUI theme
└── main.tsx           # Entry point
```

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm/yarn
- Running Quarkus backend on `http://localhost:8080`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

Update the API base URL in `src/services/customerApi.ts` if your backend runs on a different port:

```typescript
const API_BASE_URL = 'http://localhost:8080/api/customers';
```

## Available Scripts

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Styling

All styling is done using MUI's `sx` prop and component theming. No CSS files are used. The theme is configured in `App.tsx`.

## State Management

MobX is used for state management. The `CustomerStore` handles all customer-related operations:
- Fetching customers
- Creating/updating/deleting customers
- Managing form visibility and editing state
- Error handling

Access the store using the `useStore()` hook in any component wrapped by `StoreProvider`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

