# Bask Health Dashboard

A real-time dashboard built with Next.js 15, TailwindCSS, and TypeScript that displays live data from an external API. This project demonstrates advanced React features, responsive design, and user customization capabilities.

## 🌐 Live Demo

**[View Live Dashboard](https://ayodeji-bask-health.vercel.app/)**

Experience the real-time dashboard in action with live data updates every 5 seconds!

## 🎯 Project Overview

This dashboard was built as part of the Bask Health frontend assessment. It showcases real-time data visualization, customizable layouts, and modern web development practices. The application pings an external API every 5 seconds to fetch fresh data and displays it through various interactive widgets.

## ✨ Key Features

### Real-time Data Integration

- **Live Updates**: Automatically fetches data every 5 seconds from the provided API endpoint
- **Manual Refresh**: Users can manually refresh data when needed
- **Status Indicators**: Clear visual feedback showing when data is updating
- **Pause/Resume**: Ability to pause auto-refresh for better control

### Dashboard Customization

- **Drag & Drop Layout**: Users can rearrange widgets by dragging them between rows
- **Edit Mode**: Toggle between view and edit modes for layout customization
- **Persistent Configuration**: User layout preferences are saved to localStorage
- **Reset Functionality**: Option to restore default layout when needed

### Interactive Widgets

- **Summary Cards**: Key metrics including sales, expenses, and profit data
- **Orders Table**: Recent transaction history with user details
- **Top Products**: Product performance analytics with sales figures
- **Sales Over Time**: Interactive chart showing sales trends over time
- **Payments History**: Transaction timeline with payment details
- **Locations Map**: Interactive map displaying geographic activity data

### Design & UX

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Theme Support**: Light and dark mode with system preference detection
- **Modern UI**: Clean, professional interface using TailwindCSS
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 User Journey

### Getting Started

1. **Landing**: Users arrive at a pre-configured dashboard with 6 widgets arranged in 3 rows
2. **Data Loading**: The dashboard immediately starts fetching data and displays it in real-time
3. **Initial Interaction**: Users can view live data updates happening every 5 seconds

### Customizing the Dashboard

1. **Enter Edit Mode**: Click the "Edit Mode" button in the header to enable customization
2. **Rearrange Widgets**:
   - Drag widgets within the same row to reorder them
   - Drag widgets between rows to move them to different positions
   - Widgets automatically resize based on their new configuration
3. **Remove Widgets**: In edit mode, click the close button (×) on any widget to remove it
4. **Save Changes**: All changes are automatically saved and persist across browser sessions
5. **Reset Layout**: Use "Reset to Default" to restore the original layout

### Interacting with Real-time Data

1. **Auto-refresh**: Data automatically updates every 5 seconds with visual indicators
2. **Manual Control**: Click the refresh button for immediate data updates
3. **Pause Updates**: Toggle auto-refresh on/off using the pause/resume button
4. **Status Monitoring**:
   - "Updating..." shows when data is being fetched
   - "Up to date" indicates current data status
   - Countdown timer shows time until next auto-refresh

## 🏗️ Technical Architecture

### Technology Stack

- **Framework**: Next.js 15 with App Router for modern React development
- **Styling**: TailwindCSS for utility-first styling and responsive design
- **Type Safety**: TypeScript throughout for better development experience
- **State Management**: React Context + useReducer for complex state management
- **Data Fetching**: TanStack Query for robust API integration and caching
- **Drag & Drop**: @dnd-kit for accessible drag-and-drop functionality
- **Maps**: React Leaflet for interactive geographic visualizations

### Design Decisions

**Why Next.js 15?**
I chose Next.js 15 for its latest React features, improved performance, and built-in optimizations. The App Router provides better developer experience and automatic code splitting.

**Why TailwindCSS?**
TailwindCSS enables rapid development with consistent design patterns. The utility-first approach makes it easy to create responsive, accessible components while maintaining a small bundle size.

**Why TypeScript?**
TypeScript provides compile-time type checking and better IDE support. Combined with Zod for runtime validation, it ensures data integrity and catches errors early in development.

**State Management Approach**
I used React Context + useReducer for client state (layout, theme) and TanStack Query for server state (API data). This separation keeps the codebase clean and maintainable.

### Component Architecture

```
App
├── DashboardLayoutProvider (manages widget positioning)
├── DashboardDataProvider (handles data fetching)
├── ThemeProvider (manages light/dark mode)
└── Dashboard
    ├── Header (edit controls)
    ├── DashboardHeader (data controls)
    └── DraggableDashboard
        └── Widget Components (modular, reusable)
```

### Performance Optimizations

- **Bundle Optimization**: Dynamic imports and tree shaking
- **Rendering Performance**: React.memo and useCallback for expensive components
- **Data Performance**: Intelligent caching with React Query
- **Background Updates**: Non-blocking data synchronization

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+
- npm or yarn package manager
- Git

### Quick Start

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Eniolayo/AyodejiBaskHealth.git
   cd AyodejiBaskHealth
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

### Building for Production

1. **Build the application**:

   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

## 🧪 Testing

### Running Tests

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

- **Integration Tests**: Component behavior and user interactions
- **Context Tests**: State management and data flow
- **API Tests**: Data fetching and error handling
- **Drag & Drop Tests**: Layout customization functionality
- **Theme Tests**: Light/dark mode switching

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

## 🔧 Configuration

### Dashboard Layout

- **Default Configuration**: 3 rows with 6 widgets
- **Responsive Grid**: Automatic column adjustment based on widget count
- **Persistence**: localStorage-based layout saving

### Data Refresh

- **Default Interval**: 5 seconds
- **Configurable**: Adjustable through context props
- **Background Updates**: Non-blocking data synchronization

## 🚀 Deployment

The application is deployed on Vercel and can be accessed at the provided URL. The deployment includes:

- Automatic builds from the main branch
- Performance monitoring and analytics

## 🤝 Contributing

This project was built as part of a technical assessment. For questions or feedback, please reach out through the provided contact information.
