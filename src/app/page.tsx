"use client";
import { useEffect, useRef } from "react";
import { Sortable } from "@shopify/draggable";
import Header from "@/app/_components/Dashboard/Header";
import { DashboardHeader } from "@/app/_components/Dashboard/DashboardHeader";
import { OrdersSection } from "@/app/_components/Dashboard/OrdersSection";
import { TopProductsSection } from "@/app/_components/Dashboard/TopProductsSection";
import { SummarySection } from "@/app/_components/Dashboard/SummarySection";
import { SalesOverTimeSection } from "@/app/_components/Dashboard/SalesOverTimeSection";
import { PaymentsHistorySection } from "@/app/_components/Dashboard/PaymentsHistorySection";
import { LocationsMapSection } from "@/app/_components/Dashboard/LocationsMapSection";
import { useDashboardLayout } from "@/contexts/DashboardLayoutContext";

export default function Home() {
  const { isEditMode } = useDashboardLayout();
  const containerRef = useRef<HTMLDivElement>(null);
  const sortableRef = useRef<Sortable | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (isEditMode) {
      // Initialize Shopify Draggable
      sortableRef.current = new Sortable(containerRef.current, {
        draggable: '[data-draggable="true"]',
        handle: '[data-draggable="true"], .drag-handle',
        mirror: {
          appendTo: "body",
          constrainDimensions: true,
        },
        delay: 100,
      });

      // Handle drag events
      sortableRef.current.on("sortable:stop", (evt) => {
        console.log("Card moved:", evt);
      });
    } else if (sortableRef.current) {
      // Destroy draggable when not in edit mode
      sortableRef.current.destroy();
      sortableRef.current = null;
    }

    return () => {
      if (sortableRef.current) {
        sortableRef.current.destroy();
        sortableRef.current = null;
      }
    };
  }, [isEditMode]);

  return (
    <main className="font-geist min-h-screen border border-neutral-200">
      <Header />
      <section className="mx-auto max-w-[1580px] p-3">
        <DashboardHeader />

        <div ref={containerRef}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div data-draggable={isEditMode} data-card-id="summary">
              <SummarySection />
            </div>
            <div data-draggable={isEditMode} data-card-id="orders">
              <OrdersSection />
            </div>
            <div data-draggable={isEditMode} data-card-id="topProducts">
              <TopProductsSection />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div data-draggable={isEditMode} data-card-id="salesOverTime">
              <SalesOverTimeSection />
            </div>
            <div data-draggable={isEditMode} data-card-id="paymentsHistory">
              <PaymentsHistorySection />
            </div>
          </div>
          <div className="mt-6">
            <div data-draggable={isEditMode} data-card-id="locationsMap">
              <LocationsMapSection />
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .dragging {
          cursor: grabbing !important;
        }

        .draggable-mirror {
          opacity: 0.8;
          transform: rotate(5deg);
          z-index: 1000;
        }

        .draggable-source--is-dragging {
          opacity: 0.3;
        }

        .sortable-placeholder {
          background: #e5e7eb;
          border: 2px dashed #9ca3af;
          opacity: 0.5;
        }
      `}</style>
    </main>
  );
}
