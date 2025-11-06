'use client';
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import Button from "@mui/material/Button";
import SingleSelect from "@/app/component/SingleSelect";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusSquare } from "lucide-react";
import ProtectedRoute from "../component/ProtectedRoutes";
import PopupMenu from "../component/popups/PopupMenu";
import toast, { Toaster } from "react-hot-toast";

import {
  getContact,
  deleteContact,
  getFilteredContact,
  deleteAllContact,
  assignContact,
} from "@/store/contact";

import {
  ContactAdvInterface,
  contactGetDataInterface,
  DeleteDialogDataInterface,
  contactAssignInterface,
} from "@/store/contact.interface";

import DeleteDialog from "../component/popups/DeleteDialog";
import { getAllAdmins } from "@/store/auth";

interface DeleteAllDialogDataInterface {}

export default function Contacts() {
  const router = useRouter();

  /* ✅ NEW STATES FOR ASSIGN FUNCTIONALITY */
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>();
  const [users, setUsers] = useState<{ _id: string; name: string }[]>([]);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  /* OTHER STATES */
  const [toggleSearchDropdown, setToggleSearchDropdown] = useState(false);
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] =
    useState<DeleteDialogDataInterface | null>(null);
  const [deleteAllDialogData, setDeleteAllDialogData] =
    useState<DeleteAllDialogDataInterface | null>(null);

  const rowsPerTablePage = 10;

  const [filters, setFilters] = useState({
    StatusAssign: [] as string[],
    Campaign: [] as string[],
    ContactType: [] as string[],
    City: [] as string[],
    Location: [] as string[],
    User: [] as string[],
    Keyword: "" as string,
    Limit: [] as string[],
  });

  const [contactData, setContactData] = useState<contactGetDataInterface[]>([]);
  const [contactAdv, setContactAdv] = useState<ContactAdvInterface[]>([]);

  /* ✅ FETCH CONTACTS */
  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const data = await getContact();
    if (data) {
      setContactData(data);

      setContactAdv(
        data.map((item: any) => ({
          _id: item._id,
          Campaign: item.Campaign || [],
          ContactType: item.ContactType || [],
          City: item.City || [],
          Location: item.Location || [],
          User: item.User || [],
          Limit: item.Limit || [],
        }))
      );
    }
  };

  /* ✅ DELETE SINGLE */
  const handleDelete = async (data: DeleteDialogDataInterface | null) => {
    if (!data) return;

    const response = await deleteContact(data.id);
    if (response) {
      toast.success(`Contact deleted successfully`);
      setIsDeleteDialogOpen(false);
      setDeleteDialogData(null);
      getContacts();
    }
  };

  /* ✅ DELETE ALL */
  const handleDeleteAll = async () => {
    if (contactData.length === 0) return;

    const response = await deleteAllContact();
    if (response) {
      toast.success(`All contacts deleted`);
      setIsDeleteAllDialogOpen(false);
      setDeleteAllDialogData(null);
      getContacts();
    }
  };

  /* ✅ FETCH USERS FOR ASSIGN POPUP */
  const fetchUsers = async () => {
    const response = await getAllAdmins();
    if (response) {
      const admins =
        response?.admins?.filter((e: any) => e.role === "user") ?? [];

      setUsers(
        admins.map((item: any) => ({
          _id: item?._id ?? "",
          name: item?.name ?? "",
        }))
      );
    }
  };

  /* ✅ SELECT ALL CHECKBOX */
  const handleSelectAll = () => {
    const allIds = currentRows.map((c) => c._id);

    setSelectedContacts((prev) =>
      allIds.every((id) => prev.includes(id))
        ? prev.filter((id) => !allIds.includes(id))
        : [...new Set([...prev, ...allIds])]
    );
  };

  /* ✅ SELECT SINGLE ROW */
  const handleSelectRow = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id)
        ? prev.filter((cid) => cid !== id)
        : [...prev, id]
    );
  };

  /* ✅ SELECT ONLY ONE USER */
  const handleSelectUser = (id: string) => {
    setSelectedUser(id);
  };

  /* ✅ ASSIGN TO API CALL */
  const handleAssignTo = async () => {
    if (!selectedUser) {
      toast.error("Please select a user");
      return;
    }

    const payload: contactAssignInterface = {
      contactIds: selectedContacts,
      assignToId: selectedUser,
    };

    const response = await assignContact(payload);

    if (response) {
      toast.success("Contacts assigned successfully");
      setIsAssignOpen(false);
      setSelectedContacts([]);
      setSelectedUser(undefined);
      getContacts();
    } else {
      toast.error("Failed to assign contacts");
    }
  };

  /* ✅ PAGINATION */
  const totalTablePages = Math.ceil(contactData.length / rowsPerTablePage);
  const indexOfLastRow = currentTablePage * rowsPerTablePage;
  const indexOfFirstRow = indexOfLastRow - rowsPerTablePage;
  const currentRows = contactData.slice(indexOfFirstRow, indexOfLastRow);

  const nexttablePage = () => {
    if (currentTablePage !== totalTablePages)
      setCurrentTablePage(currentTablePage + 1);
  };

  const prevtablePage = () => {
    if (currentTablePage !== 1)
      setCurrentTablePage(currentTablePage - 1);
  };

  /* ✅ FILTERS */
  const statusAssign = ["Assigned", "Unassigned"];
  const campaign = [
    "Buyer",
    "Seller",
    "Rent Out",
    "Rent In",
    "Hostel/PG",
    "Agents",
    "Services",
    "Others",
    "Guest House",
    "Happy Stay",
  ];
  const customerTypes = ["New", "Existing", "Lead"];
  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"];
  const locations = ["Andheri", "Borivali", "Powai", "Juhu", "Malad"];
  const usersList = ["Admin", "Agent1", "Agent2"];

  const handleSelectChange = async (
    field: keyof typeof filters,
    selected: string | string[]
  ) => {
    const updatedFilters = {
      ...filters,
      [field]: Array.isArray(selected) ? selected : selected ? [selected] : [],
    };

    setFilters(updatedFilters);

    const queryParams = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((v) => queryParams.append(key, v));
      } else if (typeof value === "string" && value) {
        queryParams.append(key, value);
      }
    });

    const data = await getFilteredContact(queryParams.toString());
    if (data) setContactData(data);
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
    await getContacts();
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-56px)] overflow-auto bg-gray-200 max-md:py-10">
        <Toaster position="top-right" />

        {/* ✅ DELETE SINGLE POPUP */}
        <DeleteDialog<DeleteDialogDataInterface>
          isOpen={isDeleteDialogOpen}
          title="Are you sure you want to delete this contact?"
          data={deleteDialogData}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setDeleteDialogData(null);
          }}
          onDelete={handleDelete}
        />

        {/* ✅ DELETE ALL POPUP */}
        <DeleteDialog<DeleteAllDialogDataInterface>
          isOpen={isDeleteAllDialogOpen}
          title="Are you sure you want to delete ALL contacts?"
          data={deleteAllDialogData}
          onClose={() => {
            setIsDeleteAllDialogOpen(false);
            setDeleteAllDialogData(null);
          }}
          onDelete={handleDeleteAll}
        />

        {/* ✅ ASSIGN POPUP */}
        {isAssignOpen && selectedContacts.length > 0 && (
          <PopupMenu onClose={() => setIsAssignOpen(false)}>
            <div className="flex flex-col gap-8 py-6 px-2 m-2 bg-white w-full max-w-[400px] rounded-md">
              <h2 className="text-2xl text-gray-800 px-6 font-extrabold">
                Assign <span className="text-blue-600">Contacts</span>
              </h2>

              <div className="max-h-[40vh] overflow-y-auto">
                {users.map((user) => (
                  <label
                    key={user._id}
                    className="flex justify-between px-6 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    <div>{user.name}</div>
                    <input
                      type="checkbox"
                      checked={selectedUser === user._id}
                      onChange={() => handleSelectUser(user._id)}
                    />
                  </label>
                ))}
              </div>

              <div className="flex justify-between px-6 items-center">
                <button
                  className="text-[#C62828] bg-[#FDECEA] hover:bg-[#F9D0C4] cursor-pointer rounded-md px-4 py-2"
                  onClick={handleAssignTo}
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

        {/* ✅ TABLE */}
        <div className="p-4 max-md:p-3 w-full">
          <div className="flex justify-between items-center">
            <h2 className="flex gap-2 items-center font-light">
              <span className="text-gray-900-600 text-2xl">Dashboard</span>/
              <span>Contact</span>
            </h2>

            <Link href="/contact/add">
              <button className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-[#4e6787] text-white px-4 py-2 rounded-md font-semibold">
                <PlusSquare size={18} /> Add
              </button>
            </Link>
          </div>

          {/* TABLE SECTION */}
          <section className="flex flex-col mt-6 p-2 bg-white rounded-md">
            <div className="border border-gray-300 rounded-md m-2 overflow-auto">
              <div className="flex gap-5 items-center px-3 py-4 min-w-max text-gray-700">
                <button
                  type="button"
                  className="hover:text-gray-950 cursor-pointer"
                  onClick={() => {
                    if (contactData.length > 0) {
                      setIsDeleteAllDialogOpen(true);
                      setDeleteAllDialogData({});
                    }
                  }}
                >
                  Delete All
                </button>

                {/* ✅ ASSIGN TO BUTTON */}
                <button
                  type="button"
                  className="hover:text-gray-950 cursor-pointer"
                  onClick={() => {
                    if (selectedContacts.length <= 0)
                      toast.error("Please select at least one contact");
                    else {
                      setIsAssignOpen(true);
                      fetchUsers();
                    }
                  }}
                >
                  Assign To
                </button>

                <button
                  type="button"
                  className="hover:text-gray-950 cursor-pointer"
                >
                  SMS All
                </button>
                <button
                  type="button"
                  className="hover:text-gray-950 cursor-pointer"
                >
                  Email All
                </button>
                <button
                  type="button"
                  className="hover:text-gray-950 cursor-pointer"
                >
                  Mass Update
                </button>
              </div>

              {/* TABLE */}
              <table className="table-auto w-full border-collapse text-sm">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    {/* ✅ SELECT ALL */}
                    <th className="px-2 py-3 text-left">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          currentRows.length > 0 &&
                          currentRows.every((r) =>
                            selectedContacts.includes(r._id)
                          )
                        }
                      />
                    </th>

                    <th className="px-4 py-3 text-left">S.No.</th>
                    <th className="px-4 py-3 text-left">Campaign</th>
                    <th className="px-4 py-3 text-left">Qualifications</th>
                    <th className="px-4 py-3 text-left">Locations</th>
                    <th className="px-4 py-3 text-left">Contact No</th>
                    <th className="px-4 py-3 text-left">Assign To</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentRows.length > 0 ? (
                    currentRows.map((item, index) => (
                      <tr
                        key={item._id}
                        className="border-t hover:bg-[#f7f6f3] transition-all duration-200"
                      >
                        {/* ✅ ROW CHECKBOX */}
                        <td className="px-2 py-3">
                          <input
                            type="checkbox"
                            checked={selectedContacts.includes(item._id)}
                            onChange={() => handleSelectRow(item._id)}
                          />
                        </td>

                        <td className="px-4 py-3">
                          {indexOfFirstRow + index + 1}
                        </td>
                        <td className="px-4 py-3">{item.Campaign}</td>
                        <td className="px-4 py-3">{item.Qualifications}</td>
                        <td className="px-4 py-3">{item.Location}</td>
                        <td className="px-4 py-3">{item.ContactNo}</td>
                        <td className="px-4 py-3">N/A</td>
                        <td className="px-4 py-3">{item.date}</td>

                        <td className="px-4 py-2 flex gap-2 items-center">
                          <Button
                            sx={{
                              backgroundColor: "#E8F5E9",
                              color: "#2E7D32",
                              minWidth: "32px",
                              height: "32px",
                              borderRadius: "8px",
                            }}
                            onClick={() =>
                              router.push(
                                `/followups/contact/add/${item._id}`
                              )
                            }
                          >
                            <MdAdd />
                          </Button>

                          <Button
                            sx={{
                              backgroundColor: "#E8F5E9",
                              color: "#2E7D32",
                              minWidth: "32px",
                              height: "32px",
                              borderRadius: "8px",
                            }}
                            onClick={() => router.push(`/contact/edit/${item._id}`)}
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
                            onClick={() => {
                              setIsDeleteDialogOpen(true);
                              setDeleteDialogData({
                                id: item._id,
                                contactName: item.Name,
                                contactEmail: item.Email,
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
                      <td
                        colSpan={9}
                        className="text-center py-4 text-gray-500"
                      >
                        No data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* ✅ PAGINATION */}
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
                      currentTablePage === totalTablePages ||
                      currentRows.length <= 0
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
