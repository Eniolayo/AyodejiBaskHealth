import {
  ThemeSwitcher,
  CompactThemeSwitcher,
} from "@/components/theme-switcher";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with theme switcher */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-card-foreground">
            Health Dashboard
          </h1>
          <CompactThemeSwitcher />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Theme Demo Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-card-foreground">
              Theme Switcher Demo
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Try switching between different themes to see the color scheme
                changes.
              </p>
              <ThemeSwitcher />
            </div>
          </div>

          {/* Primary Colors Demo */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-card-foreground">
              Primary Colors
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-6 w-6 rounded-full bg-primary"></div>
                <span className="text-sm">Primary</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-6 w-6 rounded-full bg-secondary"></div>
                <span className="text-sm">Secondary</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-6 w-6 rounded-full bg-accent"></div>
                <span className="text-sm">Accent</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-6 w-6 rounded-full bg-muted"></div>
                <span className="text-sm">Muted</span>
              </div>
            </div>
          </div>

          {/* Interactive Elements Demo */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-card-foreground">
              Interactive Elements
            </h3>
            <div className="space-y-3">
              <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Primary Button
              </button>
              <button className="w-full rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80">
                Secondary Button
              </button>
              <input
                type="text"
                placeholder="Input field"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>

          {/* Chart Colors Demo */}
          <div className="rounded-lg border bg-card p-6 shadow-sm md:col-span-2 lg:col-span-3">
            <h3 className="mb-4 text-lg font-semibold text-card-foreground">
              Chart Color Palette
            </h3>
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div
                    className={`h-8 w-8 rounded`}
                    style={{ backgroundColor: `var(--chart-${i})` }}
                  ></div>
                  <span className="text-sm">Chart {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
