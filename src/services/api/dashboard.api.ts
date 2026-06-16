

import { fetch, waitForAuthState } from "@/src/libs/helpers";
import { DashboardStats, DashboardCharts, NotificationsResponse } from "@/src/libs/types/dashboard.types";

// ── Endpoint 2: GET /Admin/dashboard/stats ────────────────────────────────────
export const getDashboardStats = async (): Promise<DashboardStats> => {
  await waitForAuthState();
  return fetch<DashboardStats>({
    url: "/Admin/dashboard/stats",
    method: "GET",
  });
};

// ── Endpoint 3: GET /Admin/dashboard/charts ───────────────────────────────────
export const getDashboardCharts = async (months = 12): Promise<DashboardCharts> => {
  await waitForAuthState();
  return fetch<DashboardCharts>({
    url: `/Admin/dashboard/charts?months=${months}`,
    method: "GET",
  });
};

// ── Endpoint 4: GET /Admin/dashboard/notifications ───────────────────────────
export const getNotifications = async (skip = 0, take = 10): Promise<NotificationsResponse> => {
  await waitForAuthState();
  return fetch<NotificationsResponse>({
    url: `/Admin/dashboard/notifications?skip=${skip}&take=${take}`,
    method: "GET",
  });
};

// ── Endpoint 5: POST /Admin/dashboard/notifications/mark-all-readed ──────────
export const markAllNotificationsRead = async (): Promise<void> => {
  await waitForAuthState();
  return fetch<void>({
    url: "/Admin/dashboard/notifications/mark-all-readed",
    method: "POST",
  });
};

// ── Endpoint 6: POST /Admin/dashboard/notifications/{id}/mark-readed ─────────
export const markNotificationRead = async (id: string): Promise<void> => {
  await waitForAuthState();
  return fetch<void>({
    url: `/Admin/dashboard/notifications/${id}/mark-readed`,
    method: "POST",
  });
};

// ── Endpoint 1: GET /Admin/dashboard ─────────────────────────────────────────
// TODO: Integrate when backend provides response schema
// export const getDashboardOverview = async () => {
//   return fetch({ url: "/Admin/dashboard", method: "GET" });
// };