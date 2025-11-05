'use client'

import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { PlusSquare, KeyRound } from "lucide-react";
import Button from "@mui/material/Button";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ProtectedRoute from "../component/ProtectedRoutes";
import PopupMenu from "../component/popups/PopupMenu";
import SingleSelect from "@/app/component/SingleSelect";
import toast from "react-hot-toast";

interface UserData {
  _id: string;
  role: string;
  name: string;
  email: string;
  city: string;
  status: string;
}

export default function UsersPage() {
  const router = useRouter();

  const [userData, setUserData] = useState<UserData[]>([]);
  const [filters, setFilters] = useState({
    Role: [] as string[],
    City: [] as string[],
    Keyword: "" as string,
    Limit: [] as string[],
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    // const data = await getUsers();
    // if (data) setUserData(data);
  };

  const handleSelectChange = async (
    field: keyof typeof filters,
    selected: string | string[]
  ) => {
    const updatedFilters = {
      ...filters,
      [field]: Array.isArray(selected)
        ? selected
        : selected
        ? [selected]
        : [],
    };
    setFilters(updatedFilters);

    // const queryParams = new URLSearchParams();
    // Object.entries(updatedFilters).forEach(([key, value]) => {
    //   if (Array.isArray(value) && value.length > 0) {
    //     value.forEach((v) => queryParams.append(key, v));
    //   } else if (typeof value === "string" && value) {
    //     queryParams.append(key, value);
    //   }
    // });
    // const data = await getFilteredUsers(queryParams.toString());
    // if (data) setUserData(data);
  };

  const clearFilter = async () => {
    setFilters({
      Role: [],
      City: [],
      Keyword: "",
      Limit: [],
    });
    await getUserList();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    // const res = await deleteUser(deleteId);
    // if (res) {
    //   toast.success("User deleted successfully");
    //   setIsDeleteDialogOpen(false);
    //   getUserList();
    // }
  };

  const totalPages = Math.ceil(userData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = userData.slice(startIndex, startIndex + rowsPerPage);

  // Dummy dropdown options
  const roles = ["Admin", "Seller", "Visitor"];
  const cities = ["Delhi", "Mumbai", "Bangalore", "Pune"];
  const limits = ["10", "25", "50", "100"];

  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-56px)] overflow-auto bg-gray-200 max-md:py-10">
        <Toaster position="top-right" />

        {/* DELETE POPUP */}
        {isDeleteDialogOpen && (
          <PopupMenu onClose={() => setIsDeleteDialogOpen(false)}>
            <div className="flex flex-col gap-8 m-2">
              <h2 className="font-semibold text-lg text-gray-800">
                Are you sure you want to delete this User?
              </h2>
              <div className="flex justify-between items-center">
                <button
                  className="text-[#C62828] bg-[#FDECEA] hover:bg-[#F9D0C4] cursor-pointer rounded-md px-4 py-2"
                  onClick={handleDelete}
                >
                  Yes, delete
                </button>
                <button
                  className="cursor-pointer text-blue-800 hover:bg-gray-200 rounded-md px-4 py-2"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  No
                </button>
              </div>
            </div>
          </PopupMenu>
        )}

        <div className="p-4 w-full">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="flex gap-2 items-center font-light">
              <span className="text-gray-900 text-2xl">Dashboard</span>/
              <span>Users</span>
            </h2>

            <Link href="/users/add">
              <button className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-[#4e6787] text-white px-4 py-2 rounded-md hover:cursor-pointer font-semibold">
                <PlusSquare size={18} /> Add User
              </button>
            </Link>
          </div>

          {/* SEARCH FILTERS */}
          <div className="bg-white mt-6 p-5 rounded-md border">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              Search Filters
            </h3>
            <div className=" grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5">
              <SingleSelect
                options={roles}
                label="Role"
                value={filters.Role[0]}
                onChange={(val) => handleSelectChange("Role", val)}
              />
              <SingleSelect
                options={cities}
                label="City"
                value={filters.City[0]}
                onChange={(val) => handleSelectChange("City", val)}
              />
              <SingleSelect
                options={limits}
                label="Limit"
                value={filters.Limit[0]}
                onChange={(val) => handleSelectChange("Limit", val)}
              />
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Keyword
                </label>
                <input
                  type="text"
                  placeholder="Search..."
                  value={filters.Keyword}
                  onChange={(e) =>
                    handleSelectChange("Keyword", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 outline-none w-full"
                />
              </div>

              <div className="flex items-end gap-3">
                <button
                  onClick={clearFilter}
                  className="text-red-500 border border-red-300 hover:bg-red-50 px-4 py-2 rounded-md"
                >
                  Clear Search
                </button>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <section className="flex flex-col mt-6 p-2 bg-white rounded-md border">
            <table className="table-auto w-full border-collapse text-sm">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">S.No.</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">City</th>
                  <th className="px-4 py-3 text-left">Status</th>
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
                      <td className="px-4 py-3">{startIndex + index + 1}</td>
                      <td className="px-4 py-3">{item.role}</td>
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">{item.email}</td>
                      <td className="px-4 py-3">{item.city}</td>
                      <td className="px-4 py-3">{item.status}</td>
                      <td className="px-4 py-2 flex gap-2 items-center">
                        <Button
                          sx={{
                            backgroundColor: "#E3F2FD",
                            color: "#1565C0",
                            minWidth: "32px",
                            height: "32px",
                            borderRadius: "8px",
                          }}
                          onClick={() =>
                            router.push(`/users/change-password/${item._id}`)
                          }
                        >
                          <KeyRound size={16} />
                        </Button>
                        <Button
                          sx={{
                            backgroundColor: "#E8F5E9",
                            color: "#2E7D32",
                            minWidth: "32px",
                            height: "32px",
                            borderRadius: "8px",
                          }}
                          onClick={() =>
                            router.push(`/users/edit/${item._id}`)
                          }
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
                            setDeleteId(item._id);
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
                      colSpan={7}
                      className="text-center py-4 text-gray-500"
                    >
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-3 py-3 px-5">
              <p className="text-sm">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 border border-gray-300 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev < totalPages ? prev + 1 : prev
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 border border-gray-300 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}
