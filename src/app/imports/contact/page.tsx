'use client'

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import SingleSelect from "@/app/component/SingleSelect";
import { useRouter } from "next/navigation";

import { getCampaign } from "@/store/masters/campaign/campaign";
import { getTypes } from "@/store/masters/types/types";           // ContactType
import { getSubtype } from "@/store/masters/subtype/subtype";     // Range
import { handleFieldOptions } from "@/app/utils/handleFieldOptions";

import { importContact } from "@/store/contact";   // ✅ Your contact import API
import { getContactType } from "@/store/masters/contacttype/contacttype";


export default function ContactImport() {

  const [importData, setImportData] = useState({
    Campaign: "",
    ContactType: "",
    Range: "",
    file: null as File | null,
  });

  const [fieldOptions, setFieldOptions] = useState<Record<string, any[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();


  // ✅ Fetch dropdown data
  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    await handleFieldOptions(
      [
        { key: "Campaign", fetchFn: getCampaign },
        { key: "ContactType", fetchFn: getContactType }, // ✅ Reuse types for contact types
        { key: "Range",staticData: ["10", "20", "30"] },     // ✅ Range from subtype API
      ],
      setFieldOptions
    );
  };


  // ✅ Select change
  const handleSelectChange = useCallback((label: string, value: string) => {
    setImportData((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => ({ ...prev, [label]: "" }));
  }, []);


  // ✅ File upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImportData((prev) => ({ ...prev, file }));
  };


  // ✅ Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!importData.Campaign) newErrors.Campaign = "Campaign is required";
    if (!importData.ContactType) newErrors.ContactType = "Contact Type is required";
    if (!importData.Range) newErrors.Range = "Range is required";
    if (!importData.file) newErrors.file = "Please upload an Excel file";

    return newErrors;
  };


  // ✅ Submit
  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Campaign", importData.Campaign);
      formData.append("ContactType", importData.ContactType);
      formData.append("Range", importData.Range);
      if (importData.file) formData.append("file", importData.file);

      const result = await importContact(formData);

      if (result) {
        toast.success("Contacts imported successfully!");
        router.push("/contact");
      } else {
        toast.error("Failed to import contacts");
      }
    } catch (error) {
      console.error("Import Error:", error);
      toast.error("Error importing contacts");
    }
  };


  return (
    <div className="bg-slate-200 min-h-screen p-6 max-md:p-0 flex justify-center">
      <Toaster position="top-right" />

      <div className="w-full">
        <div className="flex justify-end mb-4">
          <Link
            href="/contact"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            <ArrowLeft size={18} /> Back
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur-lg p-10 w-full rounded-3xl shadow-2xl h-auto">
          <h1 className="text-2xl font-extrabold text-gray-800 mb-8 border-b pb-4">
            Import <span className="text-blue-600">Contacts</span>
          </h1>

          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-lg:grid-cols-2">

            <SingleSelect
              options={Array.isArray(fieldOptions?.Campaign) ? fieldOptions.Campaign : []}
              label="Campaign"
              value={importData.Campaign}
              onChange={(v) => handleSelectChange("Campaign", v)}
              error={errors.Campaign}
            />

            <SingleSelect
              options={Array.isArray(fieldOptions?.ContactType) ? fieldOptions.ContactType : []}
              label="Contact Type"
              value={importData.ContactType}
              onChange={(v) => handleSelectChange("ContactType", v)}
              error={errors.ContactType}
            />

            <SingleSelect
              options={Array.isArray(fieldOptions?.Range) ? fieldOptions.Range : []}
              label="Range"
              value={importData.Range}
              onChange={(v) => handleSelectChange("Range", v)}
              error={errors.Range}
            />

            <FileUpload
              label="Choose Excel File"
              onChange={handleFileChange}
              error={errors.file}
            />
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 w-40 rounded-md font-semibold hover:scale-105 transition-all"
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



// ✅ File Upload Component
const FileUpload = ({ label, onChange, error }: any) => (
  <div className="flex flex-col">
    <label className="font-semibold text-gray-700 mb-2">{label}</label>
    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={onChange}
      className="border border-gray-300 rounded-md p-2"
    />
    {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
  </div>
);
