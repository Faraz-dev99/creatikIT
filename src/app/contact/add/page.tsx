'use client'

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SingleSelect from "@/app/component/SingleSelect";

interface ContactDataInterface {
  Campaign: string;
  Name: string;
  City: string;
  ContactType: string;
  ContactNo: string;
  Location: string;
  Email: string;
  CompanyName: string;
  Website: string;
  Status: string;
  Address: string;
  ContactIndustry: string;
  ContactFunctionalArea: string;
  RefrenceId: string;
  Notes: string;
}

export default function ContactAdd() {
  const [contactData, setContactData] = useState<ContactDataInterface>({
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
    RefrenceId: "",
    Notes: ""
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setContactData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSelectChange = useCallback(
    (label: string, selected: string) => {
      setContactData((prev) => ({ ...prev, [label]: selected }));
    },
    []
  );

  const handleSubmit = async () => {
    console.log("Contact Data Submitted:", contactData);

    try {
      const response = await fetch("https://live-project-backend-viiy-onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      console.log("Contact successfully saved:", result);

      alert("Contact saved successfully!");
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
        RefrenceId: "",
        Notes: ""
      });
    } catch (error) {
      console.error("Error saving contact:", error);
      alert("Failed to save contact. Please try again later.");
    }
  };

  // Dropdown data
  const campaign = ['Buyer', 'Seller', 'Rent Out', 'Rent In', 'Hostel/PG', 'Agents', 'Services', 'Others', 'Guest House', 'Happy Stay'];
  const city = ['Jaipur', 'Ajmer'];
  const contactType = ['Personal', 'Business'];
  const location = ['Location 1', 'Location 2'];
  const interestedIn = ['Something', 'Something Else'];
  const contactIndustry = ['IT', 'Finance', 'Real Estate'];
  const contactFunctionalArea = ['HR', 'Sales', 'Tech'];
  const referenceId = ['Ref001', 'Ref002'];
  const status = ['Active', 'Inactive'];

  return (
    <div className="bg-slate-200 min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-[900px]">
        {/* Back Button */}
        <div className="flex justify-end mb-4">
          <Link
            href="/contact"
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
                Add <span className="text-blue-600">Contact</span>
              </h1>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
                <div className="flex flex-col gap-4">
                  <SingleSelect options={campaign} label="Campaign" onChange={(selected) => handleSelectChange("Campaign", selected)} />
                  <InputField label="Contact Name" name="Name" value={contactData.Name} onChange={handleInputChange} />
                  <SingleSelect options={city} label="City" onChange={(selected) => handleSelectChange("City", selected)} />
                  <SingleSelect options={contactType} label="Contact Type" onChange={(selected) => handleSelectChange("ContactType", selected)} />
                </div>

                <div className="flex flex-col gap-4">
                  <InputField label="Contact No" name="ContactNo" value={contactData.ContactNo} onChange={handleInputChange} />
                  <SingleSelect options={location} label="Location" onChange={(selected) => handleSelectChange("Location", selected)} />
                  <InputField label="Email" name="Email" value={contactData.Email} onChange={handleInputChange} />
                  <InputField label="Company Name" name="CompanyName" value={contactData.CompanyName} onChange={handleInputChange} />
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
                <div className="flex flex-col gap-4">
                  <InputField label="Website" name="Website" value={contactData.Website} onChange={handleInputChange} />
                  <SingleSelect options={status} label="Status" onChange={(selected) => handleSelectChange("Status", selected)} />
                  <InputField label="Address" name="Address" value={contactData.Address} onChange={handleInputChange} />
                </div>

                <div className="flex flex-col gap-4">
                  <SingleSelect options={contactIndustry} label="Contact Industry" onChange={(selected) => handleSelectChange("ContactIndustry", selected)} />
                  <SingleSelect options={contactFunctionalArea} label="Contact Functional Area" onChange={(selected) => handleSelectChange("ContactFunctionalArea", selected)} />
                  <SingleSelect options={referenceId} label="Reference Id" onChange={(selected) => handleSelectChange("RefrenceId", selected)} />
                  <TextareaField label="Notes" name="Notes" value={contactData.Notes} onChange={handleInputChange} />
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
      className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
    ></textarea>
    <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500">{label}</p>
  </label>
);
