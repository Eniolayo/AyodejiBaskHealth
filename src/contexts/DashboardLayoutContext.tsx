"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define card types based on the dashboard components
export type CardType =
  | "summary"
  | "orders"
  | "topProducts"
  | "salesOverTime"
  | "paymentsHistory"
  | "locationsMap";

export interface DashboardCard {
  id: string;
  type: CardType;
  title: string;
}

export interface DashboardRow {
  id: string;
  cards: DashboardCard[];
}

export interface LayoutState {
  isEditMode: boolean;
  rows: DashboardRow[];
}

// Default layout structure - 3 rows as specified in requirements
const DEFAULT_LAYOUT: DashboardRow[] = [
  {
    id: "row-1",
    cards: [
      { id: "summary", type: "summary", title: "Summary" },
      { id: "orders", type: "orders", title: "Orders" },
      { id: "topProducts", type: "topProducts", title: "Top Products" },
    ],
  },
  {
    id: "row-2",
    cards: [
      { id: "salesOverTime", type: "salesOverTime", title: "Sales Over Time" },
      {
        id: "paymentsHistory",
        type: "paymentsHistory",
        title: "Payments History",
      },
    ],
  },
  {
    id: "row-3",
    cards: [
      { id: "locationsMap", type: "locationsMap", title: "Locations Map" },
    ],
  },
];

type LayoutAction =
  | { type: "TOGGLE_EDIT_MODE" }
  | { type: "RESET_TO_DEFAULT" }
  | {
      type: "MOVE_CARD";
      payload: {
        cardId: string;
        fromRowId: string;
        toRowId: string;
        toIndex: number;
      };
    }
  | { type: "DELETE_CARD"; payload: { cardId: string; rowId: string } }
  | {
      type: "REORDER_CARDS_IN_ROW";
      payload: { rowId: string; fromIndex: number; toIndex: number };
    }
  | { type: "LOAD_LAYOUT"; payload: DashboardRow[] };

const STORAGE_KEY = "dashboard-layout";

function layoutReducer(state: LayoutState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case "TOGGLE_EDIT_MODE":
      return {
        ...state,
        isEditMode: !state.isEditMode,
      };

    case "RESET_TO_DEFAULT":
      const newState = {
        isEditMode: state.isEditMode,
        rows: DEFAULT_LAYOUT,
      };
      // Clear localStorage when resetting
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
      return newState;

    case "MOVE_CARD": {
      const { cardId, fromRowId, toRowId, toIndex } = action.payload;

      // Find the card to move
      const fromRow = state.rows.find((row) => row.id === fromRowId);
      const cardToMove = fromRow?.cards.find((card) => card.id === cardId);

      if (!cardToMove || !fromRow) return state;

      const newRows = state.rows.map((row) => {
        if (row.id === fromRowId) {
          // Remove card from source row
          return {
            ...row,
            cards: row.cards.filter((card) => card.id !== cardId),
          };
        }
        if (row.id === toRowId) {
          // Add card to destination row at specified index
          const newCards = [...row.cards];
          newCards.splice(toIndex, 0, cardToMove);
          return {
            ...row,
            cards: newCards,
          };
        }
        return row;
      });

      return {
        ...state,
        rows: newRows,
      };
    }

    case "DELETE_CARD": {
      const { cardId, rowId } = action.payload;
      const newRows = state.rows.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            cards: row.cards.filter((card) => card.id !== cardId),
          };
        }
        return row;
      });

      return {
        ...state,
        rows: newRows,
      };
    }

    case "REORDER_CARDS_IN_ROW": {
      const { rowId, fromIndex, toIndex } = action.payload;
      const newRows = state.rows.map((row) => {
        if (row.id === rowId) {
          const newCards = [...row.cards];
          const [movedCard] = newCards.splice(fromIndex, 1);
          newCards.splice(toIndex, 0, movedCard);
          return {
            ...row,
            cards: newCards,
          };
        }
        return row;
      });

      return {
        ...state,
        rows: newRows,
      };
    }

    case "LOAD_LAYOUT":
      return {
        ...state,
        rows: action.payload,
      };

    default:
      return state;
  }
}

interface DashboardLayoutContextType {
  state: LayoutState;
  toggleEditMode: () => void;
  resetToDefault: () => void;
  moveCard: (
    cardId: string,
    fromRowId: string,
    toRowId: string,
    toIndex: number
  ) => void;
  deleteCard: (cardId: string, rowId: string) => void;
  reorderCardsInRow: (
    rowId: string,
    fromIndex: number,
    toIndex: number
  ) => void;
}

const DashboardLayoutContext = createContext<
  DashboardLayoutContextType | undefined
>(undefined);

export function DashboardLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(layoutReducer, {
    isEditMode: false,
    rows: DEFAULT_LAYOUT,
  });

  // Load layout from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const layout = JSON.parse(stored);
          dispatch({ type: "LOAD_LAYOUT", payload: layout });
        } catch {
          // Failed to parse stored layout, use default
        }
      }
    }
  }, []);

  // Save layout to localStorage whenever rows change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.rows));
    }
  }, [state.rows]);

  const toggleEditMode = () => {
    dispatch({ type: "TOGGLE_EDIT_MODE" });
  };

  const resetToDefault = () => {
    dispatch({ type: "RESET_TO_DEFAULT" });
  };

  const moveCard = (
    cardId: string,
    fromRowId: string,
    toRowId: string,
    toIndex: number
  ) => {
    dispatch({
      type: "MOVE_CARD",
      payload: { cardId, fromRowId, toRowId, toIndex },
    });
  };

  const deleteCard = (cardId: string, rowId: string) => {
    dispatch({
      type: "DELETE_CARD",
      payload: { cardId, rowId },
    });
  };

  const reorderCardsInRow = (
    rowId: string,
    fromIndex: number,
    toIndex: number
  ) => {
    dispatch({
      type: "REORDER_CARDS_IN_ROW",
      payload: { rowId, fromIndex, toIndex },
    });
  };

  const value: DashboardLayoutContextType = {
    state,
    toggleEditMode,
    resetToDefault,
    moveCard,
    deleteCard,
    reorderCardsInRow,
  };

  return (
    <DashboardLayoutContext.Provider value={value}>
      {children}
    </DashboardLayoutContext.Provider>
  );
}

export function useDashboardLayout() {
  const context = useContext(DashboardLayoutContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardLayout must be used within a DashboardLayoutProvider"
    );
  }
  return context;
}
