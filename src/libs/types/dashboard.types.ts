// // src/libs/types/dashboard.types.ts

// // ── /Admin/dashboard/stats ────────────────────────────────────────────────────
// export interface DashboardStats {
//   success: boolean;
//   generatedAt: string;
//   stats: {
//     totalUsers: { value: number; changePercent: number };
//     activeSubscriptions: { value: number; changePercent: number };
//     monthlyRevenue: { value: number; currency: string; changePercent: number };
//     reportsFiled: { value: number; changePercent: number };
//   };
// }

// // ── /Admin/dashboard/charts ───────────────────────────────────────────────────
// export interface UserGrowthPoint {
//   month: string;
//   totalUsers: number;
// }

// export interface AiUsagePoint {
//   day: string;
//   queries: number;
//   answers: number;
//   queryTokens: number;
//   answerTokens: number;
//   totalTokens: number;
// }

// export interface SubscriptionTrendPoint {
//   month: string;
//   total: number;
//   plans: {
//     monthly: number;
//     yearly: number;
//   };
// }

// export interface DashboardCharts {
//   success: boolean;
//   generatedAt: string;
//   range: { months: number; from: string; to: string };
//   charts: {
//     userGrowth: UserGrowthPoint[];
//     aiUsage: AiUsagePoint[];
//     subscriptionTrends: SubscriptionTrendPoint[];
//   };
// }

// // ── Notifications (local state — /Admin/dashboard endpoint not available yet) ─
// export type NotificationType = "alert" | "info" | "success";

// export interface Notification {
//   id: string;
//   type: NotificationType;
//   title: string;
//   message: string;
//   time: string;
//   read: boolean;
// }

// src/libs/types/dashboard.types.ts

// ── /Admin/dashboard/stats ────────────────────────────────────────────────────
export interface DashboardStats {
  success: boolean;
  generatedAt: string;
  stats: {
    totalUsers: { value: number; changePercent: number };
    activeSubscriptions: { value: number; changePercent: number };
    monthlyRevenue: { value: number; currency: string; changePercent: number };
    reportsFiled: { value: number; changePercent: number };
  };
}

// ── /Admin/dashboard/charts ───────────────────────────────────────────────────
export interface UserGrowthPoint {
  month: string;
  totalUsers: number;
}

export interface AiUsagePoint {
  day: string;
  queries: number;
  answers: number;
  queryTokens: number;
  answerTokens: number;
  totalTokens: number;
}

export interface SubscriptionTrendPoint {
  month: string;
  total: number;
  plans: {
    monthly: number;
    yearly: number;
  };
}

export interface DashboardCharts {
  success: boolean;
  generatedAt: string;
  range: { months: number; from: string; to: string };
  charts: {
    userGrowth: UserGrowthPoint[];
    aiUsage: AiUsagePoint[];
    subscriptionTrends: SubscriptionTrendPoint[];
  };
}

// ── /Admin/dashboard/notifications ───────────────────────────────────────────
export type NotificationType = "High_AI_Token_Usage" | "New_Subscription_Purchased" | string;

export interface Notification {
  id: string;
  userId: string;
  title: string;
  type: NotificationType;
  body: string;
  isRead: boolean;
  content: Record<string, any> | null;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsResponse {
  unreadCount: number;
  list: {
    total: number;
    list: Notification[];
    hasMany: boolean;   
    count: number;
  };
}