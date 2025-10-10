'use client'

import { useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import SingleSelect from "@/app/component/SingleSelect";
import DateSelector from "@/app/component/DateSelector";

export default function FollowupEdit() {
  const [followupData, setFollowupData] = useState({
    Owner: "",
    CustomerName: "",
    ContactNo: "",
    Location: "",
    Email: "",
    Facilities: "",
    CustomerId: "",
    CustomerYear: "",
    Description: "",
    Verified: "",
    CustomerType: "",
    CustomerSubType: "",
    City: "",
    Area: "",
    Address: "",
    ResponsiveUI: "",
    CustomerDate: ""
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
    console.log("FollowUp Edited Data:", followupData);
    alert("FollowUp changes saved successfully!");
  };

  const owners = ["john", "Job Seeker", "training", "job provider"];
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
      <div className="w-full max-w-[900px]">
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
            Edit <span className="text-blue-600">FollowUp</span>
          </h1>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-6">
            {/* Owner Selector */}
            <div className="max-w-[200px] mb-6">
              <SingleSelect options={owners} label="Owner" onChange={(val) => handleSelectChange("Owner", val)} />
            </div>

            <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
              {/* Left Column */}
              <div className="flex flex-col gap-4">
                <InputField label="Customer Name" name="CustomerName" value={followupData.CustomerName} onChange={handleInputChange} />
                <InputField label="Contact No" name="ContactNo" value={followupData.ContactNo} onChange={handleInputChange} />
                <SingleSelect options={owners} label="Location" onChange={(val) => handleSelectChange("Location", val)} />
                <InputField label="Email" name="Email" value={followupData.Email} onChange={handleInputChange} />
                <SingleSelect options={owners} label="Facilities" onChange={(val) => handleSelectChange("Facilities", val)} />
                <InputField label="Customer Id" name="CustomerId" value={followupData.CustomerId} onChange={handleInputChange} />
                <InputField label="Customer Year" name="CustomerYear" value={followupData.CustomerYear} onChange={handleInputChange} />
                <TextareaField label="Description" name="Description" value={followupData.Description} onChange={handleInputChange} />
                <SingleSelect options={owners} label="Verified" onChange={(val) => handleSelectChange("Verified", val)} />
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-4">
                <SingleSelect options={owners} label="Customer Type" onChange={(val) => handleSelectChange("CustomerType", val)} />
                <SingleSelect options={owners} label="Customer Subtype" onChange={(val) => handleSelectChange("CustomerSubType", val)} />
                <InputField label="City" name="City" value={followupData.City} onChange={handleInputChange} />
                <InputField label="Area" name="Area" value={followupData.Area} onChange={handleInputChange} />
                <InputField label="Address" name="Address" value={followupData.Address} onChange={handleInputChange} />
                <SingleSelect options={owners} label="Responsive UI" onChange={(val) => handleSelectChange("ResponsiveUI", val)} />
                <DateSelector label="Customer Date" onChange={(val) => handleSelectChange("CustomerDate", val)} />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-6 rounded-md font-semibold hover:scale-105 transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// InputField Component
const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}> = ({ label, name, value, onChange }) => (
  <label className="relative block w-full">
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
    />
    <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500">{label}</p>
  </label>
);

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
