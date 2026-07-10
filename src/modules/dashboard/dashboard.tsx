// "use client";
// import React, { useState } from "react";
// import { Poppins } from "next/font/google";
// import {
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from "recharts";
// import { Badge } from "antd";
// import {
//   FiUsers,
//   FiBell,
//   FiTrendingUp,
//   FiDollarSign,
//   FiAlertCircle,
//   FiInfo,
//   FiCheckCircle,
//   FiMoreHorizontal,
//   FiArrowUpRight,
//   FiArrowDownRight,
//   FiCpu,
//   FiActivity,
// } from "react-icons/fi";

// const poppins = Poppins({
//   weight: ["300", "400", "500", "600", "700"],
//   subsets: ["latin"],
// });

// // ─── Static Data (replace with API calls in future) ──────────────────────────

// const summaryCards = [
//   {
//     key: "totalUsers",
//     label: "Total Users",
//     value: "12,480",
//     change: "+8.2%",
//     positive: true,
//     icon: FiUsers,
//     color: "#0F3057",
//     bg: "#0F30570D",
//   },
//   {
//     key: "activeSubscriptions",
//     label: "Active Subscriptions",
//     value: "4,320",
//     change: "+5.1%",
//     positive: true,
//     icon: FiActivity,
//     color: "#10B981",
//     bg: "#10B9810D",
//   },
//   {
//     key: "revenue",
//     label: "Monthly Revenue",
//     value: "$38,540",
//     change: "+12.4%",
//     positive: true,
//     icon: FiDollarSign,
//     color: "#F59E0B",
//     bg: "#F59E0B0D",
//   },
//   {
//     key: "reports",
//     label: "Reports Filed",
//     value: "186",
//     change: "-3.7%",
//     positive: false,
//     icon: FiTrendingUp,
//     color: "#EF4444",
//     bg: "#EF44440D",
//   },
// ];

// const userGrowthData = [
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

// const aiUsageData = [
//   { day: "Mon", queries: 3200, sessions: 1100 },
//   { day: "Tue", queries: 4100, sessions: 1400 },
//   { day: "Wed", queries: 3800, sessions: 1250 },
//   { day: "Thu", queries: 5200, sessions: 1800 },
//   { day: "Fri", queries: 4700, sessions: 1600 },
//   { day: "Sat", queries: 2900, sessions: 980 },
//   { day: "Sun", queries: 2400, sessions: 820 },
// ];

// const subscriptionTrendsData = [
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

// const notifications = [
//   {
//     id: 1,
//     type: "alert",
//     title: "Server Load High",
//     message: "API server CPU usage exceeded 85% threshold.",
//     time: "2 min ago",
//     read: false,
//   },
//   {
//     id: 2,
//     type: "info",
//     title: "New Subscription Plan Request",
//     message: "Enterprise client requested custom plan configuration.",
//     time: "18 min ago",
//     read: false,
//   },
//   {
//     id: 3,
//     type: "success",
//     title: "Backup Completed",
//     message: "Weekly database backup completed successfully.",
//     time: "1 hr ago",
//     read: true,
//   },
//   {
//     id: 4,
//     type: "alert",
//     title: "Unusual Login Activity",
//     message: "Multiple failed login attempts from IP 192.168.12.45.",
//     time: "3 hr ago",
//     read: true,
//   },
//   {
//     id: 5,
//     type: "info",
//     title: "Content Report Submitted",
//     message: "A user reported inappropriate content in the library.",
//     time: "5 hr ago",
//     read: true,
//   },
// ];

// // ─── Sub-components ───────────────────────────────────────────────────────────

// const SummaryCard = ({ card }: { card: (typeof summaryCards)[0] }) => {
//   const Icon = card.icon;
//   return (
//     <div
//       className="bg-white rounded-2xl p-5 flex flex-col gap-3 border border-gray-100"
//       style={{ boxShadow: "0px 2px 12px 0px #0000000A" }}
//     >
//       <div className="flex items-center justify-between">
//         <div
//           className="w-10 h-10 rounded-xl flex items-center justify-center"
//           style={{ background: card.bg }}
//         >
//           <Icon style={{ color: card.color }} className="text-lg" />
//         </div>
//         <span
//           className={`text-xs font-semibold flex items-center gap-1 px-2 py-1 rounded-full ${
//             card.positive
//               ? "text-emerald-600 bg-emerald-50"
//               : "text-red-500 bg-red-50"
//           }`}
//         >
//           {card.positive ? (
//             <FiArrowUpRight className="text-sm" />
//           ) : (
//             <FiArrowDownRight className="text-sm" />
//           )}
//           {card.change}
//         </span>
//       </div>
//       <div>
//         <p className="text-2xl font-bold text-[#0F3057]">{card.value}</p>
//         <p className="text-xs text-[#555555] mt-0.5">{card.label}</p>
//       </div>
//     </div>
//   );
// };

// const ChartCard = ({
//   title,
//   subtitle,
//   children,
// }: {
//   title: string;
//   subtitle?: string;
//   children: React.ReactNode;
// }) => (
//   <div
//     className="bg-white rounded-2xl p-5 border border-gray-100"
//     style={{ boxShadow: "0px 2px 12px 0px #0000000A" }}
//   >
//     <div className="flex items-center justify-between mb-4">
//       <div>
//         <p className="text-sm font-semibold text-[#0F3057]">{title}</p>
//         {subtitle && (
//           <p className="text-xs text-[#555555] mt-0.5">{subtitle}</p>
//         )}
//       </div>
//       <button className="text-[#555555] hover:text-[#0F3057] transition-colors">
//         <FiMoreHorizontal />
//       </button>
//     </div>
//     {children}
//   </div>
// );

// const notificationIcon = (type: string) => {
//   if (type === "alert")
//     return <FiAlertCircle className="text-red-500 text-base mt-0.5 shrink-0" />;
//   if (type === "success")
//     return (
//       <FiCheckCircle className="text-emerald-500 text-base mt-0.5 shrink-0" />
//     );
//   return <FiInfo className="text-blue-500 text-base mt-0.5 shrink-0" />;
// };

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-lg text-xs">
//         <p className="font-semibold text-[#0F3057] mb-1">{label}</p>
//         {payload.map((p: any) => (
//           <p key={p.dataKey} style={{ color: p.color }}>
//             {p.name}: <span className="font-medium">{p.value?.toLocaleString()}</span>
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// // ─── Main Dashboard ───────────────────────────────────────────────────────────

// const AdminDashboard = () => {
//   const [notifList, setNotifList] = useState(notifications);
//   const unreadCount = notifList.filter((n) => !n.read).length;

//   const markAllRead = () =>
//     setNotifList((prev) => prev.map((n) => ({ ...n, read: true })));

//   return (
//     <div
//       className={`${poppins.className} min-h-screen bg-[#F8FAFC] px-6 py-6 overflow-y-auto scrollbar`}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-xl font-bold text-[#0F3057]">Dashboard</h1>
//           <p className="text-xs text-[#555555] mt-0.5">
//             Welcome back, Admin — here's what's happening today.
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Badge count={unreadCount} size="small">
//             <button className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#555555] hover:text-[#0F3057] transition-colors shadow-sm">
//               <FiBell />
//             </button>
//           </Badge>
//           <div className="w-9 h-9 rounded-xl bg-[#0F3057] flex items-center justify-center text-white text-sm font-semibold">
//             A
//           </div>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
//         {summaryCards.map((card) => (
//           <SummaryCard key={card.key} card={card} />
//         ))}
//       </div>

//       {/* Charts Row 1 */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
//         {/* User Growth */}
//         <div className="xl:col-span-2">
//           <ChartCard
//             title="User Growth"
//             subtitle="Total registered users over time"
//           >
//             <ResponsiveContainer width="100%" height={200}>
//               <AreaChart data={userGrowthData}>
//                 <defs>
//                   <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#0F3057" stopOpacity={0.15} />
//                     <stop offset="95%" stopColor="#0F3057" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
//                 <XAxis
//                   dataKey="month"
//                   tick={{ fontSize: 11, fill: "#555555" }}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <YAxis
//                   tick={{ fontSize: 11, fill: "#555555" }}
//                   axisLine={false}
//                   tickLine={false}
//                   tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
//                 />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Area
//                   type="monotone"
//                   dataKey="users"
//                   stroke="#0F3057"
//                   strokeWidth={2}
//                   fill="url(#userGrad)"
//                   dot={false}
//                   activeDot={{ r: 4, fill: "#0F3057" }}
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </ChartCard>
//         </div>

//         {/* AI Usage */}
//         <ChartCard title="AI Usage" subtitle="This week's queries & sessions">
//           <ResponsiveContainer width="100%" height={200}>
//             <BarChart data={aiUsageData} barSize={8} barCategoryGap="40%">
//               <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
//               <XAxis
//                 dataKey="day"
//                 tick={{ fontSize: 11, fill: "#555555" }}
//                 axisLine={false}
//                 tickLine={false}
//               />
//               <YAxis
//                 tick={{ fontSize: 11, fill: "#555555" }}
//                 axisLine={false}
//                 tickLine={false}
//                 tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
//               />
//               <Tooltip content={<CustomTooltip />} />
//               <Bar dataKey="queries" name="Queries" fill="#0F3057" radius={[4, 4, 0, 0]} />
//               <Bar dataKey="sessions" name="Sessions" fill="#0F305740" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//           {/* Legend */}
//           <div className="flex gap-4 mt-2">
//             {[{ label: "Queries", color: "#0F3057" }, { label: "Sessions", color: "#0F305740" }].map((l) => (
//               <div key={l.label} className="flex items-center gap-1.5">
//                 <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
//                 <span className="text-[11px] text-[#555555]">{l.label}</span>
//               </div>
//             ))}
//           </div>
//         </ChartCard>
//       </div>

//       {/* Charts Row 2 */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
//         {/* Subscription Trends */}
//         <div className="xl:col-span-2">
//           <ChartCard
//             title="Subscription Trends"
//             subtitle="Plan distribution over months"
//           >
//             <ResponsiveContainer width="100%" height={200}>
//               <LineChart data={subscriptionTrendsData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
//                 <XAxis
//                   dataKey="month"
//                   tick={{ fontSize: 11, fill: "#555555" }}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <YAxis
//                   tick={{ fontSize: 11, fill: "#555555" }}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Line type="monotone" dataKey="basic" name="Basic" stroke="#0F3057" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
//                 <Line type="monotone" dataKey="pro" name="Pro" stroke="#10B981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
//                 <Line type="monotone" dataKey="enterprise" name="Enterprise" stroke="#F59E0B" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
//               </LineChart>
//             </ResponsiveContainer>
//             <div className="flex gap-4 mt-2">
//               {[
//                 { label: "Basic", color: "#0F3057" },
//                 { label: "Pro", color: "#10B981" },
//                 { label: "Enterprise", color: "#F59E0B" },
//               ].map((l) => (
//                 <div key={l.label} className="flex items-center gap-1.5">
//                   <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
//                   <span className="text-[11px] text-[#555555]">{l.label}</span>
//                 </div>
//               ))}
//             </div>
//           </ChartCard>
//         </div>

//         {/* Notifications & System Alerts */}
//         <div
//           className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col"
//           style={{ boxShadow: "0px 2px 12px 0px #0000000A" }}
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <p className="text-sm font-semibold text-[#0F3057]">
//                 Notifications
//               </p>
//               <p className="text-xs text-[#555555] mt-0.5">
//                 System alerts & activity
//               </p>
//             </div>
//             {unreadCount > 0 && (
//               <button
//                 onClick={markAllRead}
//                 className="text-[10px] font-medium text-[#0F3057] hover:underline"
//               >
//                 Mark all read
//               </button>
//             )}
//           </div>

//           <div className="flex flex-col gap-3 overflow-y-auto scrollbar-mini flex-1 max-h-[260px]">
//             {notifList.map((notif) => (
//               <div
//                 key={notif.id}
//                 className={`flex gap-2.5 p-2.5 rounded-xl transition-colors ${
//                   !notif.read ? "bg-[#0F30570A]" : "bg-gray-50"
//                 }`}
//               >
//                 {notificationIcon(notif.type)}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between gap-1">
//                     <p className="text-[11px] font-semibold text-[#0F3057] truncate">
//                       {notif.title}
//                     </p>
//                     {!notif.read && (
//                       <span className="w-1.5 h-1.5 rounded-full bg-[#0F3057] shrink-0" />
//                     )}
//                   </div>
//                   <p className="text-[10px] text-[#555555] leading-relaxed mt-0.5 line-clamp-2">
//                     {notif.message}
//                   </p>
//                   <p className="text-[10px] text-gray-400 mt-0.5">{notif.time}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Poppins } from "next/font/google";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
} from "recharts";
import { Badge, Spin } from "antd";
import {
  FiUsers, FiBell, FiTrendingUp, FiDollarSign,
  FiAlertCircle, FiInfo, FiCheckCircle, FiMoreHorizontal,
  FiArrowUpRight, FiArrowDownRight, FiActivity, FiRefreshCw,
} from "react-icons/fi";
import {
  getDashboardStats, getDashboardCharts,
  getNotifications, markAllNotificationsRead, markNotificationRead,
} from "@/src/services/api/dashboard.api";
import {
  DashboardStats, DashboardCharts, Notification,
} from "@/src/libs/types/dashboard.types";
import NetworkError from "@/src/components/errors/NetworkError";
import { ErrorType } from "@/src/libs/errorTypes";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});



// ── Helpers ───────────────────────────────────────────────────────────────────
const formatValue = (value: number, currency?: string) => {
  if (currency) return `${currency} ${value.toLocaleString()}`;
  return value.toLocaleString();
};

const formatChange = (change: number) => `${change >= 0 ? "+" : ""}${change}%`;

const formatTime = (dateString: string) => {
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} days ago`;
};

const getNotifIcon = (type: string) => {
  if (type === "High_AI_Token_Usage")
    return <FiAlertCircle className="text-red-500 text-base mt-0.5 shrink-0" />;
  if (type === "New_Subscription_Purchased")
    return <FiCheckCircle className="text-emerald-500 text-base mt-0.5 shrink-0" />;
  return <FiInfo className="text-blue-500 text-base mt-0.5 shrink-0" />;
};

// ── Sub-components ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold text-[#0F3057] mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }}>
            {p.name}: <span className="font-medium">{p.value?.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col" style={{ boxShadow: "0px 2px 12px 0px #0000000A" }}>
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-sm font-semibold text-[#0F3057]">{title}</p>
        {subtitle && <p className="text-xs text-[#555555] mt-0.5">{subtitle}</p>}
      </div>
      <button className="text-[#555555] hover:text-[#0F3057] transition-colors">
        <FiMoreHorizontal />
      </button>
    </div>
    {children}
  </div>
);

// ── Main Dashboard ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [charts, setCharts] = useState<DashboardCharts | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifScrollRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const TAKE = 10;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setNotifications([]);     // ← reset on refresh
    setSkip(0);
    setHasMore(true);
    try {
      const [statsData, chartsData, notifData] = await Promise.all([
        getDashboardStats(),
        getDashboardCharts(),
        getNotifications(0, TAKE),
      ]);
      setStats(statsData);
      setCharts(chartsData);
      setNotifications(notifData.list.list);
      setUnreadCount(notifData.unreadCount);
      setSkip(TAKE);
      setHasMore(notifData.list.hasMany);
    } catch (err: any) {
      const errorType: ErrorType = err?.type || ErrorType.UNKNOWN;
      setError(errorType);
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Infinite scroll — load more when near bottom
  const handleNotifScroll = useCallback(async () => {
    const el = notifScrollRef.current;
    if (!el || !hasMore || loadingMore) return;

    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
    if (!nearBottom) return;

    setLoadingMore(true);
    try {
      const data = await getNotifications(skip, TAKE);
      setNotifications((prev) => {
        const existingIds = new Set(prev.map((n) => n.id));
        const fresh = data.list.list.filter((n) => !existingIds.has(n.id));
        return [...prev, ...fresh];
      });
      setSkip((prev) => prev + TAKE);
      setHasMore(data.list.hasMany);
    } catch {
      // silently fail
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, skip]);

  useEffect(() => {
    if (!notifOpen) return;
    const el = notifScrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleNotifScroll);
    return () => el.removeEventListener("scroll", handleNotifScroll);
  }, [handleNotifScroll, notifOpen]);

  // Mark all notifications as read
  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch {
      // silently fail
    }
  };

  const handleRetry = async () => {
    setRetrying(true);
    await fetchData();
    setRetrying(false);
  };

  // Mark single notification as read on click
  const handleMarkOneRead = async (notif: Notification) => {
    if (notif.isRead) return;
    try {
      await markNotificationRead(notif.id);
      setNotifications((prev) =>
        prev.map((n) => n.id === notif.id ? { ...n, isRead: true } : n)
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      // silently fail
    }
  };

  // Visible slice of notifications


  // Summary cards config
  const summaryCards = stats ? [
    {
      key: "totalUsers", label: "Total Users",
      value: formatValue(stats.stats.totalUsers.value),
      change: formatChange(stats.stats.totalUsers.changePercent),
      positive: stats.stats.totalUsers.changePercent >= 0,
      icon: FiUsers, color: "#0F3057", bg: "#0F30570D",
    },
    {
      key: "activeSubscriptions", label: "Active Subscriptions",
      value: formatValue(stats.stats.activeSubscriptions.value),
      change: formatChange(stats.stats.activeSubscriptions.changePercent),
      positive: stats.stats.activeSubscriptions.changePercent >= 0,
      icon: FiActivity, color: "#10B981", bg: "#10B9810D",
    },
    {
      key: "revenue", label: "Monthly Revenue",
      value: formatValue(stats.stats.monthlyRevenue.value, stats.stats.monthlyRevenue.currency),
      change: formatChange(stats.stats.monthlyRevenue.changePercent),
      positive: stats.stats.monthlyRevenue.changePercent >= 0,
      icon: FiDollarSign, color: "#F59E0B", bg: "#F59E0B0D",
    },
    {
      key: "reports", label: "Reports Filed",
      value: formatValue(stats.stats.reportsFiled.value),
      change: formatChange(stats.stats.reportsFiled.changePercent),
      positive: stats.stats.reportsFiled.changePercent >= 0,
      icon: FiTrendingUp, color: "#EF4444", bg: "#EF44440D",
    },
  ] : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${poppins.className} h-full overflow-y-auto scrollbar bg-[#F8FAFC] px-6 py-5`}>
        <NetworkError 
          errorType={error} 
          onRetry={handleRetry}
          isRetrying={retrying}
        />
      </div>
    );
  }

  return (
    <div className={`${poppins.className} h-full overflow-y-auto scrollbar bg-[#F8FAFC] px-6 py-5`}>

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0F3057]">Dashboard</h1>
          <p className="text-xs text-[#555555] mt-0.5">Welcome back, Admin — here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleRetry} className="text-[#555555] hover:text-[#0F3057] transition-colors" title="Refresh">
            <FiRefreshCw className="text-base" />
          </button>
          <div ref={bellRef} className="relative">
            <Badge count={unreadCount} size="small">
              <button onClick={() => setNotifOpen((prev) => !prev)} className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#555555] hover:text-[#0F3057] transition-colors shadow-sm">
                <FiBell />
              </button>
            </Badge>

            {/* Floating Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 top-11 w-[320px] bg-white rounded-2xl border border-gray-100 z-50 flex flex-col" style={{ boxShadow: "0px 8px 32px 0px #0000001A" }}>
                {/* Arrow */}
                <div className="absolute -top-1.5 right-3 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />

                {/* Header */}
                <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-[#0F3057]">Notifications</p>
                    <p className="text-xs text-[#555555] mt-0.5">
                      {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount > 1 ? "s" : ""}` : "All caught up"}
                    </p>
                  </div>
                  {unreadCount > 0 && (
                    <button onClick={handleMarkAllRead} className="text-[10px] font-medium text-[#0F3057] hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>

                {/* List */}
                <div
                  ref={notifScrollRef}
                  className="flex flex-col gap-2 overflow-y-auto p-3 max-h-[360px]"
                >
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-2">
                      <FiCheckCircle className="text-gray-300 text-3xl" />
                      <p className="text-xs text-[#555555]">No notifications</p>
                    </div>
                  ) : (
                    <>
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => handleMarkOneRead(notif)}
                          className={`flex gap-2.5 p-2.5 rounded-xl transition-colors cursor-pointer ${!notif.isRead ? "bg-[#0F30570A] hover:bg-[#0F305715]" : "bg-gray-50 hover:bg-gray-100"}`}
                        >
                          {getNotifIcon(notif.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <p className="text-[11px] font-semibold text-[#0F3057] truncate">{notif.title}</p>
                              {!notif.isRead && <span className="w-1.5 h-1.5 rounded-full bg-[#0F3057] shrink-0" />}
                            </div>
                            <p className="text-[10px] text-[#555555] leading-relaxed mt-0.5 line-clamp-2">{notif.body}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{formatTime(notif.createdAt)}</p>
                          </div>
                        </div>
                      ))}
                      {hasMore && (
                        <div className="flex items-center justify-center py-2">
                          {loadingMore ? <Spin size="small" /> : <p className="text-[10px] text-gray-400 animate-pulse">Scroll for more...</p>}
                        </div>
                      )}
                      {!hasMore && notifications.length > 0 && (
                        <p className="text-[10px] text-gray-300 text-center py-2">All caught up</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className="bg-white rounded-2xl p-4 flex flex-col gap-3 border border-gray-100" style={{ boxShadow: "0px 2px 12px 0px #0000000A" }}>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                  <Icon style={{ color: card.color }} className="text-base" />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full ${card.positive ? "text-emerald-600 bg-emerald-50" : "text-red-500 bg-red-50"}`}>
                  {card.positive ? <FiArrowUpRight className="text-sm" /> : <FiArrowDownRight className="text-sm" />}
                  {card.change}
                </span>
              </div>
              <div>
                <p className="text-xl font-bold text-[#0F3057]">{card.value}</p>
                <p className="text-xs text-[#555555] mt-0.5">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <div className="xl:col-span-2">
          <ChartCard title="User Growth" subtitle="Total registered users over time">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={charts?.charts.userGrowth ?? []}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F3057" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0F3057" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#555555" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#555555" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="totalUsers" name="Users" stroke="#0F3057" strokeWidth={2} fill="url(#userGrad)" dot={false} activeDot={{ r: 4, fill: "#0F3057" }} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="AI Usage" subtitle="This week's queries & answers">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={charts?.charts.aiUsage ?? []} barSize={8} barCategoryGap="40%">
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#555555" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#555555" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="queries" name="Queries" fill="#0F3057" radius={[4, 4, 0, 0]} />
              <Bar dataKey="answers" name="Answers" fill="#0F305740" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            {[{ label: "Queries", color: "#0F3057" }, { label: "Answers", color: "#0F305740" }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                <span className="text-[11px] text-[#555555]">{l.label}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <ChartCard title="Subscription Trends" subtitle="Monthly vs Yearly plan distribution">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={charts?.charts.subscriptionTrends ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#555555" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#555555" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="total" name="Total" stroke="#0F3057" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="plans.monthly" name="Monthly" stroke="#10B981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="plans.yearly" name="Yearly" stroke="#F59E0B" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              {[{ label: "Total", color: "#0F3057" }, { label: "Monthly", color: "#10B981" }, { label: "Yearly", color: "#F59E0B" }].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                  <span className="text-[11px] text-[#555555]">{l.label}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Notifications Panel */}
        {/* <div className={`bg-white rounded-2xl p-5 border border-gray-100 flex-col ${notifOpen ? "flex" : "hidden"}`} style={{ boxShadow: "0px 2px 12px 0px #0000000A" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-[#0F3057]">Notifications</p>
              <p className="text-xs text-[#555555] mt-0.5">
                {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount > 1 ? "s" : ""}` : "All caught up"}
              </p>
            </div>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="text-[10px] font-medium text-[#0F3057] hover:underline">
                Mark all read
              </button>
            )}
          </div>
          <div
            ref={notifScrollRef}
            className="flex flex-col gap-2.5 overflow-y-auto scrollbar-mini flex-1 max-h-[260px]"
          >
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 py-8 gap-2">
                <FiCheckCircle className="text-gray-300 text-3xl" />
                <p className="text-xs text-[#555555]">No notifications</p>
              </div>
            ) : (
              <>
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleMarkOneRead(notif)}
                    className={`flex gap-2.5 p-2.5 rounded-xl transition-colors cursor-pointer ${!notif.isRead ? "bg-[#0F30570A] hover:bg-[#0F305715]" : "bg-gray-50 hover:bg-gray-100"}`}
                  >
                    {getNotifIcon(notif.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-[11px] font-semibold text-[#0F3057] truncate">{notif.title}</p>
                        {!notif.isRead && <span className="w-1.5 h-1.5 rounded-full bg-[#0F3057] shrink-0" />}
                      </div>
                      <p className="text-[10px] text-[#555555] leading-relaxed mt-0.5 line-clamp-2">{notif.body}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{formatTime(notif.createdAt)}</p>
                    </div>
                  </div>
                ))}
                {hasMore && (
                  <div className="flex items-center justify-center py-2">
                    {loadingMore ? <Spin size="small" /> : <p className="text-[10px] text-gray-400 animate-pulse">Scroll for more...</p>}
                  </div>
                )}
                {!hasMore && notifications.length > 0 && (
                  <p className="text-[10px] text-gray-300 text-center py-2">All caught up</p>
                )}
              </>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;