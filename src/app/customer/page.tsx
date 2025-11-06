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
import { getCustomer, deleteCustomer, getFilteredCustomer, updateCustomer, assignCustomer, deleteAllCustomer } from "@/store/customer";
import { CustomerAdvInterface, customerAssignInterface, customerGetDataInterface, DeleteDialogDataInterface } from "@/store/customer.interface";
import DeleteDialog from "../component/popups/DeleteDialog";
import { getCampaign } from "@/store/masters/campaign/campaign";
import { getTypes } from "@/store/masters/types/types";
import { getCity } from "@/store/masters/city/city";
import { getLocation } from "@/store/masters/location/location";
import { handleFieldOptions } from "../utils/handleFieldOptions";
import PopupMenu from "../component/popups/PopupMenu";
import { getAllAdmins } from "@/store/auth";
import { usersGetDataInterface } from "@/store/auth.interface";
import { getSubtype } from "@/store/masters/subtype/subtype";


interface DeleteAllDialogDataInterface { }

export default function Customer() {
  const router = useRouter();

  /*NEW STATE FOR SELECTED CUSTOMERS */
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [selectedUser, setSelectUser] = useState<string>();
  const [users, setUsers] = useState<usersGetDataInterface[]>([])


  /*REST OF YOUR STATES (UNCHANGED) */
  const [toggleSearchDropdown, setToggleSearchDropdown] = useState(false);
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);
  const [isFavouriteDialogOpen, setIsFavouriteDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<DeleteDialogDataInterface | null>(null);
  const [dialogType, setDialogType] = useState<"delete" | "favourite" | null>(null);
  const [fieldOptions, setFieldOptions] = useState<Record<string, any[]>>({});
  const [isFavrouteCustomer, setIsFavrouteCustomer] = useState<boolean>(false);
  const [deleteAllDialogData, setDeleteAllDialogData] =
    useState<DeleteAllDialogDataInterface | null>(null);

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

  const handleFavouriteToggle = (id: string, name: string, number: string, isFavourite: boolean) => {
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

  const fetchUsers = async () => {
    const response = await getAllAdmins();

    if (response) {
      console.log("response ", response);

      const admins = response?.admins?.filter((e) => e.role === "user") ?? []; //ensure only user roles are fetched

      setUsers(
        admins.map((item: any): usersGetDataInterface => ({
          _id: item?._id ?? "",
          name: item?.name ?? "",
        }))
      );

      return;
    }
  };

  const handleDeleteAll = async () => {
    if (customerData.length === 0) return;

    const response = await deleteAllCustomer();
    if (response) {
      toast.success(`All contacts deleted`);
      setIsDeleteAllDialogOpen(false);
      setDeleteAllDialogData(null);
      getCustomers();
    }
  };


  // ✅ Fetch dropdown data
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
  };

  /* ✅ SELECT ALL HANDLER */
  const handleSelectAll = () => {
    const allIds = currentRows.map((c) => c._id);
    setSelectedCustomers((prev) =>
      allIds.every((id) => prev.includes(id))
        ? prev.filter((id) => !allIds.includes(id)) // unselect all
        : [...new Set([...prev, ...allIds])] // select all visible rows
    );
  };

  /* ✅ SELECT SINGLE ROW HANDLER */
  const handleSelectRow = (id: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(id)
        ? prev.filter((cid) => cid !== id)
        : [...prev, id]
    );
  };

  const handleSelectUser = (id: string) => {
    setSelectUser(id); // ✅ only one user at a time
  };


  const handleAssignto = async () => {
    if (!selectedUser) {
      toast.error("Please select a user");
      return;
    }

    const payload: customerAssignInterface = {
      customerIds: selectedCustomers,
      assignToId: selectedUser,
    };

    console.log(payload)

    const response = await assignCustomer(payload);
    if (response) {
      toast.success(" customers assigned succesfully")
      return response
    }
    toast.error("failed to assign customers")
  };


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

        <DeleteDialog<DeleteAllDialogDataInterface>
          isOpen={isDeleteAllDialogOpen}
          title="Are you sure you want to delete ALL customers?"
          data={deleteAllDialogData}
          onClose={() => {
            setIsDeleteAllDialogOpen(false);
            setDeleteAllDialogData(null);
          }}
          onDelete={handleDeleteAll}
        />

        {/* Favourite Dialog */}
        <DeleteDialog<DeleteDialogDataInterface>
          isOpen={isFavouriteDialogOpen}
          title={`Are you sure you want to ${isFavrouteCustomer ? "unfavourite" : "favourite"} this customer?`}
          data={dialogData}
          onClose={() => {
            setIsFavouriteDialogOpen(false);
            setDialogData(null);
          }}
          onDelete={handleFavourite}
        />

        {isAssignOpen && (selectedCustomers.length > 0) && (
          <PopupMenu onClose={() => setIsAssignOpen(false)}>
            <div className="flex flex-col gap-8 py-6 px-2 m-2 bg-white  w-full max-w-[400px] rounded-md">
              <h2 className="text-2xl text-gray-800 px-6 font-extrabold">Assign <span className=" text-blue-600">Customers</span></h2>
              <div className=" max-h-[40vh] flex flex-col gap-2 overflow-y-auto">
                {users.map((user, index) => {
                  return <div key={user._id + index}>
                    <label className=" flex justify-between gap-2 cursor-pointer px-6 py-2 hover:bg-gray-200">


                      <div>{user.name}</div>
                      <input
                        type="checkbox"
                        checked={selectedUser === user._id}
                        onChange={() => handleSelectUser(user._id)}
                      />

                    </label>

                  </div>
                })}
              </div>
              <div className="flex justify-between px-6 items-center">
                <button
                  className="text-[#C62828] bg-[#FDECEA] hover:bg-[#F9D0C4] cursor-pointer rounded-md px-4 py-2"
                  onClick={handleAssignto}
                >
                  Assign
                </button>
                <button
                  className="cursor-pointer text-blue-800 hover:bg-gray-200 rounded-md px-4 py-2"
                  onClick={() => setIsAssignOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </PopupMenu>
        )}

        {/* ---------- TABLE START ---------- */}
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



          {/* TABLE */}
          <section className="flex flex-col mt-6 p-2 bg-white rounded-md">
            <div className="border border-gray-300 rounded-md m-2 overflow-auto">
              <div className="flex gap-5 items-center px-3 py-4 min-w-max text-gray-700">
                <button type="button" className="hover:text-gray-950 cursor-pointer" onClick={() => {
                  if(customerData.length>0){
                     setIsDeleteAllDialogOpen(true);
                  setDeleteAllDialogData({});
                  } 
                }}>Delete All</button>
                <label htmlFor="selectall" className="hover:text-gray-950 cursor-pointer">Select All</label>
                <button type="button" className="hover:text-gray-950 cursor-pointer" onClick={() => {
                  if (selectedCustomers.length <= 0) toast.error("please select atleast 1 customer")
                  else {
                    setIsAssignOpen(true);
                    fetchUsers()
                  }
                }}>Assign To</button>
                <button type="button" className="hover:text-gray-950 cursor-pointer">SMS All</button>
                <button type="button" className="hover:text-gray-950 cursor-pointer">Email All</button>
                <button type="button" className="hover:text-gray-950 cursor-pointer">Mass Update</button>
              </div>

              <table className="table-auto w-full border-collapse text-sm">
                <thead className="bg-gray-900 text-white">
                  <tr>

                    {/* ✅ SELECT ALL CHECKBOX COLUMN */}
                    <th className="px-2 py-3 text-left">

                      <input
                        id="selectall"
                        type="checkbox"
                        className=" hidden"
                        checked={
                          currentRows.length > 0 &&
                          currentRows.every((r) => selectedCustomers.includes(r._id))
                        }
                        onChange={handleSelectAll}
                      />
                    </th>

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

                        {/* ✅ ROW CHECKBOX */}
                        <td className="px-2 py-3">
                          <input
                            type="checkbox"
                            checked={selectedCustomers.includes(item._id)}
                            onChange={() => handleSelectRow(item._id)}
                          />
                        </td>

                        <td className="px-4 py-3">{indexOfFirstRow + index + 1}</td>
                        <td className="px-4 py-3">{item.Campaign}</td>
                        <td className="px-4 py-3">{item.Type}</td>
                        <td className="px-4 py-3">{item.SubType}</td>
                        <td className="px-4 py-3">{item.Location}</td>
                        <td className="px-4 py-3">{item.ContactNumber}</td>
                        <td className="px-4 py-3">{/* {item.AssignTo} */}</td>
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
                              handleFavouriteToggle(item._id, item.Name, item.ContactNumber, item.isFavourite ?? false)
                            }
                          >
                            {item.isFavourite ? <MdFavorite /> : <MdFavoriteBorder />}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="text-center py-4 text-gray-500">
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
