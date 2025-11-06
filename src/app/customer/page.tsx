'use client'
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdEdit, MdDelete, MdAdd, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Button from '@mui/material/Button';
import SingleSelect from "@/app/component/SingleSelect";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusSquare } from "lucide-react";
import ProtectedRoute from "../component/ProtectedRoutes";
import toast, { Toaster } from "react-hot-toast";
import { getCustomer, deleteCustomer, getFilteredCustomer, updateCustomer } from "@/store/customer";
import { CustomerAdvInterface, customerGetDataInterface, DeleteDialogDataInterface } from "@/store/customer.interface";
import DeleteDialog from "../component/popups/DeleteDialog";
import { getCampaign } from "@/store/masters/campaign/campaign";
import { getTypes } from "@/store/masters/types/types";
import { getSubtype } from "@/store/masters/subtype/subtype";
import { getCity } from "@/store/masters/city/city";
import { getLocation } from "@/store/masters/location/location";
import { handleFieldOptions } from "../utils/handleFieldOptions";

export default function Customer() {
  const router = useRouter();

  const [toggleSearchDropdown, setToggleSearchDropdown] = useState(false);
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFavouriteDialogOpen, setIsFavouriteDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<DeleteDialogDataInterface | null>(null);
  const [dialogType, setDialogType] = useState<"delete" | "favourite" | null>(null);
  const [fieldOptions, setFieldOptions] = useState<Record<string, any[]>>({});
  const [isFavrouteCustomer,setIsFavrouteCustomer]=useState<boolean>(false);

  const rowsPerTablePage = 10;
  const [filters, setFilters] = useState({
    StatusAssign: [] as string[],
    Campaign: [] as string[],
    CustomerType: [] as string[],
    CustomerSubtype: [] as string[],
    City: [] as string[],
    Location: [] as string[],
    User: [] as string[],
    Keyword: "" as string,
    Limit: [] as string[],
  });

  const [customerData, setCustomerData] = useState<customerGetDataInterface[]>([]);
  const [customerAdv, setCustomerAdv] = useState<CustomerAdvInterface[]>([]);

  useEffect(() => {
    getCustomers();
     fetchFields();
  }, []);

  const getCustomers = async () => {
    const data = await getCustomer();
    if (data) {
      setCustomerData(
        data.map((item: any) => ({
          _id: item._id,
          Campaign: item.Campaign,
          Type: item.Type,
          SubType: item.SubType,
          Name: item.customerName,
          Email: item.Email,
          City: item.City,
          Location: item.Location,
          ContactNumber: item.ContactNumber,
          AssignTo: item.AssignTo,
          isFavourite: item.isFavourite,
          Date: item.Date,
        }))
      );
      setCustomerAdv(
        data.map((item: any) => ({
          _id: item._id,
          Campaign: item.Campaign || [],
          CustomerType: item.CustomerType || [],
          CustomerSubtype: item.CustomerSubtype || [],
          City: item.City || [],
          Location: item.Location || [],
          User: item.User || [],
          Limit: item.Limit || [],
        }))
      );
    }
  };

  const handleDelete = async (data: DeleteDialogDataInterface | null) => {
    if (!data) return;
    const response = await deleteCustomer(data.id);
    if (response) {
      toast.success(`Customer deleted successfully`);
      setIsDeleteDialogOpen(false);
      setDialogData(null);
      await getCustomers();
    }
  };

  const handleFavourite = async (data: DeleteDialogDataInterface | null) => {
    if (!data) return;
    const formData = new FormData();
    const current = customerData.find(c => c._id === data.id);
    const newFav = !current?.isFavourite;
    formData.append("isFavourite", newFav.toString());

    const res = await updateCustomer(data.id, formData);
    if (res) {
      toast.success("Favourite updated successfully");
      setIsFavouriteDialogOpen(false);
      setDialogData(null);
      await getCustomers();
    } else {
      toast.error("Failed to update favourite");
    }
  };

  const handleFavouriteToggle = (id: string, name: string, number: string,isFavourite:boolean) => {
    setDialogType("favourite");
    setIsFavouriteDialogOpen(true);
    setDialogData({
      id,
      customerName: name,
      ContactNumber: number
    });
    setIsFavrouteCustomer(isFavourite);
  };

  const handleSelectChange = async (field: keyof typeof filters, selected: string | string[]) => {
    const updatedFilters = {
      ...filters,
      [field]: Array.isArray(selected) ? selected : selected ? [selected] : [],
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

    const data = await getFilteredCustomer(queryParams.toString());
    if (data) setCustomerData(data);
  };

  const clearFilter = async () => {
    setFilters({
      StatusAssign: [],
      Campaign: [],
      CustomerType: [],
      CustomerSubtype: [],
      City: [],
      Location: [],
      User: [],
      Keyword: "",
      Limit: [],
    });
    await getCustomers();
  };

  const totalTablePages = Math.ceil(customerData.length / rowsPerTablePage);
  const indexOfLastRow = currentTablePage * rowsPerTablePage;
  const indexOfFirstRow = indexOfLastRow - rowsPerTablePage;
  const currentRows = customerData.slice(indexOfFirstRow, indexOfLastRow);

  const nexttablePage = () => {
    if (currentTablePage !== totalTablePages)
      setCurrentTablePage(currentTablePage + 1);
  };
  const prevtablePage = () => {
    if (currentTablePage !== 1) setCurrentTablePage(currentTablePage - 1);
  };
  
  const [filterOptions, setFilterOptions] = useState({
    StatusAssign: [] as string[],
    Campaign: [],
    CustomerType: [],
    CustomerSubtype: [],
    City: [],
    Location: [],
    User: [] as string[],
  });



//fields dropdown options fetching
  const fetchFields = async () => {
     await handleFieldOptions(
       [
         { key: "StatusAssign", staticData: ["Assigned", "Unassigned"] },
         { key: "Campaign", fetchFn: getCampaign },
         { key: "CustomerType", fetchFn: getTypes },
         { key: "CustomerSubtype", fetchFn: getSubtype },
         { key: "City", fetchFn: getCity },
         { key: "Location", fetchFn: getLocation },
         { key: "User", staticData: ["Admin", "Agent1", "Agent2"] },
       ],
       setFieldOptions
     );
   }

  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-56px)] overflow-auto bg-gray-200 max-md:py-10">
        <Toaster position="top-right" />

        {/* Delete Dialog */}
        <DeleteDialog<DeleteDialogDataInterface>
          isOpen={isDeleteDialogOpen}
          title="Are you sure you want to delete this customer?"
          data={dialogData}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setDialogData(null);
          }}
          onDelete={handleDelete}
        />

        {/* Favourite Dialog */}
        <DeleteDialog<DeleteDialogDataInterface>
          isOpen={isFavouriteDialogOpen}
          title={`Are you sure you want to ${isFavrouteCustomer?"unfavourite":"favourite"} this customer?`}
          data={dialogData}
          onClose={() => {
            setIsFavouriteDialogOpen(false);
            setDialogData(null);
          }}
          onDelete={handleFavourite}
        />

        <div className="p-4 max-md:p-3 w-full">
          <div className="flex justify-between items-center">
            <h2 className="flex gap-2 items-center font-light">
              <span className="text-gray-900 text-2xl">Dashboard</span>/
              <span>Customer</span>
            </h2>

            <Link href="/customer/add">
              <button className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-[#4e6787] text-white px-4 py-2 rounded-md font-semibold">
                <PlusSquare size={18} /> Add
              </button>
            </Link>
          </div>

          {/* Table Section */}
          <section className="flex flex-col mt-6 p-2 bg-white rounded-md">
            {/* Advanced Search */}
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
                <div className="grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 gap-5 my-5">
                  
                    <SingleSelect options={Array.isArray(fieldOptions?.StatusAssign)?fieldOptions.StatusAssign:[]} value={filters.StatusAssign[0]} label="Status Assign" onChange={(val) => handleSelectChange("StatusAssign", val)} />
                    <SingleSelect options={Array.isArray(fieldOptions?.Campaign)?fieldOptions.Campaign:[]} value={filters.Campaign[0]} label="Campaign" onChange={(val) => handleSelectChange("Campaign", val)} />
                    <SingleSelect options={Array.isArray(fieldOptions?.CustomerType)?fieldOptions.CustomerType:[]} value={filters.CustomerType[0]} label="Customer Type" onChange={(val) => handleSelectChange("CustomerType", val)} />
                    <SingleSelect options={Array.isArray(fieldOptions?.CustomerSubType)?fieldOptions.CustomerSubType:[]} value={filters.CustomerSubtype[0]} label="Customer Subtype" onChange={(val) => handleSelectChange("CustomerSubtype", val)} />
                    <SingleSelect options={Array.isArray(fieldOptions?.City)?fieldOptions.City:[]} value={filters.City[0]} label="City" onChange={(val) => handleSelectChange("City", val)} />
                    <SingleSelect options={Array.isArray(fieldOptions?.Location)?fieldOptions.Location:[]} value={filters.Location[0]} label="Location" onChange={(val) => handleSelectChange("Location", val)} />
                    <SingleSelect options={Array.isArray(fieldOptions?.User)?fieldOptions.User:[]} value={filters.User[0]} label="User" onChange={(val) => handleSelectChange("User", val)} />
                    <SingleSelect options={["10", "25", "50", "100"]} value={filters.Limit[0]} label="Limit" onChange={(val) => handleSelectChange("Limit", val)} />
                
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
                    <button type="submit" className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 cursor-pointer px-3 py-2 mt-6 rounded-md">
                      Explore
                    </button>
                    <button type="reset" onClick={clearFilter} className="text-red-500 text-sm px-5 py-2 mt-6 rounded-md ml-3">
                      Clear Search
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* TABLE */}
            <div className="border border-gray-300 rounded-md m-2 overflow-auto">
              <table className="table-auto w-full border-collapse text-sm">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">S.No.</th>
                    <th className="px-4 py-3 text-left">Campaign</th>
                    <th className="px-4 py-3 text-left">Customer Type</th>
                    <th className="px-4 py-3 text-left">Customer Subtype</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-left">Contact No</th>
                    <th className="px-4 py-3 text-left">Assign To</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.length > 0 ? (
                    currentRows.map((item, index) => (
                      <tr key={item._id} className="border-t hover:bg-[#f7f6f3] transition-all duration-200">
                        <td className="px-4 py-3">{indexOfFirstRow + index + 1}</td>
                        <td className="px-4 py-3">{item.Campaign}</td>
                        <td className="px-4 py-3">{item.Type}</td>
                        <td className="px-4 py-3">{item.SubType}</td>
                        <td className="px-4 py-3">{item.Location}</td>
                        <td className="px-4 py-3">{item.ContactNumber}</td>
                        <td className="px-4 py-3">{item.AssignTo}</td>
                        <td className="px-4 py-3">{item.Date}</td>
                        <td className="px-4 py-2 flex gap-2 items-center">
                          <Button
                            sx={{ backgroundColor: "#E8F5E9", color: "#2E7D32", minWidth: "32px", height: "32px", borderRadius: "8px" }}
                            onClick={() => router.push(`/followups/customer/add/${item._id}`)}
                          >
                            <MdAdd />
                          </Button>
                          <Button
                            sx={{ backgroundColor: "#E8F5E9", color: "#2E7D32", minWidth: "32px", height: "32px", borderRadius: "8px" }}
                            onClick={() => router.push(`/customer/edit/${item._id}`)}
                          >
                            <MdEdit />
                          </Button>
                          <Button
                            sx={{ backgroundColor: "#FDECEA", color: "#C62828", minWidth: "32px", height: "32px", borderRadius: "8px" }}
                            onClick={() => {
                              setIsDeleteDialogOpen(true);
                              setDialogType("delete");
                              setDialogData({
                                id: item._id,
                                customerName: item.Name,
                                ContactNumber: item.ContactNumber,
                              });
                            }}
                          >
                            <MdDelete />
                          </Button>
                          <Button
                            sx={{
                              backgroundColor: "#FFF0F5",
                              color: item.isFavourite ? "#E91E63" : "#C62828",
                              minWidth: "32px",
                              height: "32px",
                              borderRadius: "8px",
                            }}
                            onClick={() =>
                              handleFavouriteToggle(item._id, item.Name, item.ContactNumber,item.isFavourite??false)
                            }
                          >
                            {item.isFavourite ? <MdFavorite /> : <MdFavoriteBorder />}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center py-4 text-gray-500">
                        No data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-3 py-3 px-5">
                <p className="text-sm">
                  Page {currentTablePage} of {totalTablePages}
                </p>
                <div className="flex gap-3">
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
                    disabled={
                      currentTablePage === totalTablePages || currentRows.length <= 0
                    }
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
    </ProtectedRoute>
  );
}
