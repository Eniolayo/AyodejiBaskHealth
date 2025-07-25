"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface CardConfig {
  id: string;
  component: string;
  visible: boolean;
  order: number;
  gridArea?: string;
}

interface DashboardLayoutContextType {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  cards: CardConfig[];
  updateCardOrder: (cardId: string, newOrder: number) => void;
  deleteCard: (cardId: string) => void;
  resetToDefault: () => void;
  getCardConfig: (cardId: string) => CardConfig | undefined;
}

const defaultCards: CardConfig[] = [
  { id: "summary", component: "SummarySection", visible: true, order: 0 },
  { id: "orders", component: "OrdersSection", visible: true, order: 1 },
  {
    id: "topProducts",
    component: "TopProductsSection",
    visible: true,
    order: 2,
  },
  {
    id: "salesOverTime",
    component: "SalesOverTimeSection",
    visible: true,
    order: 3,
  },
  {
    id: "paymentsHistory",
    component: "PaymentsHistorySection",
    visible: true,
    order: 4,
  },
  {
    id: "locationsMap",
    component: "LocationsMapSection",
    visible: true,
    order: 5,
  },
];

const DashboardLayoutContext = createContext<
  DashboardLayoutContextType | undefined
>(undefined);

export const DashboardLayoutProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [cards, setCards] = useState<CardConfig[]>(defaultCards);

  // Load saved layout on mount
  useEffect(() => {
    const savedLayout = localStorage.getItem("dashboard-layout");
    if (savedLayout) {
      try {
        const parsedLayout = JSON.parse(savedLayout);
        setCards(parsedLayout);
      } catch (error) {
        console.error("Error parsing saved layout:", error);
      }
    }
  }, []);

  // Save layout whenever cards change
  useEffect(() => {
    localStorage.setItem("dashboard-layout", JSON.stringify(cards));
  }, [cards]);

  const updateCardOrder = (cardId: string, newOrder: number) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const cardIndex = updatedCards.findIndex((card) => card.id === cardId);

      if (cardIndex !== -1) {
        const [movedCard] = updatedCards.splice(cardIndex, 1);
        movedCard.order = newOrder;
        updatedCards.splice(newOrder, 0, movedCard);

        // Reorder all cards
        return updatedCards.map((card, index) => ({
          ...card,
          order: index,
        }));
      }

      return updatedCards;
    });
  };

  const deleteCard = (cardId: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, visible: false } : card
      )
    );
  };

  const resetToDefault = () => {
    setCards(defaultCards);
    setIsEditMode(false);
    localStorage.removeItem("dashboard-layout");
  };

  const getCardConfig = (cardId: string) => {
    return cards.find((card) => card.id === cardId);
  };

  return (
    <DashboardLayoutContext.Provider
      value={{
        isEditMode,
        setIsEditMode,
        cards,
        updateCardOrder,
        deleteCard,
        resetToDefault,
        getCardConfig,
      }}
    >
      {children}
    </DashboardLayoutContext.Provider>
  );
};

export const useDashboardLayout = () => {
  const context = useContext(DashboardLayoutContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardLayout must be used within a DashboardLayoutProvider"
    );
  }
  return context;
};
