import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  Search,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChartBarStacked,
  ShoppingBasket,
  Truck,
  ShoppingCart,
  BadgeDollarSign,
} from "lucide-react";
import { div } from "framer-motion/client";
import { Dashboard } from "./Dashboard";
import { Category } from "./Category";
import { Products } from "./Products";
import { Supplier } from "./Supplier";
import { Customer } from "./Customer";
import { Purchase_Order } from "./Purchase_Order";
import { Sales_Order } from "./Sales_Order";
import { NavLink } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
const navItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    path: "./Dashboard",
  },
  {
    label: "Category",
    icon: <ChartBarStacked size={18} />,
    path: "./Category",
  },
  { label: "Products", icon: <ShoppingBasket size={18} />, path: "./Products" },
  { label: "Supplier", icon: <Truck size={18} />, path: "/Supplier" },
  { label: "Customer", icon: <Settings size={18} />, path: "/Customer" },
  { label: "Purchase Order", icon: <ShoppingCart size={18} />, path: "/Purchase_Order" },
  { label: "Sales Order", icon: <BadgeDollarSign size={18} />, path: "/Sales_Order" },
];

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [active, setActive] = useState("");

  const SidebarContent = ({ onNavigate }) => (
    <div className="flex h-full flex-col bg-white">
      {/* Top: Brand + Collapse toggle (desktop) */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-2xl bg-black/10 dark:bg-white/10" />
          {!collapsed && (
            <div className="flex gap-2">
              <img
                src="public\images\logo.png"
                alt="web-logo"
                style={{ width: "20%" }}
              />
              <span className="font-semibold text-black text-2xl">
                Inventory
              </span>
            </div>
          )}
        </div>
        <button
          className="hidden md:inline-flex items-center justify-center rounded-xl p-1.5"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight
              size={25}
              style={{
                color: "white",
                backgroundColor: "#696cff",
                borderRadius: "100%",
                cursor: "pointer",
              }}
            />
          ) : (
            <ChevronLeft
              size={25}
              style={{
                color: "white",
                backgroundColor: "#696cff",
                borderRadius: "100%",
                cursor: "pointer",
              }}
            />
          )}
        </button>
      </div>

      {/* Search */}
      <div className={`p-3 ${collapsed ? "md:hidden" : ""}`}>
        <div className="flex items-center gap-2 rounded-2xl border-black border-1 px-3 py-2">
          <Search size={16} />
          <input
            className="w-full bg-transparent outline-none text-sm text-black"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="px-2 py-1 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 rounded-xl px-3 py-2 text-lg transition hover:bg-gray-100 cursor-pointer
        ${isActive ? "bg-[#ececfc] text-[#696cff]" : "text-black"}
        ${collapsed ? "justify-center" : ""}`
            }
            onClick={onNavigate}
          >
            {item.icon}
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: Profile/Logout */}
      <div className="mt-auto p-2 border-t">
        <button
          className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-red-500/10 text-red-600 dark:text-red-400 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-900 dark:text-neutral-100">
      {/* Top Bar (mobile) */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between border-b bg-white px-4 py-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center justify-center rounded-xl p-2 text-black"
          aria-label="Open sidebar"
        >
          <Menu />
        </button>

        <div className="w-10" />
      </div>

      <div className="grid md:grid-cols-[auto_1fr]">
        {/* Desktop Sidebar */}
        <aside
          className={`shadow-lg hidden md:block sticky top-0 h-[100dvh] border-r bg-white/60 dark:bg-neutral-900/60 backdrop-blur ${
            collapsed ? "w-16" : "w-64"
          } transition-[width] duration-300`}
        >
          <SidebarContent />
        </aside>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="fixed inset-0 z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Scrim */}
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setMobileOpen(false)}
              />

              {/* Drawer panel */}
              <motion.aside
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute left-0 top-0 h-full w-[82vw] max-w-[320px] bg-white border-r shadow-xl"
                aria-label="Mobile sidebar"
              >
                <div className="flex items-center justify-between p-3 border-b">
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center rounded-xl p-1.5 text-black"
                    aria-label="Close sidebar"
                  >
                    <X size={18} />
                  </button>
                </div>
                <SidebarContent onNavigate={() => setMobileOpen(false)} />
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="min-h-[100dvh] p-4 md:p-8 bg-[#fcfbff]">
          <div className="mx-auto max-w-6xl space-y-6">
            <header className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#696cff]">
                {active}
              </h1>
              <div className="hidden md:flex items-center gap-3">
                <button className="rounded-2xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                  Action
                </button>
                <button className="rounded-2xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                  Secondary
                </button>
              </div>
            </header>

            {/* Demo cards */}
            {/*  <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border p-4 shadow-sm hover:shadow transition"
                >
                  <div className="h-24 rounded-xl bg-black/5 dark:bg-white/10 mb-3" />
                  <h3 className="font-semibold mb-1">Card {i + 1}</h3>
                  <p className="text-sm opacity-80">
                    Fully responsive layout with a modern animated sidebar.
                  </p>
                </div>
              ))}
            </section> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/category" element={<Category />} />
              <Route path="/products" element={<Products />} />
              <Route path="/supplier" element={<Supplier />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/purchase_order" element={<Purchase_Order />} />
              <Route path="/sales_order" element={<Sales_Order />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
