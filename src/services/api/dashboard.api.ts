// // src/services/api/dashboard.api.ts
// // ─────────────────────────────────────────────────────────────────────────────
// // Dashboard API Service
// // Currently returns static mock data.
// // To integrate with a real backend, replace each function body with an
// // actual fetch/axios call to your API endpoint.
// // ─────────────────────────────────────────────────────────────────────────────

// import { DashboardSummary, UserGrowthPoint, AiUsagePoint, SubscriptionTrendPoint, Notification } from '@/src/libs/types/dashboard.types';

// // ── Mock Data ─────────────────────────────────────────────────────────────────

// const MOCK_SUMMARY: DashboardSummary = {
//   totalUsers: 12480,
//   activeSubscriptions: 4320,
//   monthlyRevenue: 38540,
//   reportsCount: 186,
//   totalUsersChange: 8.2,
//   activeSubscriptionsChange: 5.1,
//   monthlyRevenueChange: 12.4,
//   reportsCountChange: -3.7,
// };

// const MOCK_USER_GROWTH: UserGrowthPoint[] = [
//   { month: "Jan", users: 7200 },
//   { month: "Feb", users: 8100 },
//   { month: "Mar", users: 8700 },
//   { month: "Apr", users: 9400 },
//   { month: "May", users: 10200 },
//   { month: "Jun", users: 10800 },
//   { month: "Jul", users: 11300 },
//   { month: "Aug", users: 11900 },
//   { month: "Sep", users: 12100 },
//   { month: "Oct", users: 12480 },
// ];

// const MOCK_AI_USAGE: AiUsagePoint[] = [
//   { day: "Mon", queries: 3200, sessions: 1100 },
//   { day: "Tue", queries: 4100, sessions: 1400 },
//   { day: "Wed", queries: 3800, sessions: 1250 },
//   { day: "Thu", queries: 5200, sessions: 1800 },
//   { day: "Fri", queries: 4700, sessions: 1600 },
//   { day: "Sat", queries: 2900, sessions: 980 },
//   { day: "Sun", queries: 2400, sessions: 820 },
// ];

// const MOCK_SUBSCRIPTION_TRENDS: SubscriptionTrendPoint[] = [
//   { month: "Jan", basic: 1800, pro: 900, enterprise: 210 },
//   { month: "Feb", basic: 2000, pro: 980, enterprise: 240 },
//   { month: "Mar", basic: 2100, pro: 1050, enterprise: 270 },
//   { month: "Apr", basic: 2200, pro: 1100, enterprise: 300 },
//   { month: "May", basic: 2350, pro: 1200, enterprise: 330 },
//   { month: "Jun", basic: 2500, pro: 1300, enterprise: 360 },
//   { month: "Jul", basic: 2650, pro: 1380, enterprise: 390 },
//   { month: "Aug", basic: 2800, pro: 1450, enterprise: 410 },
//   { month: "Sep", basic: 2950, pro: 1510, enterprise: 430 },
//   { month: "Oct", basic: 3100, pro: 1580, enterprise: 450 },
// ];

// const MOCK_NOTIFICATIONS: Notification[] = [
//   {
//     id: "1",
//     type: "alert",
//     title: "Server Load High",
//     message: "API server CPU usage exceeded 85% threshold.",
//     time: "2 min ago",
//     read: false,
//   },
//   {
//     id: "2",
//     type: "info",
//     title: "New Subscription Plan Request",
//     message: "Enterprise client requested custom plan configuration.",
//     time: "18 min ago",
//     read: false,
//   },
//   {
//     id: "3",
//     type: "success",
//     title: "Backup Completed",
//     message: "Weekly database backup completed successfully.",
//     time: "1 hr ago",
//     read: true,
//   },
//   {
//     id: "4",
//     type: "alert",
//     title: "Unusual Login Activity",
//     message: "Multiple failed login attempts from IP 192.168.12.45.",
//     time: "3 hr ago",
//     read: true,
//   },
//   {
//     id: "5",
//     type: "info",
//     title: "Content Report Submitted",
//     message: "A user reported inappropriate content in the library.",
//     time: "5 hr ago",
//     read: true,
//   },
// ];

// // ── Service Functions ─────────────────────────────────────────────────────────
// // Each function is async and returns typed data.
// // Replace the mock return with a real API call when backend is ready.
// // Example:
// //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/summary`);
// //   return res.json();

// export const getDashboardSummary = async (): Promise<DashboardSummary> => {
//   // TODO: replace with → fetch(`${API_BASE}/admin/dashboard/summary`)
//   return MOCK_SUMMARY;
// };

// export const getUserGrowthData = async (): Promise<UserGrowthPoint[]> => {
//   // TODO: replace with → fetch(`${API_BASE}/admin/analytics/user-growth`)
//   return MOCK_USER_GROWTH;
// };

// export const getAiUsageData = async (): Promise<AiUsagePoint[]> => {
//   // TODO: replace with → fetch(`${API_BASE}/admin/analytics/ai-usage`)
//   return MOCK_AI_USAGE;
// };

// export const getSubscriptionTrends = async (): Promise<SubscriptionTrendPoint[]> => {
//   // TODO: replace with → fetch(`${API_BASE}/admin/analytics/subscription-trends`)
//   return MOCK_SUBSCRIPTION_TRENDS;
// };

// export const getNotifications = async (): Promise<Notification[]> => {
//   // TODO: replace with → fetch(`${API_BASE}/admin/notifications`)
//   return MOCK_NOTIFICATIONS;
// };

// export const markNotificationsRead = async (): Promise<void> => {
//   // TODO: replace with → fetch(`${API_BASE}/admin/notifications/mark-read`, { method: 'PATCH' })
//   return;
// };

// src/services/api/dashboard.api.ts
// ─────────────────────────────────────────────────────────────────────────────
// Dashboard API Service — mapped to real backend endpoints
// Endpoint 1: GET  /Admin/dashboard                          → TODO
// Endpoint 2: GET  /Admin/dashboard/stats                    → getDashboardStats()
// Endpoint 3: GET  /Admin/dashboard/charts                   → getDashboardCharts()
// Endpoint 4: GET  /Admin/dashboard/notifications            → getNotifications()
// Endpoint 5: POST /Admin/dashboard/notifications/mark-all-readed  → markAllNotificationsRead()
// Endpoint 6: POST /Admin/dashboard/notifications/{id}/mark-readed → markNotificationRead(id)
// ─────────────────────────────────────────────────────────────────────────────

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
export const getDashboardCharts = async (): Promise<DashboardCharts> => {
  await waitForAuthState();
  return fetch<DashboardCharts>({
    url: "/Admin/dashboard/charts",
    method: "GET",
  });
};

// ── Endpoint 4: GET /Admin/dashboard/notifications ───────────────────────────
export const getNotifications = async (): Promise<NotificationsResponse> => {
  await waitForAuthState();
  return fetch<NotificationsResponse>({
    url: "/Admin/dashboard/notifications",
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