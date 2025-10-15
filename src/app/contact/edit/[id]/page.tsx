'use client';

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SingleSelect from "@/app/component/SingleSelect";
import toast, { Toaster } from "react-hot-toast";
import DateSelector from "@/app/component/DateSelector";
import { getContact, getContactById, updateContact } from "@/store/contact";
import { contactAllDataInterface } from "@/store/contact.interface";


interface ErrorInterface {
    [key: string]: string;
}

export default function ContactEdit() {
    const { id } = useParams(); 
    const router = useRouter();

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
        date: "",
        AssignTo:""
    });

    const [errors, setErrors] = useState<ErrorInterface>({});
    const [loading, setLoading] = useState(true);

    // Fetch contact by id
    useEffect(() => {
        const fetchContact = async () => {
            const data = await getContactById(id as string);
            if (data) {
                setContactData(data);
                setLoading(false);
                return;
            }
            toast.error("Error fetching contact details");
            setLoading(false);

        };

        if (id) fetchContact();
    }, []);

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
        if (!contactData.Email.trim()) {
            newErrors.Email = "Email is required";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contactData.Email)) {
            newErrors.Email = "Invalid email format";
        }
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            console.log("errors")
            return;
        }

        const payload = { ...contactData };
        if (contactData.date == "") delete (payload as any).date;

        const data = await updateContact(id as string, payload)
        if (data) {
            toast.success("Contact updated successfully!");
            router.push("/contact");
            return;
        }
        toast.error("Failed to updated contact");


    };

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
                    <Link
                        href="/contact"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
                    >
                        <ArrowLeft size={18} /> Back
                    </Link>
                </div>

                <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl h-auto">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-8 text-left border-b pb-4 border-gray-200">
                            <h1 className="text-2xl font-bold text-gray-800 leading-tight tracking-tight">
                                Edit <span className="text-blue-600">Contact</span>
                            </h1>
                        </div>

                        <div className="flex flex-col space-y-6">
                            <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
                                <div className="flex flex-col gap-4">
                                    <SingleSelect options={campaign} value={contactData.Campaign} label="Campaign" onChange={(val) => handleSelectChange("Campaign", val)} />
                                    <InputField label="Contact Name" name="Name" value={contactData.Name} onChange={handleInputChange} error={errors.Name} />
                                    <SingleSelect options={city} value={contactData.City} label="City" onChange={(val) => handleSelectChange("City", val)} />
                                    <SingleSelect options={contactType} value={contactData.ContactType} label="Contact Type" onChange={(val) => handleSelectChange("ContactType", val)} />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <InputField label="Contact No" name="ContactNo" value={contactData.ContactNo} onChange={handleInputChange} />
                                    <SingleSelect options={location} value={contactData.Location} label="Location" onChange={(val) => handleSelectChange("Location", val)} />
                                    <InputField label="Email" name="Email" value={contactData.Email} onChange={handleInputChange} error={errors.Email} />
                                    <InputField label="Company Name" name="CompanyName" value={contactData.CompanyName} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
                                <div className="flex flex-col gap-4">
                                    <InputField label="Website" name="Website" value={contactData.Website} onChange={handleInputChange} />
                                    <SingleSelect options={status} value={contactData.Status} label="Status" onChange={(val) => handleSelectChange("Status", val)} />
                                    <InputField label="Address" name="Address" value={contactData.Address} onChange={handleInputChange} />
                                    <DateSelector
                                        label="Date"
                                        value={contactData.date} // pass current state
                                        onChange={(val) => handleSelectChange("date", val)} // update state on change
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <SingleSelect options={contactIndustry} value={contactData.ContactIndustry} label="Contact Industry" onChange={(val) => handleSelectChange("ContactIndustry", val)} />
                                    <SingleSelect options={contactFunctionalArea} value={contactData.ContactFunctionalArea} label="Contact Functional Area" onChange={(val) => handleSelectChange("ContactFunctionalArea", val)} />
                                    <SingleSelect options={referenceId} value={contactData.ReferenceId} label="Reference Id" onChange={(val) => handleSelectChange("ReferenceId", val)} />
                                    <TextareaField label="Notes" name="Notes" value={contactData.Notes} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-gradient-to-r from-blue-600 to-blue-800 cursor-pointer text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition-all"
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
