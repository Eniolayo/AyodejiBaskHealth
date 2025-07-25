"use client";

import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  useDashboardLayout,
  CardType,
} from "@/contexts/DashboardLayoutContext";

import { SummarySection } from "@/app/_components/Dashboard/SummarySection";
import { OrdersSection } from "@/app/_components/Dashboard/OrdersSection";
import { TopProductsSection } from "@/app/_components/Dashboard/TopProductsSection";
import { SalesOverTimeSection } from "@/app/_components/Dashboard/SalesOverTimeSection";
import { PaymentsHistorySection } from "@/app/_components/Dashboard/PaymentsHistorySection";
import { LocationsMapSection } from "@/app/_components/Dashboard/LocationsMapSection";

interface DraggableCardWrapperProps {
  cardId: string;
  rowId: string;
  type: CardType;
}

function DraggableCardWrapper({
  cardId,
  rowId,
  type,
}: DraggableCardWrapperProps) {
  const commonProps = { cardId, rowId };

  switch (type) {
    case "summary":
      return <SummarySection {...commonProps} />;
    case "orders":
      return <OrdersSection {...commonProps} />;
    case "topProducts":
      return <TopProductsSection {...commonProps} />;
    case "salesOverTime":
      return <SalesOverTimeSection {...commonProps} />;
    case "paymentsHistory":
      return <PaymentsHistorySection {...commonProps} />;
    case "locationsMap":
      return <LocationsMapSection {...commonProps} />;
    default:
      return null;
  }
}

interface DashboardRowProps {
  rowId: string;
  cards: Array<{ id: string; type: CardType; title: string }>;
}

function DashboardRow({ rowId, cards }: DashboardRowProps) {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <SortableContext
      items={cards.map((card) => card.id)}
      strategy={verticalListSortingStrategy}
    >
      <div
        className={`grid gap-6 ${
          cards.length === 3
            ? "grid-cols-1 lg:grid-cols-3"
            : cards.length === 2
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1"
        }`}
      >
        {cards.map((card) => (
          <DraggableCardWrapper
            key={card.id}
            cardId={card.id}
            rowId={rowId}
            type={card.type}
          />
        ))}
      </div>
    </SortableContext>
  );
}

export function DraggableDashboard() {
  const { state, moveCard, reorderCardsInRow } = useDashboardLayout();

  if (!state || !state.rows || state.rows.length === 0) {
    return <div>Loading dashboard...</div>;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    // Find which row the dragged item belongs to
    const fromRow = state.rows.find((row) =>
      row.cards.some((card) => card.id === active.id)
    );

    if (!fromRow) return;

    // Check if we're dropping over a row container or another card
    const isDroppingOnCard = state.rows.some((row) =>
      row.cards.some((card) => card.id === over.id)
    );

    if (isDroppingOnCard) {
      // Dropping on another card - find target row and position
      const targetRow = state.rows.find((row) =>
        row.cards.some((card) => card.id === over.id)
      );

      if (!targetRow) return;

      const targetIndex = targetRow.cards.findIndex(
        (card) => card.id === over.id
      );

      if (fromRow.id === targetRow.id) {
        // Reordering within the same row
        const fromIndex = fromRow.cards.findIndex(
          (card) => card.id === active.id
        );
        reorderCardsInRow(fromRow.id, fromIndex, targetIndex);
      } else {
        // Moving between rows
        moveCard(active.id as string, fromRow.id, targetRow.id, targetIndex);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="space-y-6">
        {state.rows.map((row) => (
          <DashboardRow key={row.id} rowId={row.id} cards={row.cards} />
        ))}
      </div>
    </DndContext>
  );
}
