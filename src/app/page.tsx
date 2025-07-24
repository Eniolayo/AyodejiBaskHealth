"use client";

import Header from "@/components/Header";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { OrdersSection } from "@/components/Dashboard/OrdersSection";
import { TopProductsSection } from "@/components/Dashboard/TopProductsSection";
import { SummarySection } from "@/components/Dashboard/SummarySection";
import { SalesOverTimeSection } from "@/components/Dashboard/SalesOverTimeSection";
import { PaymentsHistorySection } from "@/components/Dashboard/PaymentsHistorySection";

export default function Home() {
  return (
    <main className="border border-neutral-200 font-geist min-h-screen ">
      <Header />
      <section className="p-3 max-w-[1580px] mx-auto">
        <DashboardHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SummarySection />
          <OrdersSection />
          <TopProductsSection />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <SalesOverTimeSection />
          <PaymentsHistorySection />
        </div>
      </section>
    </main>
  );
}
