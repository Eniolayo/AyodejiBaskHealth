import { render, screen, fireEvent, act } from "@testing-library/react";
import {
  DashboardLayoutProvider,
  useDashboardLayout,
} from "@/contexts/DashboardLayoutContext";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Test component to access context
const TestComponent = () => {
  const {
    state,
    toggleEditMode,
    resetToDefault,
    moveCard,
    deleteCard,
    reorderCardsInRow,
  } = useDashboardLayout();

  return (
    <div>
      <div data-testid="edit-mode">{state.isEditMode ? "edit" : "view"}</div>
      <div data-testid="row-count">{state.rows.length}</div>
      <div data-testid="card-count">
        {state.rows.reduce((acc, row) => acc + row.cards.length, 0)}
      </div>

      <button data-testid="toggle-edit" onClick={toggleEditMode}>
        Toggle Edit
      </button>
      <button data-testid="reset-default" onClick={resetToDefault}>
        Reset
      </button>
      <button
        data-testid="move-card"
        onClick={() => moveCard("summary", "row-1", "row-2", 0)}
      >
        Move Card
      </button>
      <button
        data-testid="delete-card"
        onClick={() => deleteCard("summary", "row-1")}
      >
        Delete Card
      </button>
      <button
        data-testid="reorder-cards"
        onClick={() => reorderCardsInRow("row-1", 0, 2)}
      >
        Reorder Cards
      </button>

      {state.rows.map((row, rowIndex) => (
        <div key={row.id} data-testid={`row-${rowIndex}`}>
          {row.cards.map((card, cardIndex) => (
            <div key={card.id} data-testid={`card-${card.id}`}>
              {card.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(<DashboardLayoutProvider>{component}</DashboardLayoutProvider>);
};

describe("DashboardLayoutContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe("Initial State", () => {
    it("should initialize with default layout", () => {
      renderWithProvider(<TestComponent />);

      expect(screen.getByTestId("edit-mode")).toHaveTextContent("view");
      expect(screen.getByTestId("row-count")).toHaveTextContent("3");
      expect(screen.getByTestId("card-count")).toHaveTextContent("6");
    });

    it("should have correct default card structure", () => {
      renderWithProvider(<TestComponent />);

      // Check first row has summary, orders, topProducts
      const row0 = screen.getByTestId("row-0");
      expect(row0).toHaveTextContent("Summary");
      expect(row0).toHaveTextContent("Orders");
      expect(row0).toHaveTextContent("Top Products");

      // Check second row has salesOverTime, paymentsHistory
      const row1 = screen.getByTestId("row-1");
      expect(row1).toHaveTextContent("Sales Over Time");
      expect(row1).toHaveTextContent("Payments History");

      // Check third row has locationsMap
      const row2 = screen.getByTestId("row-2");
      expect(row2).toHaveTextContent("Locations Map");
    });
  });

  describe("Edit Mode Toggle", () => {
    it("should toggle edit mode state", () => {
      renderWithProvider(<TestComponent />);

      const toggleButton = screen.getByTestId("toggle-edit");
      const editModeDisplay = screen.getByTestId("edit-mode");

      expect(editModeDisplay).toHaveTextContent("view");

      fireEvent.click(toggleButton);
      expect(editModeDisplay).toHaveTextContent("edit");

      fireEvent.click(toggleButton);
      expect(editModeDisplay).toHaveTextContent("view");
    });
  });

  describe("Reset to Default", () => {
    it("should reset layout to default configuration", () => {
      renderWithProvider(<TestComponent />);

      const resetButton = screen.getByTestId("reset-default");
      const cardCountDisplay = screen.getByTestId("card-count");

      // Initially should have 6 cards
      expect(cardCountDisplay).toHaveTextContent("6");

      // Delete a card first
      fireEvent.click(screen.getByTestId("delete-card"));
      expect(cardCountDisplay).toHaveTextContent("5");

      // Reset should restore all cards
      fireEvent.click(resetButton);
      expect(cardCountDisplay).toHaveTextContent("6");

      // Verify localStorage was cleared
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "dashboard-layout"
      );
    });

    it("should maintain edit mode state when resetting", () => {
      renderWithProvider(<TestComponent />);

      const toggleButton = screen.getByTestId("toggle-edit");
      const resetButton = screen.getByTestId("reset-default");
      const editModeDisplay = screen.getByTestId("edit-mode");

      // Enable edit mode
      fireEvent.click(toggleButton);
      expect(editModeDisplay).toHaveTextContent("edit");

      // Reset should keep edit mode
      fireEvent.click(resetButton);
      expect(editModeDisplay).toHaveTextContent("edit");
    });
  });

  describe("Card Movement", () => {
    it("should move card between rows", () => {
      renderWithProvider(<TestComponent />);

      const moveButton = screen.getByTestId("move-card");

      // Initially summary card should be in row-0
      expect(screen.getByTestId("row-0")).toHaveTextContent("Summary");
      expect(screen.getByTestId("row-1")).not.toHaveTextContent("Summary");

      // Move summary card to row-1
      fireEvent.click(moveButton);

      // Summary should now be in row-1
      expect(screen.getByTestId("row-1")).toHaveTextContent("Summary");
      expect(screen.getByTestId("row-0")).not.toHaveTextContent("Summary");
    });
  });

  describe("Card Deletion", () => {
    it("should delete card from layout", () => {
      renderWithProvider(<TestComponent />);

      const deleteButton = screen.getByTestId("delete-card");
      const cardCountDisplay = screen.getByTestId("card-count");

      // Initially should have 6 cards
      expect(cardCountDisplay).toHaveTextContent("6");
      expect(screen.getByTestId("card-summary")).toBeInTheDocument();

      // Delete summary card
      fireEvent.click(deleteButton);

      // Should have 5 cards and no summary card
      expect(cardCountDisplay).toHaveTextContent("5");
      expect(screen.queryByTestId("card-summary")).not.toBeInTheDocument();
    });
  });

  describe("Card Reordering", () => {
    it("should reorder cards within the same row", () => {
      renderWithProvider(<TestComponent />);

      const reorderButton = screen.getByTestId("reorder-cards");

      // Initially: Summary, Orders, Top Products
      const row0 = screen.getByTestId("row-0");
      const cards = row0.querySelectorAll("[data-testid^='card-']");
      expect(cards[0]).toHaveTextContent("Summary");
      expect(cards[1]).toHaveTextContent("Orders");
      expect(cards[2]).toHaveTextContent("Top Products");

      // Reorder: move first card to last position
      fireEvent.click(reorderButton);

      // Should now be: Orders, Top Products, Summary
      const reorderedCards = row0.querySelectorAll("[data-testid^='card-']");
      expect(reorderedCards[0]).toHaveTextContent("Orders");
      expect(reorderedCards[1]).toHaveTextContent("Top Products");
      expect(reorderedCards[2]).toHaveTextContent("Summary");
    });
  });

  describe("LocalStorage Persistence", () => {
    it("should save layout to localStorage", () => {
      renderWithProvider(<TestComponent />);

      // Toggle edit mode and make changes
      fireEvent.click(screen.getByTestId("toggle-edit"));
      fireEvent.click(screen.getByTestId("delete-card"));

      // Should have called setItem with layout data
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it("should load layout from localStorage on mount", () => {
      const savedLayout = [
        {
          id: "row-1",
          cards: [{ id: "summary", type: "summary", title: "Summary" }],
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedLayout));

      renderWithProvider(<TestComponent />);

      // Should have loaded the saved layout
      expect(screen.getByTestId("card-count")).toHaveTextContent("1");
      expect(screen.getByTestId("card-summary")).toBeInTheDocument();
    });
  });
});
