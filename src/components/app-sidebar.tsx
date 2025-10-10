"use client";

import * as React from "react";
import {
  Home,
  User,
  ShoppingCart,
  Info,
  Pointer,
  IndianRupee,
  Diamond,
  MessageSquare,
  PlusSquare,
  PenSquareIcon,
  User2,
  LineChart,
  LucideCoins,
} from "lucide-react";

import { NavMain } from "../components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { title } from "process";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Customers",
      url: "/customer",
      icon: User,
    },
    {
      title: "Customer Follow Up",
      url: "/followups/customer",
      icon: PlusSquare,
    },
    {
      title: "Contact",
      url: "/contact",
      icon: User,
    },
    {
      title: "Contact Follow Up",
      url: "/followups/contact",
      icon: PlusSquare,
    },
    {
      title: "Company Project",
      url: "/company-projects",
      icon: User,
    },
    {
      title: "Company Project Enquiry",
      url: "#",
      icon: Info,
    },
    {
      title: "Customer Enquiry",
      url: "#",
      icon: Info,
    },
    {
      title: "Schedules",
      url: "#",
      icon: PenSquareIcon,
    },
    {
      title: "Task",
      url: "#",
      icon: Pointer,
    },
    {
      title: "Masters",
      url: "#",
      icon: Diamond,
      items: [
        {
          title: "Campaign",
          url: "/login",
        },
        {
          title: "Types",
          url: "#",
        },
        {
          title: "Customer Subtype",
          url: "#",
        },
        {
          title: "City",
          url: "#",
        },
        {
          title: "Locations",
          url: "#",
        },
        {
          title: "Facilities",
          url: "#",
        },
        {
          title: "Amenities",
          url: "#",
        },
        {
          title: "Builder Sliders",
          url: "#",
        },
        {
          title: "Fuctional Areas",
          url: "#",
        },
        {
          title: "Industries",
          url: "#",
        },
        {
          title: "ROles",
          url: "#",
        },
        {
          title: "Contact Campaign",
          url: "#",
        },
        {
          title: "Contact Type",
          url: "#",
        },
        {
          title: "References",
          url: "#",
        },
        {
          title: "Expenses",
          url: "#",
        },
        {
          title: "Incomes",
          url: "#",
        },
        {
          title: "Status Type",
          url: "#",
        },
        {
          title: "Payment Methods",
          url: "#",
        },
        {
          title: "Sms Templates",
          url: "#",
        },
        {
          title: "Mail Templates",
          url: "#",
        },
        {
          title: "Whatsapp Templates",
          url: "#",
        },
      ],
    },
    {
      title: "Financial",
      url: "#",
      icon: IndianRupee,
      items: [
        {
          title: "Income Marketings",
          url: "#",
        },
        {
          title: "Expense Marketings",
          url: "#",
        },
      ],
    },
    {
      title: "Requirments",
      url: "#",
      icon: Home,
    },
    {
      title: "Favourites",
      url: "#",
      icon: Home,
    },
    {
      title: "E-commerce",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Category",
          url: "/category",
        },
        {
          title: "Sub Category",
          url: "/sub-category",
        },
        {
          title: "Products",
          url: "/product",
        },
        {
          title: "Orders",
          url: "/orders",
        },
      ],
    },
    {
      title: "Users",
      url: "/users",
      icon: User2,
    },
    {
      title: "Customer Import",
      url: "/customer",
      icon: MessageSquare,
    },
    {
      title: "Contact Import",
      url: "/contact",
      icon: MessageSquare,
    },
    {
      title: "Customer Report",
      url: "/customer",
      icon: LineChart,
    },
    {
      title: "Contact Report",
      url: "/contact-report",
      icon: LineChart,
    },
    {
      title: "Database Manager",
      url: "#",
      icon: LucideCoins,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-start justify-center ">
        <img src="/logo.webp" alt="App Logo" className="h-10 w-40 " />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}