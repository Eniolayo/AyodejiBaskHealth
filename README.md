# Bask Health Dashboard

A modern, real-time health data dashboard built with Next.js 15, featuring customizable widgets, drag-and-drop functionality, and live data updates. This application provides an intuitive interface for monitoring health metrics with a focus on user experience and performance.

## 🚀 Features

- **Real-time Data Updates**: Automatic data refresh every 5 seconds with manual refresh capability
- **Customizable Dashboard**: Drag-and-drop interface for rearranging widgets
- **Edit Mode**: Toggle between view and edit modes for dashboard customization
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Theme Support**: Light and dark mode with system preference detection
- **Persistent Layout**: User customizations saved to localStorage
- **Interactive Charts**: Sales over time, user engagement, and product analytics
- **Geographic Visualization**: Interactive map showing location-based activity
- **Type Safety**: Full TypeScript implementation with Zod validation
- **Comprehensive Testing**: Jest and React Testing Library with 70% coverage threshold

## 👤 User Journey

### Dashboard Customization

1. **Initial View**: Users land on a pre-configured dashboard with 6 widgets arranged in 3 rows
2. **Edit Mode Activation**: Click the "Edit Mode" button in the header to enable customization
3. **Widget Rearrangement**:
   - Drag widgets within the same row to reorder them
   - Drag widgets between rows to move them to different positions
   - Widgets automatically resize based on their new row configuration
4. **Widget Removal**: In edit mode, click the close button (×) on any widget to remove it
5. **Layout Persistence**: All changes are automatically saved and persist across browser sessions
6. **Reset Functionality**: Use "Reset to Default" to restore the original layout

### Real-time Data Interaction

1. **Auto-refresh**: Data automatically updates every 5 seconds with visual indicators
2. **Manual Refresh**: Click the refresh button for immediate data updates
3. **Pause/Resume**: Toggle auto-refresh on/off using the pause/resume button
4. **Status Indicators**:
   - "Updating..." shows when data is being fetched
   - "Up to date" indicates current data status
   - Countdown timer shows time until next auto-refresh

### Widget Types

- **Summary**: Key metrics including total sales, expenses, gross profit, and order count
- **Orders**: Recent transaction history with user details and amounts
- **Top Products**: Product performance analytics with sales figures
- **Sales Over Time**: Time-series chart showing sales trends
- **Payments History**: Transaction timeline with payment details
- **Locations Map**: Interactive map displaying geographic activity data

## 🏗️ Architecture & Design Decisions

### Technology Stack

**Frontend Framework**: Next.js 15 with App Router

- **Rationale**: Latest React features, improved performance, and built-in optimizations
- **Benefits**: Server-side rendering, automatic code splitting, and enhanced developer experience

**State Management**: React Context + useReducer

- **Rationale**: Lightweight solution for complex state that doesn't require external libraries
- **Benefits**: Predictable state updates, easy testing, and minimal bundle size

**Data Fetching**: TanStack Query (React Query)

- **Rationale**: Robust caching, background updates, and error handling
- **Benefits**: Automatic retries, optimistic updates, and real-time synchronization

**Styling**: Tailwind CSS v4

- **Rationale**: Utility-first approach with excellent developer experience
- **Benefits**: Rapid development, consistent design system, and small bundle size

**Type Safety**: TypeScript + Zod

- **Rationale**: Runtime validation with compile-time type checking
- **Benefits**: Catch errors early, better IDE support, and self-documenting code

**Drag & Drop**: @dnd-kit

- **Rationale**: Modern, accessible drag-and-drop library
- **Benefits**: Touch support, keyboard navigation, and smooth animations

**Maps**: React Leaflet

- **Rationale**: Interactive maps with geographic data visualization
- **Benefits**: Customizable markers, popups, and real-time updates

### Component Architecture

**Context Pattern**: Separate contexts for different concerns

- `DashboardLayoutContext`: Manages widget positioning and edit mode
- `DashboardDataContext`: Handles data fetching and real-time updates
- `ThemeProvider`: Manages light/dark mode preferences

**Component Hierarchy**:

```
App
├── DashboardLayoutProvider
├── DashboardDataProvider
├── ThemeProvider
└── Dashboard
    ├── Header (Edit controls)
    ├── DashboardHeader (Data controls)
    └── DraggableDashboard
        └── Widget Components
```

**Widget System**: Modular, reusable components

- Each widget is self-contained with its own data requirements
- Consistent interface through shared Card component
- Drag-and-drop integration via cardId and rowId props

### Data Flow Architecture

1. **API Layer**:
   - External API proxy through Next.js API routes
   - Zod validation for type safety
   - Error handling with custom error classes

2. **State Management**:
   - React Query for server state (API data)
   - Context + useReducer for client state (layout, theme)
   - localStorage for persistence

3. **Real-time Updates**:
   - Configurable refetch intervals
   - Background updates with visual indicators
   - Optimistic UI updates

### Performance Optimizations

**Bundle Optimization**:

- Dynamic imports for heavy components
- Tree shaking with ES modules
- Code splitting by routes

**Rendering Performance**:

- React.memo for expensive components
- useCallback for event handlers
- Efficient re-renders with proper dependency arrays

**Data Performance**:

- Intelligent caching with React Query
- Background updates to avoid blocking UI
- Optimistic updates for better perceived performance

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Eniolayo/AyodejiBaskHealth.git
   cd AyodejiBaskHealth
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Development

1. **Start the development server**:

   ```bash
   npm run dev
   ```

2. **Open your browser**:
   Navigate to `http://localhost:3000`

3. **Enable Turbopack** (optional):
   The project uses Turbopack for faster development builds. It's enabled by default in the dev script.

### Building for Production

1. **Build the application**:

   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

## 🧪 Testing

### Running Tests

**Unit & Integration Tests**:

```bash
npm run test              # Run all tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage report
```

### Test Coverage

The project maintains comprehensive test coverage with a 70% threshold:

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### Testing Strategy

**Integration Tests**: Jest + React Testing Library

- Component behavior and user interactions
- Context state management
- API integration and error handling
- Drag-and-drop functionality
- Theme switching and persistence

**Test Structure**:

```
__tests__/
├── api/                  # API route tests
├── components/           # Component tests
│   └── ui/              # UI component tests
├── contexts/             # Context tests
├── lib/                  # Utility tests
├── pages/                # Page tests
└── providers/            # Provider tests
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── _components/        # App-specific components
│   │   └── Dashboard/      # Dashboard widgets
│   │       ├── DraggableDashboard.tsx
│   │       ├── Header.tsx
│   │       ├── DashboardHeader.tsx
│   │       ├── SummarySection.tsx
│   │       ├── OrdersSection.tsx
│   │       ├── TopProductsSection.tsx
│   │       ├── SalesOverTimeSection.tsx
│   │       ├── PaymentsHistorySection.tsx
│   │       ├── LocationsMapSection.tsx
│   │       └── MapComponent.tsx
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown.tsx
│       ├── icons.tsx
│       ├── skeleton.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       └── typography.tsx
├── contexts/             # React contexts
│   ├── DashboardDataContext.tsx
│   └── DashboardLayoutContext.tsx
├── lib/                  # Utility libraries
│   ├── api.ts
│   ├── utils.ts
│   └── validation-test.ts
├── providers/            # Provider components
│   ├── query-provider.tsx
│   └── theme-provider.tsx
├── types/                # TypeScript type definitions
│   └── dashboard.ts
└── utils/                # Helper functions
    └── test-utils.tsx
```

## 🎨 Design System

### Typography

- **Font Family**: Geist Sans (primary), Inter (fallback)
- **Scale**: Consistent heading and body text sizes
- **Responsive**: Fluid typography that scales with viewport

### Color Palette

- **Primary**: Neutral grays with semantic color usage
- **Theme Support**: Light and dark mode variants
- **Accessibility**: WCAG AA compliant contrast ratios

### Spacing

- **Grid System**: 8px base unit with consistent spacing scale
- **Responsive**: Adaptive spacing for different screen sizes
- **Component**: Consistent padding and margins throughout

## 🔧 Configuration

### Dashboard Layout

- **Default Configuration**: 3 rows with 6 widgets
- **Responsive Grid**: Automatic column adjustment based on widget count
- **Persistence**: localStorage-based layout saving

### Data Refresh

- **Default Interval**: 5 seconds
- **Configurable**: Adjustable through context props
- **Background Updates**: Non-blocking data synchronization
