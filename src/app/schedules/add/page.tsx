"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation"; // ✅ Correct hook for App Router

interface ScheduleType {
  date: string;
  Time: string;
  Description: string;
  User: string;
}

const AddPage: React.FC = () => {
  const [formData, setFormData] = useState<ScheduleType>({
    date: "",
    Time: "",
    Description: "",
    User: "",
  });

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const API_URL = "https://live-project-backend-viiy.onrender.com/api/sch";

  const router = useRouter(); // ✅ Move hook here (top-level!)

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await fetch(`${API_URL}/${id}`);
          const data = await res.json();
          setFormData(data);
        } catch (error) {
          console.error("Failed to fetch schedule for edit:", error);
          toast.error("Failed to fetch schedule data!");
        }
      }
    };
    fetchData();
  }, [id]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!formData.date || !formData.Time || !formData.Description || !formData.User) {
      alert("⚠️ Please fill all fields before saving!");
      return;
    }

    try {
      const res = await fetch(id ? `${API_URL}/${id}` : API_URL, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("✅ API Response:", data);

      if (!res.ok) throw new Error("Failed to save schedule");

      alert(id ? "✅ Schedule updated successfully!" : "✅ Schedule added successfully!");
      setFormData({ date: "", Time: "", Description: "", User: "" });

      router.push("/schedules"); // ✅ Redirect after alert
    } catch (error) {
      console.error("❌ Error saving schedule:", error);
      alert("⚠️ Something went wrong. Try again.");
    }
  }, [formData, id, router]);
  

  return (
    <>
     
      <div className="bg-slate-200 min-h-screen p-6">
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
                      // href="/Schedule"
                      onClick={handleSave}
                      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition-all"
                    > {id ? "Update" : "Save"}
                     </button>               
                   
                  
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPage;