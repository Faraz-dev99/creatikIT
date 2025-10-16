'use client'

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SingleSelect from "@/app/component/SingleSelect";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DateSelector from "@/app/component/DateSelector";

interface ErrorInterface {
  [key: string]: string;
}

export default function IncomeMarketingAdd() {
  const [incomeData, setIncomeData] = useState({
    User: "",
    PartyName: "",
    Date: "",
    Income: "",
    PaymentMethod: "",
    Amount: "",
    DueAmount: "",
    Status: "",
  });

  const [errors, setErrors] = useState<ErrorInterface>({});
  const router = useRouter();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setIncomeData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const handleSelectChange = useCallback(
    (label: string, selected: string) => {
      setIncomeData((prev) => ({ ...prev, [label]: selected }));
      setErrors((prev) => ({ ...prev, [label]: "" }));
    },
    []
  );

  const validateForm = () => {
    const newErrors: ErrorInterface = {};
    if (!incomeData.User.trim()) newErrors.User = "User is required";
    if (!incomeData.PartyName.trim()) newErrors.PartyName = "Party Name is required";
    if (!incomeData.Income.trim()) newErrors.Income = "Income is required";
    if (!incomeData.PaymentMethod.trim()) newErrors.PaymentMethod = "Payment Method is required";
    if (!incomeData.Amount.trim()) newErrors.Amount = "Amount is required";
    if (!incomeData.Status.trim()) newErrors.Status = "Status is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    toast.success("Income Marketing added successfully!");
    setIncomeData({
      User: "",
      PartyName: "",
      Date: "",
      Income: "",
      PaymentMethod: "",
      Amount: "",
      DueAmount: "",
      Status: "",
    });
    setErrors({});
    router.push("/income-marketing");
  };

  // Dropdown data
  const users = ["Admin", "Seller", "Visitor"];
  const paymentMethods = ["Cash", "UPI", "Bank Transfer"];
  const statusOptions = ["Paid", "Unpaid", "Partial"];

  return (
    <div className="bg-slate-200 min-h-screen p-6 flex justify-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-[900px]">
        <div className="flex justify-end mb-4">
          <Link
            href="/financial/income_marketings"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            <ArrowLeft size={18} /> Back
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl h-auto">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8 text-left border-b pb-4 border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-800 leading-tight tracking-tight">
                Add <span className="text-blue-600">Income Marketing</span>
              </h1>
            </div>

            <div className="flex flex-col space-y-10">

              {/* IncomeMarketing Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Income Marketing Information</h2>
                <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">

                  <SingleSelect
                    options={users}
                    label="User"
                    value={incomeData.User}
                    onChange={(selected) => handleSelectChange("User", selected)}
                  />

                  <InputField
                    label="Party Name"
                    name="PartyName"
                    value={incomeData.PartyName}
                    onChange={handleInputChange}
                    error={errors.PartyName}
                  />

                  <DateSelector
                    label="Date"
                    value={incomeData.Date}
                    onChange={(val) => handleSelectChange("Date", val)}
                  />

                  <InputField
                    label="Income"
                    name="Income"
                    value={incomeData.Income}
                    onChange={handleInputChange}
                    error={errors.Income}
                  />

                  <SingleSelect
                    options={paymentMethods}
                    label="Payment Method"
                    value={incomeData.PaymentMethod}
                    onChange={(selected) => handleSelectChange("PaymentMethod", selected)}
                  />

                  <InputField
                    label="Amount"
                    name="Amount"
                    value={incomeData.Amount}
                    onChange={handleInputChange}
                    error={errors.Amount}
                  />

                  <InputField
                    label="Due Amount"
                    name="DueAmount"
                    value={incomeData.DueAmount}
                    onChange={handleInputChange}
                  />

                  <SingleSelect
                    options={statusOptions}
                    label="Status"
                    value={incomeData.Status}
                    onChange={(selected) => handleSelectChange("Status", selected)}
                  />

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
