import { z } from "zod";
import {
  DashboardApiResponse,
  DashboardApiResponseSchema,
} from "@/types/dashboard";

const API_ENDPOINT = "/api/get";
// const API_ENDPOINT = "https://dashboard-api-dusky.vercel.app/api/get";

export class DashboardApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response,
    public cause?: unknown
  ) {
    super(message);
    this.name = "DashboardApiError";
  }
}

export async function fetchDashboardData(): Promise<DashboardApiResponse> {
  try {
    const response = await fetch(API_ENDPOINT, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      },
      // Add cache busting to ensure fresh data
      cache: "no-store",
    });

    if (!response.ok) {
      throw new DashboardApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        response
      );
    }

    const rawData: unknown = await response.json();

    // Validate the response using Zod schema
    const parseResult = DashboardApiResponseSchema.safeParse(rawData);

    if (!parseResult.success) {
      throw new DashboardApiError(
        `Invalid API response format: ${parseResult.error.message}`,
        undefined,
        response,
        parseResult.error
      );
    }

    const validatedData = parseResult.data;

    if (!validatedData.success) {
      throw new DashboardApiError(
        "API returned success: false",
        undefined,
        response
      );
    }

    return validatedData;
  } catch (error) {
    // Re-throw our custom errors
    if (error instanceof DashboardApiError) {
      throw error;
    }

    // Handle Zod validation errors specifically
    if (error instanceof z.ZodError) {
      throw new DashboardApiError(
        `Data validation failed: ${error.message}`,
        undefined,
        undefined,
        error
      );
    }

    // Handle network errors, JSON parsing errors, etc.
    throw new DashboardApiError(
      `Network or parsing error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      undefined,
      undefined,
      error
    );
  }
}
