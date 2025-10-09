"use client";

import React, { useEffect, useState, useMemo } from "react";
import { BookDownIcon, Pencil, PlusSquare, Trash } from "lucide-react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ScheduleType {
  _id?: string; // MongoDB id
  date: string;
  Time: string;
  Description: string;
  User: string;
}

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const [keyword, setKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const API_URL = "https://live-project-backend-viiy.onrender.com/api/sch";

  // ✅ Fetch schedules from API
  const fetchSchedules = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setSchedules(data);
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
      toast.error("Failed to fetch schedules!");
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // ✅ Unique users for filter
  const uniqueUsers = useMemo(() => {
    const users = schedules.map((s) => s.User).filter(Boolean);
    return Array.from(new Set(users));
  }, [schedules]);

  // ✅ Filtered schedules
  const filteredSchedules = useMemo(() => {
    return schedules.filter((s) => {
      const matchesUser =
        selectedUser === "" || s.User.toLowerCase().includes(selectedUser.toLowerCase());
      const matchesKeyword =
        keyword === "" ||
        s.Description.toLowerCase().includes(keyword.toLowerCase()) ||
        s.date.includes(keyword) ||
        s.Time.includes(keyword);
      return matchesUser && matchesKeyword;
    });
  }, [schedules, keyword, selectedUser]);

  // ✅ Delete schedule via API
  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this schedule?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete schedule");

      toast.success("Schedule deleted successfully!");
      fetchSchedules(); // refresh list
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete schedule.");
    }
  };

  // ✅ Edit redirect
  const handleEdit = (id?: string) => {
    if (!id) return;
    window.location.href = `/add?id=${id}`; // pass ID as query
  };

  const handleClear = () => {
    setKeyword("");
    setSelectedUser("");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen bg-slate-100 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#1a2a4f] tracking-wide">
            Dashboard <span className="text-gray-500 text-sm">/ Schedule</span>
          </h1>
        </div>

        {/* Card Container */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 relative">
          {/* Add Button */}
          <Link href="/add">
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#1a2a4f] to-[#4e6787] text-white px-4 py-2 rounded-md absolute right-4 top-4 hover:cursor-pointer font-semibold">
              <PlusSquare size={18} /> Add
            </button>
          </Link>

          {/* Filter Form */}
          <form className="w-full flex flex-wrap gap-6 items-end mb-6 mt-16">
            {/* User Filter */}
            <div className="flex flex-col w-60">
              <label htmlFor="user" className="text-lg font-medium text-[#1a2a4f] pl-1">
                User
              </label>
              <select
                id="user"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="h-10 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              >
                <option value="">All Users</option>
                {uniqueUsers.map((user, idx) => (
                  <option key={idx} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Filter */}
            <div className="flex flex-col flex-1 w-60">
              <label htmlFor="keyword" className="text-lg font-medium text-[#1a2a4f] pl-1">
                Keyword
              </label>
              <input
                id="keyword"
                type="text"
                placeholder="Search description, date, or time..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />
            </div>

            {/* Limit (optional, not used yet) */}
            <div className="flex flex-col w-40">
              <label htmlFor="limit" className="text-lg font-medium text-[#1a2a4f] pl-1">
                Limit
              </label>
              <select
                id="limit"
                className="h-10 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                defaultValue="100"
              >
                <option value="0">0</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
              </select>
            </div>

            {/* Clear & Export */}
            <div className="flex gap-3 ml-auto">
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 text-sm hover:underline transition-all"
              >
                Clear Search
              </button>

              <div className="relative inline-block group">
                <button
                  type="button"
                  className="flex items-center gap-2 bg-gradient-to-r from-[#1a2a4f] to-[#4e6787] text-white px-3 py-2 rounded-md shadow-md hover:from-[#2c3d69] hover:to-[#1a2a4f] transition-all duration-300"
                >
                  <BookDownIcon size={20} />
                </button>
                {/* Tooltip */}
                <span className="absolute right-0 -top-12 text-green-600 text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 shadow-lg pointer-events-none">
                  Export File
                  <span className="absolute bottom-[-5px] right-6 w-2 h-2 bg-[#1a2a4f] rotate-45"></span>
                </span>
              </div>
            </div>
          </form>

          {/* Table */}
          <table className="table-auto w-full border-collapse text-sm">
            <thead className="bg-[#1a2a4f] text-white">
              <tr>
                <th className="px-4 py-3 text-left">S.No.</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.length > 0 ? (
                filteredSchedules.map((s, i) => (
                  <tr key={s._id || i} className="border-t hover:bg-[#f7f6f3] transition-all duration-200">
                    <td className="px-4 py-3">{i + 1}</td>
                    <td className="px-4 py-3">{s.User}</td>
                    <td className="px-4 py-3">{s.Description}</td>
                    <td className="px-4 py-3">{s.date}</td>
                    <td className="px-4 py-3">{s.Time}</td>
                    <td className="px-2 py-2">
                      <div className="flex gap-4 items-center">
                        {/* Edit Icon with Tooltip */}
                        <div className="relative group">
                          <button
                            onClick={() => handleEdit(s._id)}
                            className="flex items-center gap-2 text-[#1a2a4f] hover:text-blue-600 transition-all duration-300"
                          >
                            <Pencil size={16} className="stroke-current hover:fill-blue-600 hover:stroke-none transition-all duration-300" />
                          </button>
                          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-green-700 text-xs px-2 py-1 bg-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            Edit
                          </span>
                        </div>

                        {/* Delete Icon with Tooltip */}
                        <div className="relative group cursor-pointer">
                          <Trash
                            onClick={() => handleDelete(s._id)}
                            size={16}
                            className="stroke-current hover:fill-red-600 hover:stroke-none transition-all duration-300"
                          />
                          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-green-600 text-xs px-2 py-1 bg-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            Delete
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No schedules match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}