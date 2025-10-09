'use client'
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import Button from '@mui/material/Button';
import MultipleSelect from "@/app/component/MultipleSelect";
import SingleSelect from "@/app/component/SingleSelect";
import DateSelector from "@/app/component/DateSelector";

interface contactDataInterface{
    Campaign:string,
    Name:string,
    City:string,
    ContactType:string,
    ContactNo:string,
    Location:string,
    Email:string,
    CompanyName:string,
    Website:string,
    Status:string,
    Address:string,
    ContactIndustry:string,
    ContactFunctionalArea:string,
    RefrenceId:string,
    Notes:string
}
export default function contactAdd() {
    const [toggleSearchDropdown, setToggleSearchDropdown] = useState(false);
    const [currentTablePage, setCurrentTablePage] = useState(1);
    const rowsPerTablePage = 4;
    const customerData = [
        {
            campaign: 'Summer Sale',
            type: 'Promotional',
            subType: 'Email Blast',
            email: 'example@mail.com',
            city: 'New York',
            location: 'Downtown',
            contact: '123-456-7890',
            assignTo: 'John Doe',
            date: '2025-10-04',
        },

    ];

    const totalTablePages = Math.ceil(customerData.length / rowsPerTablePage);
    const indexOfLastRow = currentTablePage * rowsPerTablePage;
    const indexOfFirstRow = indexOfLastRow - rowsPerTablePage;
    const currentRows = customerData.slice(indexOfFirstRow, indexOfLastRow);
    const nexttablePage = () => {
        if (currentTablePage !== totalTablePages) {
            setCurrentTablePage(currentTablePage + 1);
        }
    }
    const prevtablePage = () => {
        if (currentTablePage !== 1) {
            setCurrentTablePage(currentTablePage - 1);
        }
    }
    const handleSearchDropdown = () => {

    }



    const statusAssign = [
        'assigned',
        'unassigned',
    ];

    const city = [
        'jaiput',
        'ajmer'
    ]
    const campaign = [
        'Buyer',
        'seller',
        'Rent Out',
        'Rent In',
        'Hostel/PG',
        'Agents',
        'Services',
        'Others',
        'guest house',
        'Happy Stay'
    ]

    const handleSelectChange = (selected: string) => {
        console.log("Selected items:", selected);
    };

    const owners = [
        "john",
        "Job Seeker",
        "training",
        "job provider"
    ]

    return <div className="flex h-[calc(100vh-56px)] overflow-y-auto bg-gray-200">
        <div className="p-4 max-md:p-3 w-full pb-10 overflow-y-auto">
            <div className=" flex justify-between items-center gap-4 flex-wrap">
                <h2 className=" flex gap-2 items-center font-light">
                    <span className=" text-teal-600 ">Dashboard</span>/
                    <span className=" text-teal-600 ">OWNER Provider</span>/
                    <span>Add</span>
                </h2>

                <button className=" py-2 px-2 border border-teal-500 rounded-md text-teal-500  hover:bg-teal-500 hover:text-white transition-all duration-300 cursor-pointer">Back</button>
            </div>

            <section className=" flex flex-col my-3 mx-3 max-md:mx-0  mt-6  p-3 max-md:p-2 mb bg-white rounded-lg shadow-sm">

                <h2 className=" text-xl p-3 font-bold mb-6">
                    <span className=" text-teal-500">Add Contact Detail</span>
                </h2>

                <div className=" p-3">
                    <h1 className=" text-2xl mb-2">Personal Information</h1>

                    <div className="grid grid-cols-2 gap-3 max-lg:grid-cols-1">
                        <div className="flex flex-col gap-3">
                            <SingleSelect options={owners} label="Compaign" onChange={handleSelectChange} />
                            <label className="relative block w-full">
                                <input
                                    type="text"
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


                            <SingleSelect options={owners} label="City" onChange={handleSelectChange} />

                        </div>

                        <div className="flex flex-col gap-3">
                            <SingleSelect options={owners} label="Contact Type" onChange={handleSelectChange} />
                            <label className="relative block w-full">
                                <input
                                    type="text"
                                    placeholder=" "
                                    className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
                                />
                                <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500
        peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600">
                                    Contact No
                                </p>
                            </label>
                            <SingleSelect options={owners} label="Location" onChange={handleSelectChange} />

                        </div>
                    </div>



                </div>
                <div className=" p-3">
                    <h1 className=" text-2xl mb-2">Additional Information</h1>

                    <div className="grid grid-cols-2 gap-3 max-lg:grid-cols-1">
                        <div className="flex flex-col gap-3">
                            <SingleSelect options={owners} label="Interested In" onChange={handleSelectChange} />
                            <label className="relative block w-full">
                                <input
                                    type="text"
                                    placeholder=" "
                                    className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
                                />
                                <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500
        peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600">
                                    Email
                                </p>
                            </label>
                            <label className="relative block w-full">
                                <input
                                    type="text"
                                    placeholder=" "
                                    className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
                                />
                                <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500
        peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600">
                                    Company Name
                                </p>
                            </label>
                            <label className="relative block w-full">
                                <input
                                    type="text"
                                    placeholder=" "
                                    className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
                                />
                                <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500
        peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600">
                                    Website
                                </p>
                            </label>


                            <SingleSelect options={owners} label="Status" onChange={handleSelectChange} />

                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="relative block w-full">
                                <input
                                    type="text"
                                    placeholder=" "
                                    className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
                                />
                                <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500
        peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600">
                                    Address
                                </p>
                            </label>
                            <SingleSelect options={owners} label="Contact Industry" onChange={handleSelectChange} />
                            
                            <SingleSelect options={owners} label="Contact Functional Area" onChange={handleSelectChange} />
                            <SingleSelect options={owners} label="Refrence Id" onChange={handleSelectChange} />
                            <label className="relative block w-full">
                                <textarea
                                    placeholder=" "
                                    className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500"
                                ></textarea>
                                <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500
        peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600">
                                    Note
                                </p>
                            </label>

                        </div>
                    </div>



                </div>

                <div className=" w-full flex items-center justify-center mt-10 mb-10">
                    <button className=" py-2 px-2 w-full max-w-[300px] border border-teal-500 rounded-md text-teal-500  hover:bg-teal-500 hover:text-white transition-all duration-300 cursor-pointer">Save</button>
                </div>


            </section>
        </div>

    </div>
}