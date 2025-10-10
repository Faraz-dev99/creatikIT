'use client'

import { useState, useCallback } from "react";
import Link from "next/link";
import SingleSelect from "@/app/component/SingleSelect";
import DateSelector from "@/app/component/DateSelector";
import { ArrowLeft } from "lucide-react";

export default function CustomerEdit() {
  const [customerData, setCustomerData] = useState({
    Compaign: "",
    CustomerName: "",
    ContactNo: "",
    Location: "",
    Address: "",
    Facilities: "",
    CustomerId: "",
    CustomerYear: "",
    Description: "",
    Verified: "",
    ContactType: "",
    City: "",
    Area: "",
    Email: "",
    ReferenceId: "",
    CustomerDate: "",
    Others: "",
    Video: "",
    GoogleMap: ""
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCustomerData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSelectChange = useCallback(
    (label: string, selected: string) => {
      setCustomerData((prev) => ({ ...prev, [label]: selected }));
    },
    []
  );

  const handleSubmit = () => {
    console.log("Customer Data Submitted:", customerData);
    alert("Customer updated successfully!");
    // Normally you would call API here
  };

  const owners = ["John", "Job Seeker", "Training", "Job Provider"];

  return (
    <div className="bg-slate-200 min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-[900px]">
        {/* Back Button */}
        <div className="flex justify-end mb-4">
          <Link
            href="/customer"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            <ArrowLeft size={18} /> Back
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl h-auto">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8 text-left border-b pb-4 border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-800 leading-tight tracking-tight">
                Edit <span className="text-blue-600">Owner Information</span>
              </h1>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col space-y-6">
              <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
                {/* Left Column */}
                <div className="flex flex-col gap-4">
                  <SingleSelect
                    options={owners}
                    label="Compaign"
                    onChange={(selected) => handleSelectChange("Compaign", selected)}
                  />
                  <InputField label="Customer Name" name="CustomerName" value={customerData.CustomerName} onChange={handleInputChange} />
                  <InputField label="Contact No" name="ContactNo" value={customerData.ContactNo} onChange={handleInputChange} />
                  <SingleSelect options={owners} label="Location" onChange={(selected) => handleSelectChange("Location", selected)} />
                  <InputField label="Address" name="Address" value={customerData.Address} onChange={handleInputChange} />
                  <SingleSelect options={owners} label="Facilities" onChange={(selected) => handleSelectChange("Facilities", selected)} />
                  <InputField label="Customer Id" name="CustomerId" value={customerData.CustomerId} onChange={handleInputChange} />
                  <InputField label="Customer Year" name="CustomerYear" value={customerData.CustomerYear} onChange={handleInputChange} />
                  <TextareaField label="Description" name="Description" value={customerData.Description} onChange={handleInputChange} />
                  <SingleSelect options={owners} label="Verified" onChange={(selected) => handleSelectChange("Verified", selected)} />
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-4">
                  <SingleSelect options={owners} label="Contact Type" onChange={(selected) => handleSelectChange("ContactType", selected)} />
                  <InputField label="City" name="City" value={customerData.City} onChange={handleInputChange} />
                  <InputField label="Area" name="Area" value={customerData.Area} onChange={handleInputChange} />
                  <InputField label="Email" name="Email" value={customerData.Email} onChange={handleInputChange} />
                  <SingleSelect options={owners} label="Reference Id" onChange={(selected) => handleSelectChange("ReferenceId", selected)} />
                  <DateSelector label="Customer Date" onChange={(selected) => handleSelectChange("CustomerDate", selected)} />
                  <InputField label="Others" name="Others" value={customerData.Others} onChange={handleInputChange} />
                  <InputField label="Video" name="Video" value={customerData.Video} onChange={handleInputChange} />
                  <InputField label="Google Map" name="GoogleMap" value={customerData.GoogleMap} onChange={handleInputChange} />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition-all"
                >
                  Save
                </button>
              </div>
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
    ></textarea>
    <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500">{label}</p>
  </label>
);
