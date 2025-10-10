'use client'
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import Button from '@mui/material/Button';
import MultipleSelect from "@/app/component/MultipleSelect";
import SingleSelect from "@/app/component/SingleSelect";
import DateSelector from "@/app/component/DateSelector";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
interface contactDataInterface {
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
    const [contactData, setContactData] = useState<contactDataInterface>({
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContactData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (label: string, selected: string) => {
        setContactData((prev) => ({ ...prev, [label]: selected }));
    };

    const handleSubmit = async () => {
        console.log("Contact Data Submitted:", contactData);

        try {
            const response = await fetch("https://live-project-backend-viiy-onrender.com/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contactData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Contact successfully saved:", result);

            alert("Contact saved successfully!");
            // Optionally reset form
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
        <div className="flex h-[calc(100vh-56px)] overflow-y-auto bg-gray-200">
            <div className="p-4 max-md:p-3 w-full pb-10 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center gap-4 flex-wrap">
                    <h2 className="flex gap-2 items-center font-light">
                        <span className="text-[#1a2a4f]600">Dashboard</span> /
                        <span className="text-[#1a2a4f]600">Contact</span> /
                        <span>Add</span>
                    </h2>

                    <Link href={"/contact"} className="flex gap-1  items-center py-2 px-2 border border-[#1a2a4f] rounded-md text-[#1a2a4f] hover:bg-[#1a2a4f] hover:text-white transition-all duration-300 cursor-pointer">
                        <ArrowLeft size ={16} />Back
                    </Link>
                </div>

                {/* Form Section */}
                <section className="flex flex-col my-3 mx-3 max-md:mx-0 mt-6 p-3 max-md:p-2 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl p-3 font-bold mb-6">
                        <span className="text-[#1a2a4f]">Add Contact Detail</span>
                    </h2>

                    {/* PERSONAL INFORMATION */}
                    <div className="p-3">
                        <h1 className="text-2xl mb-2">Personal Information</h1>

                        <div className="grid grid-cols-2 gap-3 max-lg:grid-cols-1">
                            <div className="flex flex-col gap-3">
                                <SingleSelect
                                    options={campaign}
                                    label="Campaign"
                                    onChange={(selected) => handleSelectChange("Campaign", selected)}
                                />

                                <label className="relative block w-full">
                                    <input
                                        type="text"
                                        name="Name"
                                        value={contactData.Name}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
                                    />
                                    <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500
                    peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600">
                                        Contact Name
                                    </p>
                                </label>

                                <SingleSelect
                                    options={city}
                                    label="City"
                                    onChange={(selected) => handleSelectChange("City", selected)}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <SingleSelect
                                    options={contactType}
                                    label="Contact Type"
                                    onChange={(selected) => handleSelectChange("ContactType", selected)}
                                />

                                <label className="relative block w-full">
                                    <input
                                        type="text"
                                        name="ContactNo"
                                        value={contactData.ContactNo}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
                                    />
                                    <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500">
                                        Contact No
                                    </p>
                                </label>

                                <SingleSelect
                                    options={location}
                                    label="Location"
                                    onChange={(selected) => handleSelectChange("Location", selected)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ADDITIONAL INFORMATION */}
                    <div className="p-3">
                        <h1 className="text-2xl mb-2">Additional Information</h1>

                        <div className="grid grid-cols-2 gap-3 max-lg:grid-cols-1">
                            <div className="flex flex-col gap-3">
                                <SingleSelect
                                    options={interestedIn}
                                    label="Interested In"
                                    onChange={(selected) => handleSelectChange("InterestedIn", selected)}
                                />

                                <label className="relative block w-full">
                                    <input
                                        type="text"
                                        name="Email"
                                        value={contactData.Email}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
                                    />
                                    <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500">
                                        Email
                                    </p>
                                </label>

                                <label className="relative block w-full">
                                    <input
                                        type="text"
                                        name="CompanyName"
                                        value={contactData.CompanyName}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
                                    />
                                    <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500">
                                        Company Name
                                    </p>
                                </label>

                                <label className="relative block w-full">
                                    <input
                                        type="text"
                                        name="Website"
                                        value={contactData.Website}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
                                    />
                                    <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500">
                                        Website
                                    </p>
                                </label>

                                <SingleSelect
                                    options={status}
                                    label="Status"
                                    onChange={(selected) => handleSelectChange("Status", selected)}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="relative block w-full">
                                    <input
                                        type="text"
                                        name="Address"
                                        value={contactData.Address}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
                                    />
                                    <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500">
                                        Address
                                    </p>
                                </label>

                                <SingleSelect
                                    options={contactIndustry}
                                    label="Contact Industry"
                                    onChange={(selected) => handleSelectChange("ContactIndustry", selected)}
                                />

                                <SingleSelect
                                    options={contactFunctionalArea}
                                    label="Contact Functional Area"
                                    onChange={(selected) => handleSelectChange("ContactFunctionalArea", selected)}
                                />

                                <SingleSelect
                                    options={referenceId}
                                    label="Reference Id"
                                    onChange={(selected) => handleSelectChange("RefrenceId", selected)}
                                />

                                <label className="relative block w-full">
                                    <textarea
                                        name="Notes"
                                        value={contactData.Notes}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
                                    ></textarea>
                                    <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500">
                                        Note
                                    </p>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* SAVE BUTTON */}
                    <div className="w-full flex items-center justify-center mt-10 mb-10">
                        <button
                            onClick={handleSubmit}
                            className="py-2 px-2 w-full max-w-[300px] border border-[#1a2a4f] rounded-md text-[#1a2a4f] hover:bg-[#1a2a4f] hover:text-white transition-all duration-300 cursor-pointer"
                        >
                            Save
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
