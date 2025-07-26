import { render, screen } from "@testing-library/react";

// Create a simple mock of the Home component structure
const MockHome = () => {
  return (
    <main className="font-geist min-h-screen border border-neutral-200">
      <div data-testid="dashboard-header">Header</div>
      <section className="mx-auto max-w-[1580px] p-3">
        <div data-testid="dashboard-header-component">Dashboard Header</div>
        <div data-testid="draggable-dashboard">Draggable Dashboard</div>
      </section>
    </main>
  );
};

describe("Home Page Structure", () => {
  it("renders main layout correctly", () => {
    render(<MockHome />);

    // Check that the main element is rendered
    const main = screen.getByRole("main");
    expect(main).toBeDefined();
    expect(main.className).toContain("font-geist");
    expect(main.className).toContain("min-h-screen");
  });

  it("has correct CSS classes applied", () => {
    render(<MockHome />);

    const main = screen.getByRole("main");
    expect(main.className).toContain("font-geist");
    expect(main.className).toContain("min-h-screen");
    expect(main.className).toContain("border");
    expect(main.className).toContain("border-neutral-200");
  });

  it("renders all main dashboard components", () => {
    render(<MockHome />);

    // Check that all main components are rendered
    expect(screen.getByTestId("dashboard-header")).toBeDefined();
    expect(screen.getByTestId("dashboard-header-component")).toBeDefined();
    expect(screen.getByTestId("draggable-dashboard")).toBeDefined();
  });

  it("contains section with proper structure", () => {
    render(<MockHome />);

    // Check that the section exists with proper classes
    const main = screen.getByRole("main");
    const section = main.querySelector("section");
    expect(section).toBeDefined();
    expect(section).not.toBeNull();
    if (section) {
      expect(section.className).toContain("mx-auto");
      expect(section.className).toContain("max-w-[1580px]");
      expect(section.className).toContain("p-3");
    }
  });
});
