import Header from "@/app/_components/Dashboard/Header";
import { DashboardHeader } from "@/app/_components/Dashboard/DashboardHeader";
import { OrdersSection } from "@/app/_components/Dashboard/OrdersSection";
import { TopProductsSection } from "@/app/_components/Dashboard/TopProductsSection";
import { SummarySection } from "@/app/_components/Dashboard/SummarySection";
import { SalesOverTimeSection } from "@/app/_components/Dashboard/SalesOverTimeSection";
import { PaymentsHistorySection } from "@/app/_components/Dashboard/PaymentsHistorySection";
import { LocationsMapSection } from "@/app/_components/Dashboard/LocationsMapSection";

export default function Home() {
  return (
    <main className="font-geist min-h-screen border border-neutral-200">
      <Header />
      <section className="mx-auto max-w-[1580px] p-3">
        <DashboardHeader />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <SummarySection />
          <OrdersSection />
          <TopProductsSection />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SalesOverTimeSection />
          <PaymentsHistorySection />
        </div>
        <div className="mt-6">
          <LocationsMapSection />
        </div>
      </section>
    </main>
  );
}
