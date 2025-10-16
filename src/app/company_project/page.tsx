'use client'

import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { PlusSquare } from "lucide-react";
import Button from "@mui/material/Button";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ProtectedRoute from "../component/ProtectedRoutes";
import PopupMenu from "../component/popups/PopupMenu";
import toast from "react-hot-toast";

interface ProjectData {
  _id: string;
  projectName: string;
  projectType: string;
  location: string;
  area: string;
  priceRange: string;
  date: string;
}

export default function CompanyProjectPage() {
  const router = useRouter();

  const [projectData, setProjectData] = useState<ProjectData[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    getProjectList();
  }, []);

  const getProjectList = async () => {
    // Fetch your project list from API here
    // const data = await getProjects();
    // if (data) setProjectData(data);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    // const res = await deleteProject(deleteId);
    // if (res) {
    //   toast.success("Project deleted successfully");
    //   setIsDeleteDialogOpen(false);
    //   getProjectList();
    // }
  };

  const totalPages = Math.ceil(projectData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = projectData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-56px)] overflow-auto bg-gray-200 max-md:py-10">
        <Toaster position="top-right" />

        {isDeleteDialogOpen && (
          <PopupMenu onClose={() => setIsDeleteDialogOpen(false)}>
            <div className="flex flex-col gap-8 m-2">
              <h2 className="font-semibold text-lg text-gray-800">
                Are you sure you want to delete this project?
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
              <span className="text-gray-900 text-2xl">Dashboard</span> /
              <span> Company Projects</span>
            </h2>

            <Link href="/company_project/add">
              <button className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-[#4e6787] text-white px-4 py-2 rounded-md hover:cursor-pointer font-semibold">
                <PlusSquare size={18} /> Add
              </button>
            </Link>
          </div>

          {/* TABLE */}
          <section className="flex flex-col mt-6 p-2 bg-white rounded-md border">
            <table className="table-auto w-full border-collapse text-sm">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">S.No.</th>
                  <th className="px-4 py-3 text-left">Project Name</th>
                  <th className="px-4 py-3 text-left">Project Type</th>
                  <th className="px-4 py-3 text-left">Location</th>
                  <th className="px-4 py-3 text-left">Area</th>
                  <th className="px-4 py-3 text-left">Price Range</th>
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
                      <td className="px-4 py-3">{startIndex + index + 1}</td>
                      <td className="px-4 py-3">{item.projectName}</td>
                      <td className="px-4 py-3">{item.projectType}</td>
                      <td className="px-4 py-3">{item.location}</td>
                      <td className="px-4 py-3">{item.area}</td>
                      <td className="px-4 py-3">{item.priceRange}</td>
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
                            router.push(`/company-projects/edit/${item._id}`)
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
                      colSpan={8}
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
                Page {currentPage} of {totalPages || 1}
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
