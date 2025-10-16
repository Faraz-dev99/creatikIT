'use client'

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SingleSelect from "@/app/component/SingleSelect";
import toast, { Toaster } from "react-hot-toast";
import DateSelector from "@/app/component/DateSelector";
import { useRouter } from "next/navigation";
import { addContact } from "@/store/contact";
import { contactAllDataInterface } from "@/store/contact.interface";

interface ErrorInterface {
  [key: string]: string; // dynamic key type for any field
}

export default function ContactAdd() {
  const [contactData, setContactData] = useState<contactAllDataInterface>({
    Campaign: "",
    Name: "",
    City: "",
    ContactType: "",
    ContactNo: "",
    Location: "",
    Email: "",
    CompanyName: "",
    Website: "",
    Status: "",
    Address: "",
    ContactIndustry: "",
    ContactFunctionalArea: "",
    ReferenceId: "",
    Notes: "",
    date: ""
  });

  const [errors, setErrors] = useState<ErrorInterface>({});
  const router = useRouter();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setContactData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const handleSelectChange = useCallback(
    (label: string, selected: string) => {
      setContactData((prev) => ({ ...prev, [label]: selected }));
      setErrors((prev) => ({ ...prev, [label]: "" }));
    },
    []
  );

  const validateForm = () => {
    const newErrors: ErrorInterface = {};

    if (!contactData.Name.trim()) newErrors.Name = "Name is required";
    if (!contactData.Email.trim()) newErrors.Email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contactData.Email)) newErrors.Email = "Invalid email format";

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = { ...contactData };
    if (contactData.date === "") delete (payload as any).date;

    const data = await addContact(payload);
    if (data) {
      toast.success("Contact added successfully!");
      setContactData({
        Campaign: "",
        Name: "",
        City: "",
        ContactType: "",
        ContactNo: "",
        Location: "",
        Email: "",
        CompanyName: "",
        Website: "",
        Status: "",
        Address: "",
        ContactIndustry: "",
        ContactFunctionalArea: "",
        ReferenceId: "",
        Notes: "",
        date: ""
      });
      setErrors({});
      router.push("/contact");
      return;
    }
    toast.error("Failed to add contact");
  };

  // Dropdown data
  const campaign = ['Buyer', 'Seller', 'Rent Out', 'Rent In', 'Hostel/PG', 'Agents', 'Services', 'Others', 'Guest House', 'Happy Stay'];
  const city = ['Jaipur', 'Ajmer'];
  const contactType = ['Personal', 'Business'];
  const location = ['Location 1', 'Location 2'];
  const contactIndustry = ['IT', 'Finance', 'Real Estate'];
  const contactFunctionalArea = ['HR', 'Sales', 'Tech'];
  const referenceId = ['Ref001', 'Ref002'];
  const status = ['Active', 'Inactive'];

  return (
    <div className="bg-slate-200 min-h-screen p-6 flex justify-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-[900px]">
        <div className="flex justify-end mb-4">
          <Link href="/contact" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all">
            <ArrowLeft size={18} /> Back
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl h-auto">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8 text-left border-b pb-4 border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-800 leading-tight tracking-tight">
                Add <span className="text-blue-600">Contact</span>
              </h1>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
                <div className="flex flex-col gap-4">
                  <SingleSelect options={campaign} label="Campaign" value={contactData.Campaign} onChange={(s) => handleSelectChange("Campaign", s)} />
                  <InputField label="Contact Name" name="Name" value={contactData.Name} onChange={handleInputChange} error={errors.Name} />
                  <SingleSelect options={city} label="City" value={contactData.City} onChange={(s) => handleSelectChange("City", s)} />
                  <SingleSelect options={contactType} label="Contact Type" value={contactData.ContactType} onChange={(s) => handleSelectChange("ContactType", s)} />
                </div>

                <div className="flex flex-col gap-4">
                  <InputField label="Contact No" name="ContactNo" value={contactData.ContactNo} onChange={handleInputChange} />
                  <SingleSelect options={location} label="Location" value={contactData.Location} onChange={(s) => handleSelectChange("Location", s)} />
                  <InputField label="Email" name="Email" value={contactData.Email} onChange={handleInputChange} error={errors.Email} />
                  <InputField label="Company Name" name="CompanyName" value={contactData.CompanyName} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
                <div className="flex flex-col gap-4">
                  <InputField label="Website" name="Website" value={contactData.Website} onChange={handleInputChange} />
                  <SingleSelect options={status} label="Status" value={contactData.Status} onChange={(s) => handleSelectChange("Status", s)} />
                  <InputField label="Address" name="Address" value={contactData.Address} onChange={handleInputChange} />
                  <DateSelector label="Date" value={contactData.date} onChange={(val) => handleSelectChange("date", val)} />
                </div>

                <div className="flex flex-col gap-4">
                  <SingleSelect options={contactIndustry} label="Contact Industry" value={contactData.ContactIndustry} onChange={(s) => handleSelectChange("ContactIndustry", s)} />
                  <SingleSelect options={contactFunctionalArea} label="Contact Functional Area" value={contactData.ContactFunctionalArea} onChange={(s) => handleSelectChange("ContactFunctionalArea", s)} />
                  <SingleSelect options={referenceId} label="Reference Id" value={contactData.ReferenceId} onChange={(s) => handleSelectChange("ReferenceId", s)} />
                  <TextareaField label="Notes" name="Notes" value={contactData.Notes} onChange={handleInputChange} />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition-all">
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

const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
    <p className={`absolute left-2 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      ${value || error ? "-top-2 text-xs text-blue-500" : "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500"}`}>
      {label}
    </p>
    {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
  </label>
);

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
      className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
    ></textarea>
    <p className={`absolute left-2 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      ${value ? "-top-2 text-xs text-blue-500" : "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500"}`}>
      {label}
    </p>
  </label>
);
