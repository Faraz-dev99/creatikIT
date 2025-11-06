"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import SingleSelect from "@/app/component/SingleSelect";
import DateSelector from "@/app/component/DateSelector";
import toast, { Toaster } from "react-hot-toast";
import { getCustomerById, updateCustomer } from "@/store/customer";
import { customerAllDataInterface } from "@/store/customer.interface";
import { handleFieldOptions } from "@/app/utils/handleFieldOptions";
import { getCampaign } from "@/store/masters/campaign/campaign";
import { getTypes } from "@/store/masters/types/types";
import { getSubtype } from "@/store/masters/subtype/subtype";
import { getLocation } from "@/store/masters/location/location";
import { getCity } from "@/store/masters/city/city";
import { getFacilities } from "@/store/masters/facilities/facilities";

interface ErrorInterface {
  [key: string]: string;
}

export default function CustomerEdit() {
  const { id } = useParams();
  const router = useRouter();

  const [customerData, setCustomerData] = useState<customerAllDataInterface>({
    Campaign: "",
    CustomerType: "",
    customerName: "",
    CustomerSubtype: "",
    ContactNumber: "",
    City: "",
    Location: "",
    Area: "",
    Address: "",
    Email: "",
    Facilities: "",
    ReferenceId: "",
    CustomerId: "",
    CustomerDate: "",
    CustomerYear: "",
    Others: "",
    Description: "",
    Video: "",
    GoogleMap: "",
    Verified: "",
    CustomerImage: [],
    SitePlan: {} as File,
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [sitePlanPreview, setSitePlanPreview] = useState<string>("");
  const [errors, setErrors] = useState<ErrorInterface>({});
  const [loading, setLoading] = useState(true);
  const [fieldOptions, setFieldOptions] = useState<Record<string, any[]>>({});

  // ✅ Track deleted existing images separately
  const [removedCustomerImages, setRemovedCustomerImages] = useState<string[]>([]);
  const [removedSitePlans, setRemovedSitePlans] = useState<string[]>([]);

  // Fetch existing customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getCustomerById(id as string);
        if (!data) {
          toast.error("Customer not found");
          return;
        }
        console.log("customer ", data);
        // Just set the fetched data
        setCustomerData({
          ...data,
          CustomerImage: [], // no files yet, only local uploads go here
          SitePlan: {} as File, // same, user can manually upload
        });

        // Preview URLs for already existing images
        setImagePreviews(Array.isArray(data.CustomerImage) ? data.CustomerImage : []);

        // Show site plan if it exists

        setSitePlanPreview(data.SitePlan);
      } catch (error) {
        toast.error("Error fetching customer");
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCustomer();
    if (id) fetchFields();

    
  }, [id]);

  useEffect(()=>{
console.log("filed optoins ", fieldOptions.Location,dropdownOptions)
  },[fieldOptions])

  // Input change handlers
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCustomerData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const handleSelectChange = useCallback((label: string, selected: string) => {
    setCustomerData((prev) => ({ ...prev, [label]: selected }));
    setErrors((prev) => ({ ...prev, [label]: "" }));
  }, []);

  // File upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const files = e.target.files;
    if (!files) return;

    if (field === "CustomerImage") {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setCustomerData((prev) => ({
        ...prev,
        CustomerImage: [...prev.CustomerImage, ...newFiles],
      }));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    } else if (field === "SitePlan") {
      const file = files[0];
      setCustomerData((prev) => ({ ...prev, SitePlan: file }));
      setSitePlanPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Remove image (and mark for backend deletion if it was an existing URL)
  const handleRemoveImage = (index: number) => {
    setCustomerData((prev) => ({
      ...prev,
      CustomerImage: prev.CustomerImage.filter((_, i) => i !== index),
    }));

    setImagePreviews((prev) => {
      const removedUrl = prev[index];

      // ✅ Move this OUTSIDE of setImagePreviews callback to avoid double runs
      if (removedUrl.startsWith("http")) {
        setRemovedCustomerImages((prevDel) => {
          // ✅ Prevent duplicates explicitly
          if (!prevDel.includes(removedUrl)) {
            return [...prevDel, removedUrl];
          }
          return prevDel;
        });
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  // ✅ Remove site plan
  const handleRemoveSitePlan = () => {
    if (sitePlanPreview.length > 0 && sitePlanPreview[0]?.startsWith("http")) {
      setRemovedSitePlans((prev) => [...prev, sitePlanPreview[0]]);
    }
    setCustomerData((prev) => ({ ...prev, SitePlan: {} as File }));
    setSitePlanPreview("");
  };

  // Validation
  const validateForm = () => {
    const newErrors: ErrorInterface = {};
    if (!customerData?.customerName?.trim()) newErrors.CustomerName = "Customer Name is required";
    if (
      customerData?.Email?.trim() &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(customerData.Email)
    )
      newErrors.Email = "Invalid email format";
    if (!customerData?.ContactNumber?.trim())
      newErrors.ContactNumber = "Contact No is required";
    return newErrors;
  };

  const fetchFields = async () => {
    await handleFieldOptions(
      [
        { key: "StatusAssign", staticData: ["Assigned", "Unassigned"] },
        { key: "Campaign", fetchFn: getCampaign },
        { key: "CustomerType", fetchFn: getTypes },
        { key: "CustomerSubtype", fetchFn: getSubtype },
        { key: "City", fetchFn: getCity },
        { key: "Location", fetchFn: getLocation },
        { key: "Facilities", fetchFn: getFacilities},
        { key: "User", staticData: ["Admin", "Agent1", "Agent2"] },
        { key: "Verified", staticData: ["yes", "no"] },
      ],
      setFieldOptions
    );
  }

  // ✅ Submit data correctly as FormData
  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formData = new FormData();

      // Append normal fields
      if (customerData.Campaign) formData.append("Campaign", customerData.Campaign);
      if (customerData.CustomerType) formData.append("CustomerType", customerData.CustomerType);
      if (customerData.customerName) formData.append("customerName", customerData.customerName);
      if (customerData.CustomerSubtype) formData.append("CustomerSubType", customerData.CustomerSubtype);
      if (customerData.ContactNumber) formData.append("ContactNumber", customerData.ContactNumber);
      if (customerData.City) formData.append("City", customerData.City);
      if (customerData.Location) formData.append("Location", customerData.Location);
      if (customerData.Area) formData.append("Area", customerData.Area);
      if (customerData.Address) formData.append("Adderess", customerData.Address);
      if (customerData.Email) formData.append("Email", customerData.Email);
      if (customerData.Facilities) formData.append("Facillities", customerData.Facilities);
      if (customerData.ReferenceId) formData.append("ReferenceId", customerData.ReferenceId);
      if (customerData.CustomerId) formData.append("CustomerId", customerData.CustomerId);
      if (customerData.CustomerDate) formData.append("CustomerDate", customerData.CustomerDate);
      if (customerData.CustomerYear) formData.append("CustomerYear", customerData.CustomerYear);
      if (customerData.Others) formData.append("Other", customerData.Others);
      if (customerData.Description) formData.append("Description", customerData.Description);
      if (customerData.Video) formData.append("Video", customerData.Video);
      if (customerData.GoogleMap) formData.append("GoogleMap", customerData.GoogleMap);
      if (customerData.Verified) formData.append("Verified", customerData.Verified);

      // ✅ Append files correctly
      if (Array.isArray(customerData.CustomerImage)) {
        customerData.CustomerImage.forEach((file) => formData.append("CustomerImage", file));
      }

      if (customerData.SitePlan && (customerData.SitePlan as any).name) {
        formData.append("SitePlan", customerData.SitePlan);
      }

      // ✅ Add deletion info
      formData.append("removedCustomerImages", JSON.stringify(removedCustomerImages));
      formData.append("removedSitePlans", JSON.stringify(removedSitePlans));

      // Handle full deletion (when user removes all)
      /*  if (customerData.CustomerImage.length === 0)
         formData.append("CustomerImage", JSON.stringify([]));
       if (!sitePlanPreview)
         formData.append("SitePlan", JSON.stringify([])); */

      //console.log("FormData entries:");
      /*  for (let pair of formData.entries()) {
         //console.log(pair[0], pair[1]);
       } */

      console.log(" Form data before Submission ", removedCustomerImages);
      const result = await updateCustomer(id as string, formData);

      if (result) {
        toast.success("Customer updated successfully!");
        router.push("/customer");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Error updating customer");
      console.error("Update Error:", error);
    }
  };

  const dropdownOptions = ["Option1", "Option2", "Option3"];
  if (loading) return null;

  return (
    <div className="bg-slate-200 min-h-screen p-6 flex justify-center">
      <Toaster position="top-right" />
      <div className="w-full">
        <div className="flex justify-end mb-4">
          <Link
            href="/customer"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            <ArrowLeft size={18} /> Back
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur-lg p-10 w-full rounded-3xl shadow-2xl h-auto">
          <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <div className="mb-8 text-left border-b pb-4 border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-800 leading-tight tracking-tight">
                Edit <span className="text-blue-600">Customer Information</span>
              </h1>
            </div>

            <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
              <SingleSelect options={Array.isArray(fieldOptions?.Campaign)?fieldOptions.Campaign:[]} label="Campaign" value={customerData.Campaign} onChange={(v) => handleSelectChange("Campaign", v)} />
              <SingleSelect options={Array.isArray(fieldOptions?.CustomerType)?fieldOptions.CustomerType:[]} label="Customer Type" value={customerData.CustomerType} onChange={(v) => handleSelectChange("CustomerType", v)} />
              <InputField label="Customer Name" name="CustomerName" value={customerData.customerName} onChange={handleInputChange} error={errors.CustomerName} />
              <InputField label="Contact No" name="ContactNumber" value={customerData.ContactNumber} onChange={handleInputChange} error={errors.ContactNumber} />
              <SingleSelect options={Array.isArray(fieldOptions?.City)?fieldOptions.City:[]} label="City" value={customerData.City} onChange={(v) => handleSelectChange("City", v)} />
              <SingleSelect options={dropdownOptions} label="Location" value={customerData.Location} onChange={(v) => handleSelectChange("Location", v)} />
              <InputField label="Area" name="Area" value={customerData.Area} onChange={handleInputChange} />
              <InputField label="Address" name="Address" value={customerData.Address} onChange={handleInputChange} />
              <InputField label="Email" name="Email" value={customerData.Email} onChange={handleInputChange} error={errors.Email} />
              <SingleSelect options={Array.isArray(fieldOptions?.Facilities)?fieldOptions.Facilities:[]} label="Facilities" value={customerData.Facilities} onChange={(v) => handleSelectChange("Facilities", v)} />
              <InputField label="Reference ID" name="ReferenceId" value={customerData.ReferenceId} onChange={handleInputChange} />
              <InputField label="Customer ID" name="CustomerId" value={customerData.CustomerId} onChange={handleInputChange} />
              <DateSelector label="Customer Date" value={customerData.CustomerDate} onChange={(val) => handleSelectChange("CustomerDate", val)} />
              <InputField label="Customer Year" name="CustomerYear" value={customerData.CustomerYear} onChange={handleInputChange} />
              <InputField label="Others" name="Others" value={customerData.Others} onChange={handleInputChange} />
              <InputField label="Description" name="Description" value={customerData.Description} onChange={handleInputChange} />
              <InputField label="Video" name="Video" value={customerData.Video} onChange={handleInputChange} />
              <InputField label="Google Map" name="GoogleMap" value={customerData.GoogleMap} onChange={handleInputChange} />
              <SingleSelect options={Array.isArray(fieldOptions?.Verified)?fieldOptions.Verified:[]} label="Verified" value={customerData.Verified} onChange={(v) => handleSelectChange("Verified", v)} />
              <FileUpload label="Customer Images" multiple onChange={(e) => handleFileChange(e, "CustomerImage")} previews={imagePreviews} onRemove={handleRemoveImage} />
              <FileUpload label="Site Plan" onChange={(e) => handleFileChange(e, "SitePlan")} previews={sitePlanPreview.length > 0 ? [sitePlanPreview] : []} onRemove={() => handleRemoveSitePlan()} />
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition-all"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// InputField, TextareaField, and FileUpload components remain unchanged


// Input field component
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

// Textarea field
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
    <p className={`absolute left-2 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      ${value ? "-top-2 text-xs text-blue-500" : "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500"}`}>
      {label}
    </p>
  </label>
);

// File upload with preview and remove
const FileUpload: React.FC<{
  label: string;
  multiple?: boolean;
  previews?: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: (index: number) => void;
}> = ({ label, multiple, previews = [], onChange, onRemove }) => (
  <div className="flex flex-col">
    <label className="font-semibold text-gray-700 mb-2">{label}</label>
    <input
      type="file"
      multiple={multiple}
      onChange={onChange}
      className="border border-gray-300 rounded-md p-2"
    />
    {previews.length > 0 && (
      <div className="flex flex-wrap gap-3 mt-3">
        {previews.map((src, index) => (
          <div key={index} className="relative">
            <img
              src={src}
              alt={`preview-${index}`}
              className="w-24 h-24 object-cover rounded-md border"
            />
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-[-8px] right-[-8px] bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);
