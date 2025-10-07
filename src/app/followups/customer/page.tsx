'use client'
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import Button from '@mui/material/Button';
import MultipleSelect from "@/app/component/MultipleSelect";
import SingleSelect from "@/app/component/SingleSelect";
import DateSelector from "@/app/component/DateSelector";
export default function customerFollowups() {
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

    const city=[
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

    return <div className=" flex max-h-[calc(100vh-56px)] overflow-auto bg-gray-200">
        <div className=" p-4 max-md:p-3 w-full">
            <div className=" flex justify-between items-center">
                <h2 className=" flex gap-2 items-center font-light">
                    <span className=" text-teal-600 text-2xl">Dashboard</span>/
                    <span>FollowUps</span>
                </h2>
                
                <button className=" py-2 px-2 border border-teal-500 rounded-md text-teal-500  hover:bg-teal-500 hover:text-white transition-all duration-300 cursor-pointer">Add New</button>
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
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Campaign</label>
                                    {<SingleSelect options={statusAssign} label="Campaign" onChange={handleSelectChange} />}
                                </div>
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Property Type</label>
                                    {<SingleSelect options={statusAssign} label="Property Type" onChange={handleSelectChange} />}
                                </div>
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Status Type</label>
                                    {<SingleSelect options={statusAssign} label="Status Type" onChange={handleSelectChange} />}
                                </div> 
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">City</label>
                                    {<SingleSelect options={statusAssign} label="City" onChange={handleSelectChange} />}
                                </div> 
                                 <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Location</label>
                                    {<SingleSelect options={statusAssign} label="Location" onChange={handleSelectChange} />}
                                </div>
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">User</label>
                                    {<SingleSelect options={statusAssign} label="User" onChange={handleSelectChange} />}
                                </div>
                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Keyword</label>
                                    {<SingleSelect options={statusAssign} label="Keyword" onChange={handleSelectChange} />}
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
                                    {<SingleSelect options={statusAssign} label="Limit" onChange={handleSelectChange} />}
                                </div> 

                            </div>
                           
                            
                        </div>
                        <form className=" flex max-md:flex-col justify-between items-center mb-5">
                            <div className=" min-w-[80%]">
                                <label className=" block mb-2 text-sm font-medium text-gray-900">AI Genie</label>
                                <input type='text' placeholder="type text here.." className=" border border-gray-400 rounded-md px-3 py-2 outline-none w-full" />
                            </div>
                            <div className=" flex flex-wrap justify-center items-center">
                                <button type="submit" className=" border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 cursor-pointer px-3 py-2 mt-6 rounded-md">Explore</button>
                                <button type="reset" className=" text-red-500 text-sm px-5 py-2 mt-6 rounded-md ml-3">clear Search</button>
                            </div>
                        </form>
                    </div>
                </div>


                <h2 className=" text-xl mt-5 p-3 font-bold">
                    <span className=" text-teal-500">Customers</span>
                </h2>

                <div className=" border border-gray-400 rounded-md m-2 overflow-auto">
                    <div className=" flex gap-5 items-center px-3 py-4 min-w-max text-gray-700">
                        <button type="button" className=" hover:text-gray-950 cursor-pointer">Delete All</button>
                        <button type="button" className=" hover:text-gray-950 cursor-pointer">SMS All</button>
                        <button type="button" className=" hover:text-gray-950 cursor-pointer">Email All</button>
                        <button type="button" className=" hover:text-gray-950 cursor-pointer">Mass Update</button>
                    </div>
                    <table className="min-w-full border border-gray-300 border-collapse">
                        <thead className="bg-gray-100 ">
                            <tr className=" text-left">
                                <th className="border-b border-b-gray-400 px-4 py-2 font-medium">S.No.</th>
                                <th className="border-b border-b-gray-400 px-4 py-2 font-medium">Campaign</th>
                                <th className="border-b border-b-gray-400 px-4 py-2 font-medium">Type</th>
                                <th className="border-b border-b-gray-400 px-4 py-2 font-medium">SubType</th>
                                <th className="border-b border-b-gray-400 px-4 py-2 font-medium">Email</th>
                                <th className="border-b border-b-gray-400 px-4 py-2 font-medium">City</th>
                                <th className="border-b border-b-gray-400 px-4 py-2 font-medium">Location</th>
                                <th className="border-b border-b-gray-400 px-4 py-2 font-medium">Contact no</th>
                                <th className="border-b border-b-gray-400 px-4 py-2 font-medium">Assign To</th>
                                <th className="border-b border-b-gray-400 px-4 py-2 font-medium">Date</th>
                                <th className="border-b border-b-gray-400 px-4 py-2 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className=" text-gray-800">
                            {currentRows.map((item, index) => (
                                <tr key={index+item.email}>
                                    <td className="border-b border-gray-400 px-4 py-2">{indexOfFirstRow + index + 1}</td>
                                    <td className="border-b border-gray-400 px-4 py-2">{item.campaign}</td>
                                    <td className="border-b border-gray-400 px-4 py-2">{item.type}</td>
                                    <td className="border-b border-gray-400 px-4 py-2">{item.subType}</td>
                                    <td className="border-b border-gray-400 px-4 py-2">{item.email}</td>
                                    <td className="border-b border-gray-400 px-4 py-2">{item.city}</td>
                                    <td className="border-b border-gray-400 px-4 py-2">{item.location}</td>
                                    <td className="border-b border-gray-400 px-4 py-2">{item.contact}</td>
                                    <td className="border-b border-gray-400 px-4 py-2">{item.assignTo}</td>
                                    <td className="border-b border-gray-400 px-4 py-2">{item.date}</td>
                                    <td className=" flex gap-2 border-b border-gray-400 px-4 py-2">
                                        <Button
                                            sx={{
                                                backgroundColor: "#48bb784d",
                                                color: "#4CAF50",
                                                width: "20px",
                                            }} ><MdEdit /></Button>

                                        <Button
                                            sx={{
                                                backgroundColor: "#F565654D",
                                                color: "#F44336",
                                                width: "20px",
                                            }} ><MdDelete /></Button>
                                    </td>
                                </tr>
                            ))}
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