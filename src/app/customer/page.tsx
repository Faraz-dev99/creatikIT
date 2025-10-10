'use client'
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import Button from '@mui/material/Button';
import MultipleSelect from "@/app/component/MultipleSelect";
import SingleSelect from "@/app/component/SingleSelect";
import DateSelector from "@/app/component/DateSelector";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusSquare } from "lucide-react";
export default function customerIndex() {
    const router = useRouter();
    const [toggleSearchDropdown, setToggleSearchDropdown] = useState(false);
    const [currentTablePage, setCurrentTablePage] = useState(1);
    const rowsPerTablePage = 4;
    const customerData = [
        {
            id: "123",
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
            id: "345",
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
            id: "343",
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
            id: "532",
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
            id: "464",
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
            id: "342",
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
            id: "466",
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
            id: "453",
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

    const editCustomer = (id: string | number) => {
        router.push(`/customer/edit/${id}`)
    }

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

    return <div className=" flex min-h-[calc(100vh-56px)] max-md:py-10 overflow-auto bg-gray-200">
        <div className=" p-4 max-md:p-3 w-full">
            <div className=" flex justify-between items-center">
                <h2 className=" flex gap-2 items-center font-light">
                    <span className=" text-[#1a2a4f]-600 text-2xl">Dashboard</span>/
                    <span>OWNER</span>
                </h2>

                <Link href="/customer/add">
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#1a2a4f] to-[#4e6787] text-white px-4 py-2 rounded-md  hover:cursor-pointer font-semibold">
              <PlusSquare size={18} /> Add
            </button>
          </Link>
            </div>

            <section className=" flex flex-col mt-6 p-2 bg-white">


                <div className=" m-5 relative ">
                    <div className=" flex justify-between items-center  py-1 px-2 border border-gray-800 rounded-md">
                        <h3 className=" flex items-center gap-1"><CiSearch />Advance Search</h3>
                        <button type="button" onClick={() => setToggleSearchDropdown(!toggleSearchDropdown)} className=" p-2 hover:bg-gray-200 rounded-md cursor-pointer">{toggleSearchDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
                    </div>
                    <div className={` overflow-hidden ${toggleSearchDropdown ? ' max-h-[2000px] ' : ' max-h-0 '} transition-all duration-500 ease-in-out px-5`}>
                        <div className=" flex flex-col  gap-5 my-5 ">
                            <div className=" flex flex-wrap  gap-5 max-lg:flex-col">
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Status Assign</label>
                                    {<SingleSelect options={statusAssign} label="Status Assign" onChange={handleSelectChange} />}
                                </div>
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Campaign</label>
                                    {<SingleSelect options={statusAssign} label="Status Assign" onChange={handleSelectChange} />}
                                </div>
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Customer type</label>
                                    {<SingleSelect options={statusAssign} label="Status Assign" onChange={handleSelectChange} />}
                                </div>
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Customer Subtype</label>
                                    {<SingleSelect options={statusAssign} label="Status Assign" onChange={handleSelectChange} />}
                                </div>
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">City</label>
                                    {<SingleSelect options={statusAssign} label="Status Assign" onChange={handleSelectChange} />}
                                </div>
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Location</label>
                                    {<SingleSelect options={statusAssign} label="Status Assign" onChange={handleSelectChange} />}
                                </div>
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">User</label>
                                    {<SingleSelect options={statusAssign} label="Status Assign" onChange={handleSelectChange} />}
                                </div>
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Start Date</label>
                                    {<DateSelector label="Start Date" onChange={handleSelectChange} />}
                                </div>
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">End Date</label>
                                    {<DateSelector label="End Date" onChange={handleSelectChange} />}
                                </div>
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Limit</label>
                                    {<SingleSelect options={statusAssign} label="Status Assign" onChange={handleSelectChange} />}
                                </div>


                            </div>


                        </div>
                        <form className=" flex max-md:flex-col justify-between items-center mb-5">
                            <div className=" min-w-[80%]">
                                <label className=" block mb-2 text-sm font-medium text-gray-900">AI Genie</label>
                                <input type='text' placeholder="type text here.." className=" border border-gray-300 rounded-md px-3 py-2 outline-none w-full" />
                            </div>
                            <div className=" flex flex-wrap justify-center items-center">
                                <button type="submit" className=" border border-[#1a2a4f] text-[#1a2a4f] hover:bg-[#1a2a4f] hover:text-white transition-all duration-300 cursor-pointer px-3 py-2 mt-6 rounded-md">Explore</button>
                                <button type="reset" className=" text-red-500 text-sm px-5 py-2 mt-6 rounded-md ml-3">clear Search</button>
                            </div>
                        </form>
                    </div>
                </div>


                <h2 className=" text-xl p-3 font-bold">
                    <span className=" text-[#1a2a4f]">Customers</span>
                </h2>

                <div className=" border border-gray-300 rounded-md m-2 overflow-auto">
                    <div className=" flex gap-5 items-center px-3 py-4 min-w-max text-gray-700">
                        <button type="button" className=" hover:text-gray-950 cursor-pointer">Delete All</button>
                        <button type="button" className=" hover:text-gray-950 cursor-pointer">SMS All</button>
                        <button type="button" className=" hover:text-gray-950 cursor-pointer">Email All</button>
                        <button type="button" className=" hover:text-gray-950 cursor-pointer">Mass Update</button>
                    </div>
                    <table className="table-auto w-full border-collapse text-sm">
                        <thead className="bg-[#1a2a4f] text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">S.No.</th>
                                <th className="px-4 py-3 text-left">Campaign</th>
                                <th className="px-4 py-3 text-left">Type</th>
                                <th className="px-4 py-3 text-left">SubType</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">City</th>
                                <th className="px-4 py-3 text-left">Location</th>
                                <th className="px-4 py-3 text-left">Contact no</th>
                                <th className="px-4 py-3 text-left">Assign To</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentRows.length > 0 ? (
                                currentRows.map((item, index) => (
                                    <tr
                                        key={index + item.email}
                                        className="border-t hover:bg-[#f7f6f3] transition-all duration-200"
                                    >
                                        <td className="px-4 py-3">{indexOfFirstRow + index + 1}</td>
                                        <td className="px-4 py-3">{item.campaign}</td>
                                        <td className="px-4 py-3">{item.type}</td>
                                        <td className="px-4 py-3">{item.subType}</td>
                                        <td className="px-4 py-3">{item.email}</td>
                                        <td className="px-4 py-3">{item.city}</td>
                                        <td className="px-4 py-3">{item.location}</td>
                                        <td className="px-4 py-3">{item.contact}</td>
                                        <td className="px-4 py-3">{item.assignTo}</td>
                                        <td className="px-4 py-3">{item.date}</td>
                                        <td className="px-4 py-2 flex gap-2 items-center">
                                            <Button
                                                sx={{
                                                    backgroundColor: "#C8E6C9",
                                                    color: "#2E7D32",
                                                    minWidth: "32px",
                                                    height: "32px",
                                                    borderRadius: "8px",
                                                }}
                                                onClick={() => editCustomer(item.id)}
                                            >
                                                <MdEdit />
                                            </Button>
                                            <Button
                                                sx={{
                                                    backgroundColor: "#F9D0C4",
                                                    color: "#C62828",
                                                    minWidth: "32px",
                                                    height: "32px",
                                                    borderRadius: "8px",
                                                }}
                                            >
                                                <MdDelete />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={11} className="text-center py-4 text-gray-500">
                                        No data available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>



                    <div className="flex justify-between items-center mt-3 py-3 px-5">


                        <p className="text-sm">
                            Page {currentTablePage} of {totalTablePages}
                        </p>

                        <div className=" flex gap-3">

                            <button
                                type="button"
                                onClick={prevtablePage}
                                disabled={currentTablePage === 1}
                                className="px-3 py-1 bg-gray-200 border border-gray-300 rounded disabled:opacity-50"
                            >
                                Prev
                            </button>

                            <button
                                type="button"
                                onClick={nexttablePage}
                                disabled={currentTablePage === totalTablePages}
                                className="px-3 py-1 bg-gray-200 border border-gray-300 rounded disabled:opacity-50"
                            >
                                Next
                            </button>

                        </div>


                    </div>
                </div>
            </section>
        </div>

    </div>
}