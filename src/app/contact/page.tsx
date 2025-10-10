'use client'
import { useEffect, useState } from "react";
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
export default function Contacts() {
    interface Contact {
        _id: string;
        Campaign: string;
        Qualifications: string;
        Location: string;
        ContactNo: string;
        AssignTo: string;
    }
    interface ContactAdvInterface {
        _id: string[];
        StatusAssign: string[];   // array
        Compaign: string[];       // array
        ContactType: string[];    // array
        City: string[];           // array
        Location: string[];       // array
        User: string[];           // array
        Keyword: string;          // single string
        Limit: string[];          // array
    }


    const router = useRouter();
    const [toggleSearchDropdown, setToggleSearchDropdown] = useState(false);
    const [currentTablePage, setCurrentTablePage] = useState(1);
    const rowsPerTablePage = 4;
    const [filters, setFilters] = useState({
        StatusAssign: [] as string[],
        Campaign: [] as string[],
        ContactType: [] as string[],
        City: [] as string[],
        Location: [] as string[],
        User: [] as string[],
        Keyword: "" as string,
        Limit: [] as string[]
    });

    //https://live-project-backend-viiy-onrender.com/api/contact
    //contact advance search : https://live-project-backend-viiy.onrender.com/api/con/adv
    const customerData = [
        {
            id: "123",
            Campaign: 'Summer Sale',
            qualifications: 'Promotional',
            CompanyName: 'Email Blast',
            Locations: "something",
            ContactNo: '123-456-7890',
            AssignTo: 'John Doe',
        },
    ];
    const [contactData, setContactData] = useState<Contact[]>([]);
    const [contactAdv, setContactAdv] = useState<ContactAdvInterface[]>([]);

    useEffect(() => {
        getContacts();

    }, [])

    const getContacts = async () => {
        try {
            const response = await fetch("https://live-project-backend-viiy.onrender.com/api/contact");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setContactData(data);

            setContactAdv(data.map((item: any) => ({
                _id: item._id,
                Compaign: item.Campaign || [],
                ContactType: item.ContactType || [],
                City: item.City || [],
                Location: item.Location || [],
                User: item.User || [],
                Limit: item.Limit || []
            })));
            console.log("data is", data);
        }
        catch (error) {
            console.log("Server Error:", error)
        }
    }


    const editCustomer = (id: string | number) => {
        router.push(`/customer/edit/${id}`)
    }

    const totalTablePages = Math.ceil(customerData.length / rowsPerTablePage);
    const indexOfLastRow = currentTablePage * rowsPerTablePage;
    const indexOfFirstRow = indexOfLastRow - rowsPerTablePage;
    const currentRows = contactData.slice(indexOfFirstRow, indexOfLastRow);
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
   

    const handleSelectChange = async (field: keyof typeof filters, selected: string | string[]) => {
        
        const updatedFilters = {
            ...filters,
            [field]: selected
        };
        setFilters(updatedFilters);

        try {
            
            const queryParams = new URLSearchParams();

            Object.entries(updatedFilters).forEach(([key, value]) => {
                if (Array.isArray(value) && value.length > 0) {
                    value.forEach(v => queryParams.append(key, v));
                } else if (typeof value === "string" && value) {
                    queryParams.append(key, value);
                }
            });

            const response = await fetch(`https://live-project-backend-viiy.onrender.com/api/contact?${queryParams.toString()}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setContactData(data);
            console.log("Filtered data:", data);
        } catch (error) {
            console.log("Server Error:", error);
        }
    };


    return <div className=" flex min-h-[calc(100vh-56px)] overflow-auto bg-gray-200 max-md:py-10">
        <div className=" p-4 max-md:p-3 w-full">
            <div className=" flex justify-between items-center">
                <h2 className=" flex gap-2 items-center font-light">
                    <span className=" text-[#1a2a4f]-600 text-2xl">Dashboard</span>/
                    <span>Contact</span>
                </h2>

                <Link href="/contact/add">
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
                                    <SingleSelect
                                        options={statusAssign}
                                        label="Status Assign"
                                        onChange={(selected) => handleSelectChange("StatusAssign", selected)}
                                    />
                                </div>

                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Campaign</label>
                                    <SingleSelect
                                        options={campaign}
                                        label="Campaign"
                                        onChange={(selected) => handleSelectChange("Campaign", selected)}
                                    />
                                </div>

                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Contact type</label>
                                    <SingleSelect
                                        options={statusAssign}
                                        label="Contact type"
                                        onChange={(selected) => handleSelectChange("ContactType", selected)}
                                    />
                                </div>

                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">City</label>
                                    <SingleSelect
                                        options={contactAdv.flatMap(item => item.City)}
                                        label="City"
                                        onChange={(selected) => handleSelectChange("City", selected)}
                                    />
                                </div>

                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Location</label>
                                    <SingleSelect
                                        options={statusAssign}
                                        label="Location"
                                        onChange={(selected) => handleSelectChange("Location", selected)}
                                    />
                                </div>

                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">User</label>
                                    <SingleSelect
                                        options={statusAssign}
                                        label="User"
                                        onChange={(selected) => handleSelectChange("User", selected)}
                                    />
                                </div>

                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Keyword</label>
                                    <SingleSelect
                                        options={statusAssign}
                                        label="Keyword"
                                        onChange={(selected) => handleSelectChange("Keyword", selected)}
                                    />
                                </div>

                                <div>
                                    <label className=" block mb-2 text-sm font-medium text-gray-900">Limit</label>
                                    <SingleSelect
                                        options={statusAssign}
                                        label="Limit"
                                        onChange={(selected) => handleSelectChange("Limit", selected)}
                                    />
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
                    <span className=" text-[#1a2a4f]">Contacts</span>
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
      <th className="px-4 py-3 text-left">Qualifications</th>
      <th className="px-4 py-3 text-left">Locations</th>
      <th className="px-4 py-3 text-left">Contact no</th>
      <th className="px-4 py-3 text-left">Asign To</th>
      <th className="px-4 py-3 text-left">Date</th>
      <th className="px-4 py-3 text-left">Actions</th>
    </tr>
  </thead>

  <tbody>
    {currentRows.length > 0 ? (
      currentRows.map((item, index) => (
        <tr
          key={index + item._id}
          className="border-t hover:bg-[#f7f6f3] transition-all duration-200"
        >
          <td className="px-4 py-3">{indexOfFirstRow + index + 1}</td>
          <td className="px-4 py-3">{item.Campaign}</td>
          <td className="px-4 py-3">{item.Qualifications}</td>
          <td className="px-4 py-3">{item.Location}</td>
          <td className="px-4 py-3">{item.ContactNo}</td>
          <td className="px-4 py-3">{item.AssignTo}</td>
          <td className="px-4 py-3">date</td>
          <td className="px-4 py-2 flex gap-2 items-center">
                                        <Button
                                            sx={{
                                                backgroundColor: "#E8F5E9",
                                                color: "#2E7D32",
                                                minWidth: "32px",
                                                height: "32px",
                                                borderRadius: "8px",
                                            }}
                                            onClick={() => editCustomer(item._id)}
                                        >
                                            <MdEdit />
                                        </Button>
                                        <Button
                                            sx={{
                                                backgroundColor: "#FDECEA",
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
        <td colSpan={8} className="text-center py-4 text-gray-500">
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