'use client'
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import Button from '@mui/material/Button';
import SingleSelect from "@/app/component/SingleSelect";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusSquare } from "lucide-react";
import ProtectedRoute from "../component/ProtectedRoutes";
import PopupMenu from "../component/popups/PopupMenu";
import toast, { Toaster } from "react-hot-toast";
import DateSelector from "@/app/component/DateSelector";
import { getContact, deleteContact, getFilteredContact } from "@/store/contact";
import { ContactAdvInterface, contactGetDataInterface, DeleteDialogDataInterface } from "@/store/contact.interface";

export default function Contacts() {


  const router = useRouter();

  const [toggleSearchDropdown, setToggleSearchDropdown] = useState(false);
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] = useState<DeleteDialogDataInterface | null>(null);

  const rowsPerTablePage = 10;
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

  const [contactData, setContactData] = useState<contactGetDataInterface[]>([]);
  const [contactAdv, setContactAdv] = useState<ContactAdvInterface[]>([]);

  useEffect(() => {
    getContacts();
  }, []);

  const handleDelete = async (data: DeleteDialogDataInterface | null) => {
    if (!data) return;

    const response = await deleteContact(data.id);
    if (response) {

      toast.success(`contact deleted successfully`);

      setIsDeleteDialogOpen(false);
      setDeleteDialogData(null);
      getContacts();
    }
  };

  const getContacts = async () => {
    const data = await getContact();
    if (data) {
      setContactData(data);

      setContactAdv(data.map((item: any) => ({
        _id: item._id,
        Campaign: item.Campaign || [],
        ContactType: item.ContactType || [],
        City: item.City || [],
        Location: item.Location || [],
        User: item.User || [],
        Limit: item.Limit || []
      })));
    }
  };

  const editCustomer = (id: string | number) => {
    router.push(`/contact/edit/${id}`)
  };

  const totalTablePages = Math.ceil(contactData.length / rowsPerTablePage);
  const indexOfLastRow = currentTablePage * rowsPerTablePage;
  const indexOfFirstRow = indexOfLastRow - rowsPerTablePage;
  const currentRows = contactData.slice(indexOfFirstRow, indexOfLastRow);

  const nexttablePage = () => {
    if (currentTablePage !== totalTablePages) setCurrentTablePage(currentTablePage + 1);
  };
  const prevtablePage = () => {
    if (currentTablePage !== 1) setCurrentTablePage(currentTablePage - 1);
  };

  const statusAssign = ['Assigned', 'Unassigned'];
  const campaign = ['Buyer', 'Seller', 'Rent Out', 'Rent In', 'Hostel/PG', 'Agents', 'Services', 'Others', 'Guest House', 'Happy Stay'];
  const customerTypes = ['New', 'Existing', 'Lead'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];
  const locations = ['Andheri', 'Borivali', 'Powai', 'Juhu', 'Malad'];
  const users = ['Admin', 'Agent1', 'Agent2'];

  const handleSelectChange = async (field: keyof typeof filters, selected: string | string[]) => {
    const updatedFilters = {
      ...filters,
      [field]: Array.isArray(selected) ? selected : selected ? [selected] : [], //always array
    };
    setFilters(updatedFilters);


    const queryParams = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach(v => queryParams.append(key, v));
      } else if (typeof value === "string" && value) {
        queryParams.append(key, value);
      }
    });

    const data = await getFilteredContact(queryParams.toString());
    if (data) {
      setContactData(data);
      return;
    }


  };
  const clearFilter = async () => {
    setFilters({
      StatusAssign: [],
      Campaign: [],
      ContactType: [],
      City: [],
      Location: [],
      User: [],
      Keyword: "",
      Limit: [],
    });

    // Fetch all contact
    await getContacts();
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-56px)] overflow-auto bg-gray-200 max-md:py-10">
        <Toaster position="top-right" />

        {/* DELETE POPUP */}
        {isDeleteDialogOpen && deleteDialogData && (
          <PopupMenu onClose={() => { setIsDeleteDialogOpen(false); setDeleteDialogData(null); }}>
            <div className="flex flex-col gap-10 m-2">
              <h2 className=" font-bold">
                Are you sure you want to delete this contact?
              </h2>
              <div className=" flex flex-col gap-2">
                <div className=" flex items-center gap-2">Name: {deleteDialogData.contactName}</div>
                <div className=" flex items-center gap-2">Email: <p className="text-gray-500 text-sm">{deleteDialogData.contactEmail}</p></div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="text-[#C62828] bg-[#FDECEA] hover:bg-[#F9D0C4] cursor-pointer rounded-md px-4 py-2"
                  onClick={() => handleDelete(deleteDialogData)}
                >
                  Yes, delete
                </button>
                <button
                  className="cursor-pointer text-blue-800 hover:bg-gray-200 rounded-md px-4 py-2"
                  onClick={() => { setIsDeleteDialogOpen(false); setDeleteDialogData(null); }}
                >
                  No
                </button>
              </div>
            </div>
          </PopupMenu>
        )}

        <div className="p-4 max-md:p-3 w-full">
          <div className="flex justify-between items-center">
            <h2 className="flex gap-2 items-center font-light">
              <span className="text-gray-900-600 text-2xl">Dashboard</span>/
              <span>Contact</span>
            </h2>

            <Link href="/contact/add">
              <button className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-[#4e6787] text-white px-4 py-2 rounded-md hover:cursor-pointer font-semibold">
                <PlusSquare size={18} /> Add
              </button>
            </Link>
          </div>



          {/* TABLE */}
          <section className="flex flex-col mt-6 p-2 bg-white rounded-md">
            {/* Advance Search Section */}
            <div className="m-5 relative">
              <div className="flex justify-between items-center py-1 px-2 border border-gray-800 rounded-md">
                <h3 className="flex items-center gap-1"><CiSearch />Advance Search</h3>
                <button
                  type="button"
                  onClick={() => setToggleSearchDropdown(!toggleSearchDropdown)}
                  className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
                >
                  {toggleSearchDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
              </div>

              <div className={`overflow-hidden ${toggleSearchDropdown ? 'max-h-[2000px]' : 'max-h-0'} transition-all duration-500 ease-in-out px-5`}>
                <div className="flex flex-col gap-5 my-5">
                  <div className="flex flex-wrap gap-5 max-lg:flex-col">
                    <div>

                      <SingleSelect options={statusAssign} value={filters.StatusAssign[0]} label="Status Assign" onChange={(val) => handleSelectChange("StatusAssign", val)} />
                    </div>
                    <div>

                      <SingleSelect options={campaign} value={filters.Campaign[0]} label="Campaign" onChange={(val) => handleSelectChange("Campaign", val)} />
                    </div>
                    <div>

                      <SingleSelect options={customerTypes} value={filters.ContactType[0]} label="Contact Type" onChange={(val) => handleSelectChange("ContactType", val)} />
                    </div>
                    <div>

                      <SingleSelect options={cities} value={filters.City[0]} label="City" onChange={(val) => handleSelectChange("City", val)} />
                    </div>
                    <div>

                      <SingleSelect options={locations} value={filters.Location[0]} label="Location" onChange={(val) => handleSelectChange("Location", val)} />
                    </div>
                    <div>

                      <SingleSelect options={users} value={filters.User[0]} label="User" onChange={(val) => handleSelectChange("User", val)} />
                    </div>
                    {/* <div>

                      <DateSelector label="Start Date" onChange={(val) => handleSelectChange("StartDate" as any, val)} />
                    </div>
                    <div>

                      <DateSelector label="End Date" onChange={(val) => handleSelectChange("EndDate" as any, val)} />
                    </div> */}
                    <div>

                      <SingleSelect options={["10", "25", "50", "100"]} value={filters.Limit[0]} label="Limit" onChange={(val) => handleSelectChange("Limit", val)} />
                    </div>
                  </div>
                </div>

                <form className="flex flex-wrap max-md:flex-col justify-between items-center mb-5">
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
                  <div className="flex justify-center items-center">
                    <button
                      type="submit"
                      className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 cursor-pointer px-3 py-2 mt-6 rounded-md"
                    >
                      Explore
                    </button>
                    <button
                      type="reset"
                      onClick={clearFilter}
                      className="text-red-500 text-sm cursor-pointer px-5 py-2 mt-6 rounded-md ml-3"
                    >
                      Clear Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="border border-gray-300 rounded-md m-2 overflow-auto">
              <div className="flex gap-5 items-center px-3 py-4 min-w-max text-gray-700">
                <button type="button" className="hover:text-gray-950 cursor-pointer">Delete All</button>
                <button type="button" className="hover:text-gray-950 cursor-pointer">SMS All</button>
                <button type="button" className="hover:text-gray-950 cursor-pointer">Email All</button>
                <button type="button" className="hover:text-gray-950 cursor-pointer">Mass Update</button>
              </div>

              <table className="table-auto w-full border-collapse text-sm">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">S.No.</th>
                    <th className="px-4 py-3 text-left">Campaign</th>
                    <th className="px-4 py-3 text-left">Qualifications</th>
                    <th className="px-4 py-3 text-left">Locations</th>
                    <th className="px-4 py-3 text-left">Contact no</th>
                    <th className="px-4 py-3 text-left">Assign To</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.length > 0 ? (
                    currentRows.map((item, index) => (
                      <tr key={index + item._id} className="border-t hover:bg-[#f7f6f3] transition-all duration-200">
                        <td className="px-4 py-3">{indexOfFirstRow + index + 1}</td>
                        <td className="px-4 py-3">{item.Campaign}</td>
                        <td className="px-4 py-3">{item.Qualifications}</td>
                        <td className="px-4 py-3">{item.Location}</td>
                        <td className="px-4 py-3">{item.ContactNo}</td>
                        <td className="px-4 py-3">{/* {item?.AssignTo} */}N/A</td>
                        <td className="px-4 py-3">{item.date}</td>
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
                              setDeleteDialogData({
                                id: item._id,
                                contactName: item.Name,
                                contactEmail: item.Email
                              });
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
                <p className="text-sm">Page {currentTablePage} of {totalTablePages}</p>
                <div className="flex gap-3">
                  <button type="button" onClick={prevtablePage} disabled={currentTablePage === 1} className="px-3 py-1 bg-gray-200 border border-gray-300 rounded disabled:opacity-50">Prev</button>
                  <button type="button" onClick={nexttablePage} disabled={(currentTablePage === totalTablePages) || (currentRows.length <= 0)} className="px-3 py-1 bg-gray-200 border border-gray-300 rounded disabled:opacity-50">Next</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}
