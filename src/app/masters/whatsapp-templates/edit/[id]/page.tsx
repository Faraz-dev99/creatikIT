'use client';

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SingleSelect from "@/app/component/SingleSelect";
import toast, { Toaster } from "react-hot-toast";
import { getWhatsappById, updateWhatsapp } from "@/store/masters/whatsapp/whatsapp";
import { whatsappAllDataInterface } from "@/store/masters/whatsapp/whatsapp.interface";

interface ErrorInterface {
  [key: string]: string;
}

export default function WhatsappEdit() {
  const { id } = useParams();
  const router = useRouter();

  const [whatsappData, setWhatsappData] = useState<whatsappAllDataInterface>({
    name: "",
    body: "",
    status: "",
  });

  const [errors, setErrors] = useState<ErrorInterface>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhatsapp = async () => {
      try {
        const data = await getWhatsappById(id as string);
        if (data) {
          setWhatsappData(data);
        } else {
          toast.error("Template not found");
        }
      } catch (error) {
        toast.error("Error fetching WhatsApp template details");
        console.error("Fetch Whatsapp Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchWhatsapp();
  }, [id]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setWhatsappData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const handleSelectChange = useCallback((label: string, selected: string) => {
    setWhatsappData((prev) => ({ ...prev, [label]: selected }));
    setErrors((prev) => ({ ...prev, [label]: "" }));
  }, []);

  const validateForm = () => {
    const newErrors: ErrorInterface = {};
    if (!whatsappData.name.trim()) newErrors.name = "Template name is required";
    if (!whatsappData.body.trim()) newErrors.body = "Body is required";
    if (!whatsappData.status.trim()) newErrors.status = "Status is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await updateWhatsapp(id as string, whatsappData);
      if (result) {
        toast.success("WhatsApp Template updated successfully!");
        router.push("/masters/whatsapp-templates");
      } else {
        toast.error("Failed to update WhatsApp template");
      }
    } catch (error) {
      toast.error("Failed to update WhatsApp template");
      console.error("Update Whatsapp Error:", error);
    }
  };

  const statusOptions = ["Active", "Inactive"];

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading template details...
      </div>
    );

  return (
    <div className="bg-slate-200 min-h-screen p-6 flex justify-center">
      <Toaster position="top-right" />
      <div className="w-full">
        <div className="flex justify-end mb-4">
          <Link
            href="/masters/whatsapp-templates"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            <ArrowLeft size={18} /> Back
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur-lg p-10 w-full rounded-3xl shadow-2xl">
          <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <div className="mb-8 text-left border-b pb-4 border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-800 leading-tight tracking-tight">
                Edit <span className="text-blue-600">WhatsApp Template</span>
              </h1>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
                <InputField
                  label="Template Name"
                  name="name"
                  value={whatsappData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                />

                <SingleSelect
                  options={statusOptions}
                  label="status"
                  value={whatsappData.status}
                  onChange={(v) => handleSelectChange("status", v)}
                />
              </div>

              <TextAreaField
                label="Body"
                name="body"
                value={whatsappData.body}
                onChange={handleInputChange}
                error={errors.body}
              />

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition-all"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// 🟩 Input Field
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
        ${error ? "border-red-500" : "border-gray-400 focus:border-blue-500"}`}
    />
    <p
      className={`absolute left-2 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      ${
        value || error
          ? "-top-2 text-xs text-blue-600"
          : "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600"
      }`}
    >
      {label}
    </p>
    {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
  </label>
);

// 🟩 Textarea Field
const TextAreaField: React.FC<{
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ label, name, value, onChange, error }) => (
  <label className="relative block w-full col-span-2">
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      rows={5}
      className={`peer w-full border rounded-sm bg-transparent py-3 px-4 outline-none resize-none
        ${error ? "border-red-500" : "border-gray-400 focus:border-blue-500"}`}
    />
    <p
      className={`absolute left-2 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      ${
        value || error
          ? "-top-2 text-xs text-blue-600"
          : "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600"
      }`}
    >
      {label}
    </p>
    {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
  </label>
);
