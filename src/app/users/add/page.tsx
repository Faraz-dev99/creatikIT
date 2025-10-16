'use client'

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SingleSelect from "@/app/component/SingleSelect";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ErrorInterface {
  [key: string]: string;
}

export default function UserAdd() {
  const [userData, setUserData] = useState({
    Role: "",
    FirstName: "",
    MiddleName: "",
    Email: "",
    MobileNumber: "",
    City: "",
    Password: "",
    Status: "",
    AddressLine1: "",
    AddressLine2: "",
  });

  const [errors, setErrors] = useState<ErrorInterface>({});
  const router = useRouter();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setUserData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const handleSelectChange = useCallback(
    (label: string, selected: string) => {
      setUserData((prev) => ({ ...prev, [label]: selected }));
      setErrors((prev) => ({ ...prev, [label]: "" }));
    },
    []
  );

  const validateForm = () => {
    const newErrors: ErrorInterface = {};
    if (!userData.FirstName.trim()) newErrors.FirstName = "First Name is required";
    if (!userData.Email.trim()) newErrors.Email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.Email)) newErrors.Email = "Invalid email format";
    if (!userData.Password.trim()) newErrors.Password = "Password is required";
    if (!userData.Role.trim()) newErrors.Role = "Role is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    toast.success("User added successfully!");
    setUserData({
      Role: "",
      FirstName: "",
      MiddleName: "",
      Email: "",
      MobileNumber: "",
      City: "",
      Password: "",
      Status: "",
      AddressLine1: "",
      AddressLine2: "",
    });
    setErrors({});
    router.push("/user");
  };

  // Dropdown data
  const roles = ["Admin", "Seller", "Visitor"];
  const statusOptions = ["Active", "Inactive"];
  const cities = ["Jaipur", "Ajmer", "Udaipur"];

  return (
    <div className="bg-slate-200 min-h-screen p-6 flex justify-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-[900px]">
        <div className="flex justify-end mb-4">
          <Link
            href="/user"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            <ArrowLeft size={18} /> Back
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl h-auto">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8 text-left border-b pb-4 border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-800 leading-tight tracking-tight">
                Add <span className="text-blue-600">User</span>
              </h1>
            </div>

            <div className="flex flex-col space-y-10">

              {/* USER LEVEL */}
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">User Level</h2>
                <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
                  <SingleSelect
                    options={roles}
                    label="Role"
                    value={userData.Role}  // ✅ controlled value
                    onChange={(selected) => handleSelectChange("Role", selected)}
                  />
                </div>
              </div>

              {/* PERSONAL INFORMATION */}
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
                <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
                  <InputField label="First Name" name="FirstName" value={userData.FirstName} onChange={handleInputChange} error={errors.FirstName} />
                  <InputField label="Middle Name" name="MiddleName" value={userData.MiddleName} onChange={handleInputChange} />
                  <InputField label="Email" name="Email" value={userData.Email} onChange={handleInputChange} error={errors.Email} />
                  <InputField label="Mobile Number" name="MobileNumber" value={userData.MobileNumber} onChange={handleInputChange} />
                  <SingleSelect
                    options={cities}
                    label="City"
                    value={userData.City}  // ✅ controlled value
                    onChange={(selected) => handleSelectChange("City", selected)}
                  />
                  <InputField label="Password" name="Password" value={userData.Password} onChange={handleInputChange} error={errors.Password} />
                  <SingleSelect
                    options={statusOptions}
                    label="Status"
                    value={userData.Status}  // ✅ controlled value
                    onChange={(selected) => handleSelectChange("Status", selected)}
                  />
                </div>
              </div>

              {/* ADDRESS INFORMATION */}
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Address Information</h2>
                <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
                  <InputField label="Address Line 1" name="AddressLine1" value={userData.AddressLine1} onChange={handleInputChange} />
                  <InputField label="Address Line 2" name="AddressLine2" value={userData.AddressLine2} onChange={handleInputChange} />
                </div>
              </div>

              <div className="flex justify-end mt-6">
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
    <p
      className={`absolute left-2 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      ${value || error
        ? "-top-2 text-xs text-blue-500"
        : "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500"}`}
    >
      {label}
    </p>
    {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
  </label>
);
