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
export default function customerAdd() {
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

    return <div className="flex h-[calc(100vh-56px)] max-md:py-10 overflow-y-auto bg-gray-200">
        <div className="p-4 max-md:p-3 w-full pb-10 overflow-y-auto">
            <div className=" flex justify-between items-center gap-4 flex-wrap">
                <h2 className=" flex gap-2 items-center font-light">
                    <span className=" text-[#1a2a4f]-600 ">Dashboard</span>/
                    <span className=" text-[#1a2a4f]-600 ">Customer</span>/
                    <span>Add</span>
                </h2>

                <Link href="/customer" className=" py-2 px-2 border border-[#1a2a4f] rounded-md text-[#1a2a4f]  hover:bg-[#1a2a4f] hover:text-white transition-all duration-300 cursor-pointer">Back</Link>
            </div>

            <section className=" flex flex-col m-3  mt-6  p-3 max-md:p-2 mb bg-white rounded-lg shadow-sm">

                <h2 className=" text-xl p-3 font-bold mb-6">
                    <span className=" text-[#1a2a4f]">Add Owner Information</span>
                </h2>

                <div className=" p-3">
                    
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
                                    Customer Name
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
                                    Contact No
                                </p>
                            </label>

                            <SingleSelect options={owners} label="Location" onChange={handleSelectChange} />

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

                            <SingleSelect options={owners} label="Facilities" onChange={handleSelectChange} />

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
                                    Customer Id
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
                                    Customer Year
                                </p>
                            </label>

                            <label className="relative block w-full">
                                <textarea
                                    placeholder=" "
                                    className="peer w-full border rounded-sm border-gray-400 bg-transparent py-3 px-4 outline-none focus:border-blue-500 min-h-[100px]"
                                />
                                <p className="absolute left-2 top-0 bg-white px-1 text-gray-500 text-sm transition-all duration-300
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500
        peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600">
                                    Description
                                </p>
                            </label>

                            <SingleSelect options={owners} label="Verified" onChange={handleSelectChange} />
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
                                    City
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
                                    Area
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
                                    Email
                                </p>
                            </label>

                            

                            <SingleSelect options={owners} label="Reference Id" onChange={handleSelectChange} />
                            <DateSelector label="Customer Date" onChange={handleSelectChange} />
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
                                    Others
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
                                    Video
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
                                    Google Map
                                </p>
                            </label>
                        </div>
                    </div>



                </div>

                <div className=" w-full flex items-center justify-center mt-10 mb-10">
                    <button className=" py-2 px-2 w-full max-w-[300px] border border-[#1a2a4f] rounded-md text-[#1a2a4f]  hover:bg-[#1a2a4f] hover:text-white transition-all duration-300 cursor-pointer">Save</button>
                </div>


            </section>
        </div>

    </div>
}