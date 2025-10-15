'use client'
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import Button from '@mui/material/Button';
import SingleSelect from "@/app/component/SingleSelect";
import DateSelector from "@/app/component/DateSelector";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusSquare } from "lucide-react";
import ProtectedRoute from "../../component/ProtectedRoutes";
import PopupMenu from "../../component/popups/PopupMenu";
import toast, { Toaster } from "react-hot-toast";
import { getContactFollowups, deleteContactFollowup, getFilteredContactFollowups } from "@/store/contactFollowups";

export default function ContactFollowups() {
    interface Followup {
        _id: string;
        Name: string;
        ContactNo: string;
        User: string;
        Date: string;
        ByContact?: string;
    }

    interface DeleteDialogDataInterface {
        id: string;
        contactName: string;
        contactNo: string;
    }

    const router = useRouter();
    const [toggleSearchDropdown, setToggleSearchDropdown] = useState(false);
    const [currentTablePage, setCurrentTablePage] = useState(1);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteDialogData, setDeleteDialogData] = useState<DeleteDialogDataInterface | null>(null);

    const rowsPerTablePage = 10;

    const [filters, setFilters] = useState({
        StatusType: [] as string[],
        Campaign: [] as string[],
        ContactType: [] as string[],
        City: [] as string[],
        Location: [] as string[],
        User: [] as string[],
        Keyword: "" as string,
        Limit: [] as string[],
        StartDate: "",
        EndDate: "",
    });

    const [followupData, setFollowupData] = useState<Followup[]>([]);

    // Fetch all followups
    useEffect(() => {
        getFollowups();
    }, []);

    const getFollowups = async () => {
        const data = await getContactFollowups();
        if (data) setFollowupData(data);
    };

    const handleDelete = async (data: DeleteDialogDataInterface | null) => {
        if (!data) return;
        const response = await deleteContactFollowup(data.id);
        if (response) {
            toast.success(`Followup deleted successfully`);
            setIsDeleteDialogOpen(false);
            setDeleteDialogData(null);
            getFollowups();
        }
    };

    const editCustomer = (id: string) => {
        router.push(`/followups/contact/edit/${id}`);
    };

    const totalTablePages = Math.ceil(followupData.length / rowsPerTablePage);
    const indexOfLastRow = currentTablePage * rowsPerTablePage;
    const indexOfFirstRow = indexOfLastRow - rowsPerTablePage;
    const currentRows = followupData.slice(indexOfFirstRow, indexOfLastRow);

    const nexttablePage = () => {
        if (currentTablePage !== totalTablePages) setCurrentTablePage(currentTablePage + 1);
    };
    const prevtablePage = () => {
        if (currentTablePage !== 1) setCurrentTablePage(currentTablePage - 1);
    };

    // Options
    const StatusType = ['Active', 'Unassigned'];
    const campaign = ['Buyer', 'Seller', 'Rent Out', 'Rent In', 'Hostel/PG', 'Agents', 'Services', 'Others', 'Guest House', 'Happy Stay'];
    const customerTypes = ['New', 'Existing', 'Lead'];
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];
    const locations = ['Andheri', 'Borivali', 'Powai', 'Juhu', 'Malad'];
    const users = ['Admin', 'Agent1', 'Agent2'];

    const handleSelectChange = async (field: keyof typeof filters, selected: string | string[]) => {
        const updatedFilters = {
            ...filters,
            [field]: Array.isArray(selected) ? selected : selected ? [selected] : [], // ✅ always array
        };
        setFilters(updatedFilters);

        const queryParams = new URLSearchParams();
        Object.entries(updatedFilters).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) value.forEach(v => queryParams.append(key, v));
            else if (typeof value === "string" && value) queryParams.append(key, value);
        });

        const data = await getFilteredContactFollowups(queryParams.toString());
        if (data) setFollowupData(data);
    };

    const clearFilter = async () => {
        setFilters({
            StatusType: [],
            Campaign: [],
            ContactType: [],
            City: [],
            Location: [],
            User: [],
            Keyword: "",
            Limit: [],
            StartDate: "",
            EndDate: "",
        });

        // Fetch all followups again
        await getFollowups();
    };

    


    return (
        <ProtectedRoute>
            <div className="flex min-h-[calc(100vh-56px)] overflow-auto bg-gray-200 max-md:py-10">
                <Toaster position="top-right" />

                {/* DELETE POPUP */}
                {isDeleteDialogOpen && deleteDialogData && (
                    <PopupMenu onClose={() => { setIsDeleteDialogOpen(false); setDeleteDialogData(null); }}>
                        <div className="flex flex-col gap-10 m-2">
                            <h2 className=" font-bold">Are you sure you want to delete this followup?</h2>
                            <div className=" flex flex-col gap-2">
                                <div className=" flex items-center gap-2">Name: {deleteDialogData.contactName}</div>
                                <div className=" flex items-center gap-2">Contact No: {deleteDialogData.contactNo}</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <button className="text-[#C62828] bg-[#FDECEA] hover:bg-[#F9D0C4] cursor-pointer rounded-md px-4 py-2"
                                    onClick={() => handleDelete(deleteDialogData)}>Yes, delete</button>
                                <button className="cursor-pointer text-blue-800 hover:bg-gray-200 rounded-md px-4 py-2"
                                    onClick={() => { setIsDeleteDialogOpen(false); setDeleteDialogData(null); }}>No</button>
                            </div>
                        </div>
                    </PopupMenu>
                )}

                <div className="p-4 max-md:p-3 w-full">
                    <div className="flex justify-between items-center">
                        <h2 className="flex gap-2 items-center font-light">
                            <span className="text-[#1a2a4f]-600 text-2xl">Dashboard</span> / <span>FollowUps</span>
                        </h2>

                        <Link href="/followups/contact/add">
                            <button className="flex items-center gap-2 bg-gradient-to-r from-[#1a2a4f] to-[#4e6787] text-white px-4 py-2 rounded-md hover:cursor-pointer font-semibold">
                                <PlusSquare size={18} /> Add
                            </button>
                        </Link>
                    </div>

                    {/* TABLE & SEARCH */}
                    <section className="flex flex-col mt-6 p-2 bg-white rounded-lg shadow-sm">
                        {/* Advance Search Section */}
                        <div className="m-5 relative">
                            <div className="flex justify-between items-center py-1 px-2 border border-gray-800 rounded-md">
                                <h3 className="flex items-center gap-1"><CiSearch />Advance Search</h3>
                                <button type="button" onClick={() => setToggleSearchDropdown(!toggleSearchDropdown)} className="p-2 hover:bg-gray-200 rounded-md cursor-pointer">
                                    {toggleSearchDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                            </div>

                            <div className={`overflow-hidden ${toggleSearchDropdown ? 'max-h-[2000px]' : 'max-h-0'} transition-all duration-500 ease-in-out px-5`}>
                                <div className="flex flex-col gap-5 my-5">
                                    <div className="flex flex-wrap gap-5 max-lg:flex-col">
                                        <SingleSelect options={StatusType} value={filters.StatusType[0]} label="Status Assign" onChange={(val) => handleSelectChange("StatusType", val)} />
                                        <SingleSelect options={campaign} value={filters.Campaign[0]} label="Campaign" onChange={(val) => handleSelectChange("Campaign", val)} />
                                        <SingleSelect options={customerTypes} label="Contact Type" onChange={(val) => handleSelectChange("ContactType", val)} />
                                        <SingleSelect options={cities} label="City" onChange={(val) => handleSelectChange("City", val)} />
                                        <SingleSelect options={locations} label="Location" onChange={(val) => handleSelectChange("Location", val)} />
                                        <SingleSelect options={users} label="User" onChange={(val) => handleSelectChange("User", val)} />
                                        <DateSelector label="Start Date" onChange={(val) => handleSelectChange("StartDate" as any, val)} />
                                        <DateSelector label="End Date" onChange={(val) => handleSelectChange("EndDate" as any, val)} />
                                        <SingleSelect options={["10", "25", "50", "100"]} label="Limit" onChange={(val) => handleSelectChange("Limit", val)} />
                                    </div>
                                </div>

                                <form className="flex max-md:flex-col justify-between items-center mb-5">
                                    <div className="min-w-[80%]">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">AI Genie</label>
                                        <input
                                            type="text"
                                            placeholder="type text here.."
                                            className="border border-gray-300 rounded-md px-3 py-2 outline-none w-full"
                                            value={filters.Keyword}
                                            onChange={(e) => handleSelectChange("Keyword", e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-wrap justify-center items-center">
                                        <button type="submit" className="border border-[#1a2a4f] text-[#1a2a4f] hover:bg-[#1a2a4f] hover:text-white transition-all duration-300 cursor-pointer px-3 py-2 mt-6 rounded-md">
                                            Explore
                                        </button>
                                        <button type="reset" className="text-red-500 cursor-pointer hover:bg-gray-300 text-sm px-5 py-2 mt-6 rounded-md ml-3"
                                            onClick={clearFilter}>
                                            Clear Search
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="border border-gray-300 rounded-md m-2 overflow-auto">
                            <div className="flex gap-5 items-center px-3 py-4 min-w-max text-gray-700">
                                <button type="button" className="hover:text-gray-950 cursor-pointer">Delete All</button>
                                <button type="button" className="hover:text-gray-950 cursor-pointer">SMS All</button>
                                <button type="button" className="hover:text-gray-950 cursor-pointer">Email All</button>
                                <button type="button" className="hover:text-gray-950 cursor-pointer">Mass Update</button>
                            </div>

                            <table className="table-auto w-full border-collapse text-sm">
                                <thead className="bg-[#1a2a4f] text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left">S.No.</th>
                                        <th className="px-4 py-3 text-left">Name</th>
                                        <th className="px-4 py-3 text-left">Contact No</th>
                                        <th className="px-4 py-3 text-left">User</th>
                                        <th className="px-4 py-3 text-left">Date</th>
                                        <th className="px-4 py-3 text-left">Actions</th>
                                        <th className="px-4 py-3 text-left">By Contact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRows.length > 0 ? currentRows.map((item, index) => (
                                        <tr key={item._id} className="border-t hover:bg-[#f7f6f3] transition-all duration-200">
                                            <td className="px-4 py-3">{indexOfFirstRow + index + 1}</td>
                                            <td className="px-4 py-3">{item.Name}</td>
                                            <td className="px-4 py-3">{item.ContactNo}</td>
                                            <td className="px-4 py-3">{item.User}</td>
                                            <td className="px-4 py-3">{item.Date}</td>
                                            <td className="px-4 py-2 flex gap-2 items-center">
                                                <Button
                                                    sx={{ backgroundColor: "#E8F5E9", color: "#2E7D32", minWidth: "32px", height: "32px", borderRadius: "8px" }}
                                                    onClick={() => editCustomer(item._id)}
                                                >
                                                    <MdEdit />
                                                </Button>
                                                <Button
                                                    sx={{ backgroundColor: "#FDECEA", color: "#C62828", minWidth: "32px", height: "32px", borderRadius: "8px" }}
                                                    onClick={() => {
                                                        setIsDeleteDialogOpen(true);
                                                        setDeleteDialogData({ id: item._id, contactName: item.Name, contactNo: item.ContactNo });
                                                    }}
                                                >
                                                    <MdDelete />
                                                </Button>
                                            </td>
                                            <td className="px-4 py-3">{item.ByContact || "-"}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={7} className="text-center py-4 text-gray-500">No data available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="flex justify-between items-center mt-3 py-3 px-5">
                                <p className="text-sm">Page {currentTablePage} of {totalTablePages}</p>
                                <div className="flex gap-3">
                                    <button type="button" onClick={prevtablePage} disabled={currentTablePage === 1} className="px-3 py-1 bg-gray-200 border border-gray-300 rounded disabled:opacity-50">Prev</button>
                                    <button type="button" onClick={nexttablePage} disabled={currentTablePage === totalTablePages || currentRows.length <= 0} className="px-3 py-1 bg-gray-200 border border-gray-300 rounded disabled:opacity-50">Next</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </ProtectedRoute>
    );
}
