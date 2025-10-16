'use client'

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../component/ProtectedRoutes";
import SingleSelect from "@/app/component/SingleSelect";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";

export default function CustomerImport() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    campaign: "",
    customerType: "",
    customerSubtype: "",
    name: "",
    file: null as File | null,
    user: "",
  });

  const campaigns = ["Campaign A", "Campaign B", "Campaign C"];
  const customerTypes = ["Retail", "Wholesale", "Online"];
  const customerSubtypes = ["Premium", "Regular", "New"];
  const users = ["Admin", "Staff1", "Staff2"];

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, file: e.target.files?.[0] || null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      toast.error("Please select a file to import.");
      return;
    }
    toast.success("Customer file imported successfully!");
    console.log(formData);
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-56px)] overflow-auto bg-gray-200 max-md:py-10">
        <Toaster position="top-right" />
        <div className="p-4 w-full">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="flex gap-2 items-center font-light">
              <span className="text-gray-900 text-2xl">Dashboard</span> /
              <span> Customer / Import</span>
            </h2>
          </div>

          {/* IMPORT FORM */}
          <div className="bg-white mt-6 p-6 rounded-md border">
            <h3 className="font-semibold text-gray-700 mb-4">
              Import Customer File
            </h3>

            <form
              className="flex flex-col gap-5 max-w-2xl"
              onSubmit={handleSubmit}
            >
              <SingleSelect
                options={campaigns}
                label="Campaign"
                value={formData.campaign}
                onChange={(val) => handleSelectChange("campaign", val)}
              />

              <SingleSelect
                options={customerTypes}
                label="Customer Type"
                value={formData.customerType}
                onChange={(val) => handleSelectChange("customerType", val)}
              />

              <SingleSelect
                options={customerSubtypes}
                label="Customer Subtype"
                value={formData.customerSubtype}
                onChange={(val) => handleSelectChange("customerSubtype", val)}
              />

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 outline-none w-full"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  File
                </label>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="border border-gray-300 rounded-md px-3 py-2 outline-none w-full cursor-pointer"
                />
                {formData.file && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected file: {formData.file.name}
                  </p>
                )}
              </div>

              <SingleSelect
                options={users}
                label="User"
                value={formData.user}
                onChange={(val) => handleSelectChange("user", val)}
              />

              <div className="flex justify-end mt-5">
                <Button
                  type="submit"
                  sx={{
                    background:
                      "linear-gradient(to right, #1a2a4f, #4e6787)",
                    color: "white",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": {
                      background:
                        "linear-gradient(to right, #16213b, #435e7b)",
                    },
                  }}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
