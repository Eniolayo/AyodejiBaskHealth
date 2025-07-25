## ✅ Testing Plan — Integration & E2E

This section outlines **what to test**, **why it's important**, and **how it maps to the dashboard's core features**. It is intended to help any engineer or LLM generate the appropriate tests for this project.

---

### 🔧 1. Integration Tests

Use: `Jest` + `@testing-library/react`

Tests the interaction between **individual components and context/state** without spinning up a full browser.

#### 📦 Test Targets

##### ➤ **Dashboard Context**

- ✅ Toggles `editMode` state
- ✅ Stores layout configuration correctly (e.g. positions of widgets)
- ✅ Persists layout to `localStorage`
- ✅ Restores layout from persisted state

##### ➤ **Header Component**

- ✅ Edit Mode button toggles layout state
- ✅ Reset to Default button clears layout
- ✅ Theme toggle (Light/Dark mode) works and updates document class

##### ➤ **Widget Components (Card, Chart, Table, Map)**

- ✅ Renders with correct props from API data
- ✅ Updates when new data is fetched
- ✅ Applies dynamic styles from server
- ✅ Close (delete) button removes the widget from the layout (in edit mode only)

##### ➤ **Drag-and-Drop Layout**

- ✅ Card can be reordered within the same row
- ✅ Card can be moved across rows
- ✅ Close button removes card from the layout state
- ✅ Reset button reverts to initial layout configuration

##### ➤ **Theme Management**

- ✅ UI reflects the correct theme based on state (light/dark)
- ✅ Dynamic styles apply properly to components

---

### 🧪 2. End-to-End (E2E) Tests

Use: `Playwright`

Tests the **full application behavior** in a real browser — from page load to interaction.

#### 🔍 Test Scenarios

##### 🌐 **Dashboard Rendering**

- ✅ Page loads and shows all widgets (chart, table, map)
- ✅ Real-time data is fetched from the API every 5 seconds
- ✅ Widget values update when data changes

##### 🧩 **User Customization Flow**

- ✅ User clicks "Edit Mode" and drags widgets to new positions
- ✅ User deletes a widget → widget is removed from view
- ✅ Layout changes persist on page refresh
- ✅ Clicking "Reset to Default" restores original widget positions

##### 🎨 **Theming and Styling**

- ✅ User toggles between light and dark mode
- ✅ Dynamic server styles are applied to components
- ✅ Tokens (from Figma) reflect in font sizes, spacing, colors

##### 📱 **Mobile Responsiveness**

- ✅ Widgets stack vertically on mobile
- ✅ Header and buttons remain accessible and functional on small screens

##### 🔄 **Persistence**

- ✅ Layout state is saved in localStorage
- ✅ Refreshing the page keeps the layout the same
- ✅ Theme state is also preserved across sessions (if implemented)

---

### 🧪 Sample Test Naming Convention

| File Path                                 | Test Type        | Description                                |
| ----------------------------------------- | ---------------- | ------------------------------------------ |
| `tests/integration/Header.test.tsx`       | Integration      | Tests Edit/Reset buttons and theme toggle  |
| `tests/integration/LayoutContext.test.ts` | Integration      | Tests state changes and layout updates     |
| `tests/e2e/dashboard.spec.ts`             | E2E (Playwright) | Tests full dashboard user journey          |
| `tests/e2e/mobile.spec.ts`                | E2E (Playwright) | Verifies mobile layout and widget behavior |

---

### 🛠 Suggested Libraries

- **Integration**: `jest`, `@testing-library/react`, `@testing-library/jest-dom`
- **E2E**: `playwright` (preferred), or `cypress`
- **Mocking**: `msw` (for mocking API responses in integration tests)
- **Persistence Testing**: Use `localStorage` mocking or spy to test state saving

---

### 🧠 Tips for the LLM or Engineer Writing Tests

- Focus on **user behavior** over internal implementation.
- Mock external dependencies like API responses and style sources.
- Avoid testing TailwindCSS classes directly; test visible UI effects instead.
- Validate that **layout persistence** and **real-time updates** work together seamlessly.
