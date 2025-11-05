'use client';

import { useState, useCallback } from "react";
import Link from "next/link";
import SingleSelect from "@/app/component/SingleSelect";
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { typesAllDataInterface } from "@/store/masters/types/types.interface";
import { addTypes } from "@/store/masters/types/types";

interface ErrorInterface {
  [key: string]: string;
}

export default function CustomerTypeAdd() {
  const [typeData, setTypeData] = useState<typesAllDataInterface>({
    Campaign: "",
    Name: "",
    Status: "",
  });

  const [errors, setErrors] = useState<ErrorInterface>({});
  const router = useRouter();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTypeData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const handleSelectChange = useCallback((label: string, selected: string) => {
    setTypeData((prev) => ({ ...prev, [label]: selected }));
    setErrors((prev) => ({ ...prev, [label]: "" }));
  }, []);

  const validateForm = () => {
    const newErrors: ErrorInterface = {};
    if (!typeData.Campaign.trim()) newErrors.Campaign = "Campaign is required";
    if (!typeData.Name.trim()) newErrors.Name = "Customer Type Name is required";
    if (!typeData.Status.trim()) newErrors.Status = "Status is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

   
      const result = await addTypes(typeData);
      if (result) {
        toast.success("Customer Type added successfully!");
        router.push("/masters/customer-types");
        return;
      }
    
      toast.error("Failed to add Customer Type");
     
    
  };

  const statusOptions = ["Active", "Inactive"];
  const campaignOptions = ["Campaign A", "Campaign B", "Campaign C"]; // dummy options

  return (
    <div className="bg-slate-200 min-h-screen p-6 flex justify-center">
      <Toaster position="top-right" />
      <div className="w-full">
        {/* Back Button */}
        <div className="flex justify-end mb-4">
          <Link
            href="/masters/customer-types"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            <ArrowLeft size={18} /> Back
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white/90 backdrop-blur-lg p-10 w-full rounded-3xl shadow-2xl">
          <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <div className="mb-8 text-left border-b pb-4 border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-800 leading-tight tracking-tight">
                Add <span className="text-blue-600">Customer Type</span>
              </h1>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
                {/* Campaign Dropdown */}
                <SingleSelect
                  options={campaignOptions}
                  label="Campaign"
                  value={typeData.Campaign}
                  onChange={(v) => handleSelectChange("Campaign", v)}
                />

                {/* Customer Type Name */}
                <InputField
                  label="Customer Type Name"
                  name="Name"
                  value={typeData.Name}
                  onChange={handleInputChange}
                  error={errors.Name}
                />

                {/* Status Dropdown */}
                <SingleSelect
                  options={statusOptions}
                  label="Status"
                  value={typeData.Status}
                  onChange={(v) => handleSelectChange("Status", v)}
                />
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

// 🟩 Reusable Input Field
const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, onChange, error }) => (
  <label className="relative block w-full">
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      className={`peer w-full border rounded-sm bg-transparent py-3 px-4 outline-none 
        ${error ? "border-red-500 focus:border-red-500" : "border-gray-400 focus:border-blue-500"}`}
    />
    <p
      className={`absolute left-2 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      ${value || error
        ? "-top-2 text-xs text-blue-500"
        : "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500"
      }`}
    >
      {label}
    </p>
    {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
  </label>
);
