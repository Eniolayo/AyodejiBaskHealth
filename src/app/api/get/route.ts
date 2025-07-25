// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     const res = await fetch("https://dashboard-api-dusky.vercel.app/api/get", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: req.headers.get("Authorization") || "",
//       },
//       cache: "no-store",
//     });

//     const data = await res.json();
//     return NextResponse.json(data, { status: res.status });
//   } catch (error: unknown) {
//     return NextResponse.json(
//       { success: false, error: (error as Error).message || "Unknown error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";

const dashboardResponse = {
  success: true,
  data: {
    dashboardData: {
      charts: {
        salesOverTime: {
          labels: [
            "2025-07-23",
            "2025-07-22",
            "2025-07-21",
            "2025-07-20",
            "2025-07-19",
            "2025-07-18",
            "2025-07-17",
            "2025-07-16",
            "2025-07-15",
            "2025-07-14",
            "2025-07-13",
            "2025-07-12",
            "2025-07-11",
            "2025-07-10",
            "2025-07-09",
            "2025-07-08",
            "2025-07-07",
            "2025-07-06",
            "2025-07-05",
            "2025-07-04",
            "2025-07-03",
            "2025-07-02",
            "2025-07-01",
            "2025-06-30",
            "2025-06-29",
            "2025-06-28",
            "2025-06-27",
            "2025-06-26",
            "2025-06-25",
            "2025-06-24",
          ],
          data: [
            122, 168, 133, 138, 56, 199, 128, 158, 143, 136, 140, 153, 182, 179,
            155, 170, 149, 182, 98, 190, 154, 162, 155, 74, 87, 78, 181, 109,
            138, 196,
          ],
        },
        userEngagement: {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          data: [522, 494, 570, 574],
        },
      },
      tables: {
        recentTransactions: [
          {
            id: 1,
            user: "John Doe",
            amount: "$192",
            date: "2023-09-28",
          },
          {
            id: 2,
            user: "Jane Smith",
            amount: "$76",
            date: "2023-09-27",
          },
          {
            id: 3,
            user: "Alice Johnson",
            amount: "$102",
            date: "2023-09-26",
          },
          {
            id: 4,
            user: "Bob Williams",
            amount: "$126",
            date: "2023-09-25",
          },
          {
            id: 5,
            user: "Charlie Brown",
            amount: "$126",
            date: "2023-09-24",
          },
          {
            id: 6,
            user: "David Jones",
            amount: "$171",
            date: "2023-09-23",
          },
          {
            id: 7,
            user: "Eva Green",
            amount: "$134",
            date: "2023-09-26",
          },
          {
            id: 8,
            user: "Dwitik Ghosh",
            amount: "$75",
            date: "2023-09-26",
          },
          {
            id: 9,
            user: "Michael Jackson",
            amount: "$94",
            date: "2023-09-26",
          },
          {
            id: 10,
            user: "Lucy Liu",
            amount: "$183",
            date: "2023-09-26",
          },
        ],
        topProducts: [
          {
            id: "A1",
            name: "Product A",
            sales: 1097,
          },
          {
            id: "B2",
            name: "Product B",
            sales: 812,
          },
          {
            id: "C3",
            name: "Product C",
            sales: 846,
          },
          {
            id: "D4",
            name: "Product D",
            sales: 1159,
          },
          {
            id: "E5",
            name: "Product E",
            sales: 1008,
          },
          {
            id: "F6",
            name: "Product F",
            sales: 812,
          },
          {
            id: "G7",
            name: "Product G",
            sales: 1041,
          },
          {
            id: "R2",
            name: "Product R",
            sales: 1140,
          },
          {
            id: "M2",
            name: "Product M2",
            sales: 845,
          },
          {
            id: "Q32",
            name: "Product Q32",
            sales: 1117,
          },
        ],
      },
      map: {
        locations: [
          {
            latitude: 40.7128,
            longitude: -74.006,
            label: "New York",
            activity: 555,
          },
          {
            latitude: 34.0522,
            longitude: -118.2437,
            label: "Los Angeles",
            activity: 424,
          },
          {
            latitude: 41.8781,
            longitude: -87.6298,
            label: "Chicago",
            activity: 519,
          },
          {
            latitude: 29.7604,
            longitude: -95.3698,
            label: "Houston",
            activity: 440,
          },
          {
            latitude: 33.4484,
            longitude: -112.074,
            label: "Phoenix",
            activity: 420,
          },
          {
            latitude: 37.7749,
            longitude: -122.4194,
            label: "San Francisco",
            activity: 563,
          },
          {
            latitude: 47.6062,
            longitude: -122.3321,
            label: "Seattle",
            activity: 462,
          },
          {
            latitude: 39.9526,
            longitude: -75.1652,
            label: "Philadelphia",
            activity: 489,
          },
          {
            latitude: 38.9072,
            longitude: -77.0369,
            label: "Washington D.C.",
            activity: 433,
          },
          {
            latitude: 25.7617,
            longitude: -80.1918,
            label: "Miami",
            activity: 451,
          },
        ],
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(dashboardResponse);
}

export async function POST() {
  return NextResponse.json(dashboardResponse);
}

export async function PUT() {
  return NextResponse.json(dashboardResponse);
}

export async function DELETE() {
  return NextResponse.json(dashboardResponse);
}
