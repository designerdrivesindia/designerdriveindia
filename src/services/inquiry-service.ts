import { apiFetch, ApiError } from "./api-client";
import type { InquiryPayload } from "@/types";

export interface InquiryResponse {
  id: string;
  createdAt: string;
}

/**
 * Submit a travel inquiry to the backend.
 *
 * Falls back to a simulated success in development when the backend isn't
 * running yet, so the lead-gen forms remain demonstrable on the public site.
 */
export async function submitInquiry(
  payload: InquiryPayload,
): Promise<InquiryResponse> {
  try {
    return await apiFetch<InquiryResponse>("/inquiries", {
      method: "POST",
      body: payload,
    });
  } catch (err) {
    const offline =
      err instanceof TypeError || // network failure (backend down)
      (err instanceof ApiError && err.status >= 500);
    if (offline && process.env.NODE_ENV !== "production") {
      console.warn(
        "[inquiry] backend unavailable — simulating success in dev.",
      );
      return { id: `local-${Date.now()}`, createdAt: new Date().toISOString() };
    }
    throw err;
  }
}
