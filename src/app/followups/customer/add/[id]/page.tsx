'use client'

import { useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import SingleSelect from "@/app/component/SingleSelect";
import DateSelector from "@/app/component/DateSelector";

export default function FollowupAdd() {
  const [followupData, setFollowupData] = useState({
    StartDate: "",
    StatusType: "",
    NextFollowupDate: "",
    Description: ""
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFollowupData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSelectChange = useCallback(
    (label: string, selected: string) => {
      setFollowupData((prev) => ({ ...prev, [label]: selected }));
    },
    []
  );

  const handleSubmit = () => {
    console.log("FollowUp Data Submitted:", followupData);
    alert("FollowUp added successfully!");
    setFollowupData({
      StartDate: "",
      StatusType: "",
      NextFollowupDate: "",
      Description: ""
    });
  };

  const statusType = [
    "Interested",
    "Need Followup",
    "Not Interested",
    "To visit",
    "Visited",
    "Want Demo"
  ];

  return (
    <div className="bg-slate-200 min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-[700px]">
        {/* Back Button */}
        <div className="flex justify-end mb-4">
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl h-auto">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
            Add <span className="text-blue-600">FollowUp</span>
          </h1>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-6">
            <DateSelector label="Start Date" onChange={(val) => handleSelectChange("StartDate", val)} />

            <SingleSelect options={statusType} label="Status Type" onChange={(val) => handleSelectChange("StatusType", val)} />

            <DateSelector label="Next Followup Date" onChange={(val) => handleSelectChange("NextFollowupDate", val)} />

            <TextareaField
              label="Description"
              name="Description"
              value={followupData.Description}
              onChange={handleInputChange}
            />

            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-6 rounded-md font-semibold hover:scale-105 transition-all"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// TextareaField Component
const TextareaField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}> = ({ label, name, value, onChange }) => (
  <label className="relative block w-full">
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500 min-h-[100px]"
    />
    <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500">{label}</p>
  </label>
);
