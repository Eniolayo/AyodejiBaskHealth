import Header from "@/app/_components/Dashboard/Header";
import { DashboardHeader } from "@/app/_components/Dashboard/DashboardHeader";
import { DraggableDashboard } from "@/app/_components/Dashboard/DraggableDashboard";
import { DashboardLayoutProvider } from "@/contexts/DashboardLayoutContext";

export default function Home() {
  return (
    <main className="font-geist min-h-screen border border-neutral-200">
      <DashboardLayoutProvider>
        <Header />
        <section className="mx-auto max-w-[1580px] p-3">
          <DashboardHeader />
          <DraggableDashboard />
        </section>
      </DashboardLayoutProvider>
    </main>
  );
}
