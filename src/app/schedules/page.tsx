"use client";

import React, { useEffect, useState, useMemo } from "react";
import { BookDownIcon, PlusSquare } from "lucide-react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation";
import PopupMenu from "../component/popups/PopupMenu"; // Reuse your popup
import { ScheduleType, DeleteDialogDataInterface } from "../../store/schedules.interface";
import { deleteSchedules, getSchedules } from "@/store/schedules";





export default function SchedulePage() {
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const [keyword, setKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] = useState<DeleteDialogDataInterface | null>(null);

  const router = useRouter();
  const API_URL = "https://live-project-backend-viiy.onrender.com/api/sch";

  // Fetch schedules from API
  const fetchSchedules = async () => {
    const data = await getSchedules();
    if (data) setSchedules(data);
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Unique users for filter
  const uniqueUsers = useMemo(() => {
    const users = schedules.map((s) => s.User).filter(Boolean);
    return Array.from(new Set(users));
  }, [schedules]);

  // Filtered schedules
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

  // Delete schedule via API
  const deleteSchedule = async (data: DeleteDialogDataInterface | null) => {
    if (!data) return;

    const res = await deleteSchedules(data.id);
    if (res) {
      toast.success("Schedule deleted successfully!");
      setIsDeleteDialogOpen(false);
      setDeleteDialogData(null);
      fetchSchedules();
      return;
    }
    toast.error("Failed to delete schedule.");
  };

  //Edit redirect
  const editCustomer = (id?: string) => {
    router.push(`schedules/edit?id=${id}`);
  };

  const handleClear = () => {
    setKeyword("");
    setSelectedUser("");
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-slate-100 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
            Dashboard <span className="text-gray-500 text-sm">/ Schedule</span>
          </h1>
        </div>

        {/* DELETE POPUP */}
        {isDeleteDialogOpen && deleteDialogData && (
          <PopupMenu onClose={() => { setIsDeleteDialogOpen(false); setDeleteDialogData(null); }}>
            <div className="flex flex-col gap-10 m-2">
              <h2 className="font-bold">
                Are you sure you want to delete this schedule?
              </h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">Description: {deleteDialogData.description}</div>
                <div className="flex items-center gap-2">Date: <p className="text-gray-500 text-sm">{deleteDialogData.date}</p></div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="text-[#C62828] bg-[#FDECEA] hover:bg-[#F9D0C4] cursor-pointer rounded-md px-4 py-2"
                  onClick={() => deleteSchedule(deleteDialogData)}
                >
                  Yes, delete
                </button>
                <button
                  className="cursor-pointer text-blue-800 hover:bg-gray-200 rounded-md px-4 py-2"
                  onClick={() => { setIsDeleteDialogOpen(false); setDeleteDialogData(null); }}
                >
                  No
                </button>
              </div>
            </div>
          </PopupMenu>
        )}

        {/* Card Container */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 relative">
          {/* Add Button */}
          <Link href="/schedules/add">
            <button className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-[#4e6787] text-white px-4 py-2 rounded-md absolute right-4 top-4 hover:cursor-pointer font-semibold">
              <PlusSquare size={18} /> Add
            </button>
          </Link>

          {/* Filter Form */}
          <form className="w-full flex flex-wrap gap-6 items-end mb-6 mt-16">
            {/* User Filter */}
            <div className="flex flex-col w-60">
              <label htmlFor="user" className="text-lg font-medium text-gray-900 pl-1">
                User
              </label>
              <select
                id="user"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="h-10 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800"
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
              <label htmlFor="keyword" className="text-lg font-medium text-gray-900 pl-1">
                Keyword
              </label>
              <input
                id="keyword"
                type="text"
                placeholder="Search description, date, or time..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full outline-none border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800"
              />
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
            </div>
          </form>

          {/* Table */}
          <div className="border border-gray-400 rounded-md m-2 overflow-auto">
            <div className="flex gap-5 items-center px-3 py-4 min-w-max text-gray-700">
              <button type="button" className="hover:text-gray-950 cursor-pointer">Delete All</button>
              <button type="button" className="hover:text-gray-950 cursor-pointer">SMS All</button>
              <button type="button" className="hover:text-gray-950 cursor-pointer">Email All</button>
              <button type="button" className="hover:text-gray-950 cursor-pointer">Mass Update</button>
            </div>
            <table className="table-auto w-full border-collapse text-sm">
              <thead className="bg-gray-900 text-white">
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
                      <td className="px-4 py-2 flex gap-2 items-center">
                        <Button
                          sx={{
                            backgroundColor: "#C8E6C9",
                            color: "#2E7D32",
                            minWidth: "32px",
                            height: "32px",
                            borderRadius: "8px",
                          }}
                          onClick={() => editCustomer(s._id || String(i))}
                        >
                          <MdEdit />
                        </Button>
                        <Button
                          sx={{
                            backgroundColor: "#F9D0C4",
                            color: "#C62828",
                            minWidth: "32px",
                            height: "32px",
                            borderRadius: "8px",
                          }}
                          onClick={() => {
                            setIsDeleteDialogOpen(true);
                            setDeleteDialogData({
                              id: s._id || String(i),
                              description: s.Description,
                              date: s.date,
                            });
                          }}
                        >
                          <MdDelete />
                        </Button>
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
      </div>
    </>
  );
}
