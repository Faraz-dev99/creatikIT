"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SingleSelect from "@/app/component/SingleSelect";
import toast, { Toaster } from "react-hot-toast";
import DateSelector from "@/app/component/DateSelector";
import { useRouter } from "next/navigation";
import { addContactFollowup } from "@/store/contactFollowups";
import { ContactFollowupInterface } from "@/store/contactFollows.Interface";

interface ErrorInterface {
  [key: string]: string;
}

export default function ContactFollowupAdd() {
  const [contactFollowupData, setContactFollowupData] =
    useState<ContactFollowupInterface>({
      Campaign: "",
      Range: "",
      ContactNo: "",
      Location: "",
      ContactType: "",
      Name: "",
      City: "",
      Address: "",
      ContactIndustry: "",
      ContactFunctionalArea: "",
      ReferenceId: "",
      Notes: "",
      Facilities: "",
      User: "",
      date: "",
      Email: "",
      CompanyName: "",
      Website: "",
      Status: "",
    });

  const [errors, setErrors] = useState<ErrorInterface>({});
  const router = useRouter();

  // input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setContactFollowupData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  // select change handler
  const handleSelectChange = useCallback((label: string, selected: string) => {
    setContactFollowupData((prev) => ({ ...prev, [label]: selected }));
    setErrors((prev) => ({ ...prev, [label]: "" }));
  }, []);

  // validation
  const validateForm = () => {
    const newErrors: ErrorInterface = {};

    if (!contactFollowupData.Name.trim()) {
      newErrors.Name = "Name is required";
    }

    if (!contactFollowupData.Email.trim()) {
      newErrors.Email = "Email is required";
    } else if (
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contactFollowupData.Email)
    ) {
      newErrors.Email = "Invalid email format";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = { ...contactFollowupData };
    if (contactFollowupData.date === "") delete (payload as any).date;

    const data = await addContactFollowup(payload);

    if (data) {
      toast.success("Follow-up added successfully!");
      setContactFollowupData({
        Campaign: "",
        Range: "",
        ContactNo: "",
        Location: "",
        ContactType: "",
        Name: "",
        City: "",
        Address: "",
        ContactIndustry: "",
        ContactFunctionalArea: "",
        ReferenceId: "",
        Notes: "",
        Facilities: "",
        User: "",
        date: "",
        Email: "",
        CompanyName: "",
        Website: "",
        Status: "",
      });
      setErrors({});
      router.push("/followups/contact");
    } else {
      toast.error("Failed to add follow-up");
    }
  };

  // Dropdown data (adjust as needed)
  const campaign = ["Lead Nurture", "Product Promotion", "Re-engagement"];
  const range = ["High Value", "Medium Value", "Low Value"];
  const contactType = ["Buyer", "Seller", "Agent"];
  const city = ["Mumbai", "Pune", "Delhi"];
  const location = ["Andheri", "Bandra", "Thane"];
  const contactIndustry = ["Real Estate", "Finance", "Tech"];
  const contactFunctionalArea = ["Sales", "Support", "Marketing"];
  const status = ["Active", "Inactive"];
  const referenceId = ["REF001", "REF002"];
  const facilities = ["Gym", "Pool", "Parking"];
  const user = ["Agent001", "Agent007", "Manager01"];

  return (
    <div className="bg-slate-200 min-h-screen p-6 flex justify-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-[900px]">
        <div className="flex justify-end mb-4">
          <Link
            href="/contactfollowup"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            <ArrowLeft size={18} /> Back
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl h-auto">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8 text-left border-b pb-4 border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-800 leading-tight tracking-tight">
                Add <span className="text-blue-600">Contact Follow-Up</span>
              </h1>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
                <div className="flex flex-col gap-4">
                  <SingleSelect
                    options={campaign}
                    label="Campaign"
                    onChange={(selected) =>
                      handleSelectChange("Campaign", selected)
                    }
                  />
                  <SingleSelect
                    options={range}
                    label="Range"
                    onChange={(selected) => handleSelectChange("Range", selected)}
                  />
                  <InputField
                    label="Contact No"
                    name="ContactNo"
                    value={contactFollowupData.ContactNo}
                    onChange={handleInputChange}
                  />
                  <SingleSelect
                    options={location}
                    label="Location"
                    onChange={(selected) =>
                      handleSelectChange("Location", selected)
                    }
                  />
                  <SingleSelect
                    options={contactType}
                    label="Contact Type"
                    onChange={(selected) =>
                      handleSelectChange("ContactType", selected)
                    }
                  />
                  <SingleSelect
                    options={status}
                    label="Status"
                    onChange={(selected) =>
                      handleSelectChange("Status", selected)
                    }
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <InputField
                    label="Name"
                    name="Name"
                    value={contactFollowupData.Name}
                    onChange={handleInputChange}
                    error={errors.Name}
                  />
                  <SingleSelect
                    options={city}
                    label="City"
                    onChange={(selected) => handleSelectChange("City", selected)}
                  />
                  <InputField
                    label="Email"
                    name="Email"
                    value={contactFollowupData.Email}
                    onChange={handleInputChange}
                    error={errors.Email}
                  />
                  <InputField
                    label="Company Name"
                    name="CompanyName"
                    value={contactFollowupData.CompanyName}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Website"
                    name="website"
                    value={contactFollowupData.Website}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Address"
                    name="Address"
                    value={contactFollowupData.Address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
                <div className="flex flex-col gap-4">
                  <SingleSelect
                    options={contactIndustry}
                    label="Contact Industry"
                    onChange={(selected) =>
                      handleSelectChange("ContactIndustry", selected)
                    }
                  />
                  <SingleSelect
                    options={contactFunctionalArea}
                    label="Contact Functional Area"
                    onChange={(selected) =>
                      handleSelectChange("ContactFunctionalArea", selected)
                    }
                  />
                  <SingleSelect
                    options={referenceId}
                    label="Reference Id"
                    onChange={(selected) =>
                      handleSelectChange("ReferenceId", selected)
                    }
                  />
                  <SingleSelect
                    options={facilities}
                    label="Facilities"
                    onChange={(selected) =>
                      handleSelectChange("Facilities", selected)
                    }
                  />
                  <SingleSelect
                    options={user}
                    label="User"
                    onChange={(selected) => handleSelectChange("User", selected)}
                  />
                  <DateSelector
                    label="Date"
                    value={contactFollowupData.date}
                    onChange={(val) => handleSelectChange("date", val)}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <TextareaField
                    label="Notes"
                    name="Notes"
                    value={contactFollowupData.Notes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

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

const InputField = ({
  label,
  name,
  value,
  error,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => (
  <label className="relative block w-full">
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      className={`peer w-full border rounded-sm bg-transparent py-3 px-4 outline-none 
        ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-400 focus:border-blue-500"
        }`}
    />
    <p
      className={`absolute left-2 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      ${
        value || error
          ? "-top-2 text-xs text-blue-500"
          : "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500"
      }`}
    >
      {label}
    </p>
    {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
  </label>
);

const TextareaField = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => (
  <label className="relative block w-full">
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
    ></textarea>
    <p
      className={`absolute left-2 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      ${
        value
          ? "-top-2 text-xs text-blue-500"
          : "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500"
      }`}
    >
      {label}
    </p>
  </label>
);
