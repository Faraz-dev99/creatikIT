"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation"; // ✅ Correct hook for App Router
import { addSchedules } from "@/store/schedules";
import {toast, Toaster } from "react-hot-toast";

interface ScheduleType {
  date: string;
  Time: string;
  Description: string;
  User: string;
}

const AddPage: React.FC = () => {
  const router = useRouter();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddPageInner router={router} />
    </Suspense>
  );
};

// ✅ Inner component uses useSearchParams
const AddPageInner: React.FC<{ router: any }> = ({ router }) => {
  const [formData, setFormData] = useState<ScheduleType>({
    date: "",
    Time: "",
    Description: "",
    User: "",
  });

  const searchParams = useSearchParams(); // ✅ Safe now
  const id = searchParams.get("id");
  const API_URL = "https://live-project-backend-viiy.onrender.com/api/sch";



  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!formData.date || !formData.Time || !formData.Description || !formData.User) {
      toast.error("Please fill all fields before saving!");
      return;
    }

    const data = await addSchedules(formData);
        if (data) {
          toast.success("Schedule Added Successfully!");
          setFormData({ date: "", Time: "", Description: "", User: "" });
          router.push("/schedules");
          return;
        }
        toast.error("Something went wrong. Try again.");
  }, [formData, router]);

  return (
    <div className="bg-slate-200 min-h-screen p-6">
      <Toaster position="top-right" />
      {/* Back Button */}
      <div className="flex justify-end mb-4">
        <Link
          href="/schedules"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          <ArrowLeft size={18} /> Back
        </Link>
      </div>

      {/* Form Card */}
      <div className="flex justify-center">
        <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl h-auto w-[70%]">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8 text-left border-b pb-4 border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-800 leading-tight tracking-tight">
                {id ? "Edit" : "Add"} <span className="text-blue-600">Schedule</span>
              </h1>
            </div>

            <div className="flex flex-col space-y-6">
              {/* Date and Time */}
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
                <div className="flex flex-col flex-1">
                  <label className="mb-1 font-semibold text-gray-700">Schedule Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="mb-1 font-semibold text-gray-700">Time</label>
                  <input
                    type="time"
                    name="Time"
                    value={formData.Time}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Description and User */}
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
                <div className="flex flex-col flex-1">
                  <label className="mb-1 font-semibold text-gray-700">Description</label>
                  <textarea
                    name="Description"
                    value={formData.Description}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="mb-1 font-semibold text-gray-700">User</label>
                  <select
                    name="User"
                    value={formData.User}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select User</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Himmashu">Himmashu</option>
                  </select>
                </div>
              </div>

              {/* Save / Go to Schedule Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition-all"
                >
                  save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
