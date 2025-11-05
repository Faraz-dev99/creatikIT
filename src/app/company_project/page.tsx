'use client'
import { useEffect, useState } from "react";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusSquare } from "lucide-react";
import ProtectedRoute from "../component/ProtectedRoutes";
import PopupMenu from "../component/popups/PopupMenu";
import toast, { Toaster } from "react-hot-toast";
import { companyprojectDialogDataInterface, companyprojectGetDataInterface } from "@/store/companyproject/companyproject.interface";
import { deleteCompanyProjects, getCompanyProjects } from "@/store/companyproject/companyproject";
import DeleteDialog from "../component/popups/DeleteDialog";


export default function CompanyProjects() {
  const router = useRouter();

  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] = useState<companyprojectDialogDataInterface | null>(null);

  const rowsPerTablePage = 10;
  const [projectsData, setProjectsData] = useState<companyprojectGetDataInterface[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getCompanyProjects();
    if (data) setProjectsData(data);
  };

  const handleDelete = async (data: companyprojectDialogDataInterface | null) => {
    if (!data) return;
    const response = await deleteCompanyProjects(data.id);
    if (response) {
      toast.success("Project deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeleteDialogData(null);
      fetchProjects();
    }
  };

  const editProject = (id: string | number) => {
    router.push(`/company_project/edit/${id}`);
  };

  const addProject = () => {
    router.push(`/company_project/add`);
  };

  const totalTablePages = Math.ceil(projectsData.length / rowsPerTablePage);
  const indexOfLastRow = currentTablePage * rowsPerTablePage;
  const indexOfFirstRow = indexOfLastRow - rowsPerTablePage;
  const currentRows = projectsData.slice(indexOfFirstRow, indexOfLastRow);

  const nextTablePage = () => {
    if (currentTablePage !== totalTablePages) setCurrentTablePage(currentTablePage + 1);
  };
  const prevTablePage = () => {
    if (currentTablePage !== 1) setCurrentTablePage(currentTablePage - 1);
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-56px)] overflow-auto bg-gray-200 max-md:py-10">
        <Toaster position="top-right" />

        {/* DELETE POPUP */}
        <DeleteDialog<companyprojectDialogDataInterface>
          isOpen={isDeleteDialogOpen}
          title="Are you sure you want to delete this followup?"
          data={deleteDialogData}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setDeleteDialogData(null);
          }}
          onDelete={handleDelete}
        />


        <div className="p-4 max-md:p-3 w-full">
          <div className="flex justify-between items-center">
            <h2 className="flex gap-2 items-center font-light">
              <span className="text-gray-900 text-2xl">Dashboard</span>/<span>Company Projects</span>
            </h2>

            <button onClick={addProject} className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-[#4e6787] text-white px-4 py-2 rounded-md font-semibold">
              <PlusSquare size={18} /> Add
            </button>
          </div>

          {/* TABLE */}
          <section className="flex flex-col mt-6 p-2 bg-white rounded-md">
            <div className="border border-gray-300 rounded-md m-2 overflow-auto">
              <table className="table-auto w-full border-collapse text-sm">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">S.No.</th>
                    <th className="px-4 py-3 text-left">Project Name</th>
                    <th className="px-4 py-3 text-left">Project Type</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-left">Area</th>
                    <th className="px-4 py-3 text-left">Range</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.length > 0 ? (
                    currentRows.map((item, index) => (
                      <tr key={index} className="border-t hover:bg-[#f7f6f3] transition-all duration-200">
                        <td className="px-4 py-3">{indexOfFirstRow + index + 1}</td>
                        <td className="px-4 py-3">{item.ProjectName}</td>
                        <td className="px-4 py-3">{item.ProjectType}</td>
                        <td className="px-4 py-3">{item.Location}</td>
                        <td className="px-4 py-3">{item.Area}</td>
                        <td className="px-4 py-3">{item.Range}</td>
                        <td className="px-4 py-3">{item.Date}</td>
                        <td className="px-4 py-2 flex gap-2 items-center">
                          <Button
                            sx={{ backgroundColor: "#E8F5E9", color: "#2E7D32", minWidth: "32px", height: "32px", borderRadius: "8px" }}
                            onClick={() => editProject(item._id)}
                          >
                            <MdEdit />
                          </Button>
                          <Button
                            sx={{ backgroundColor: "#FDECEA", color: "#C62828", minWidth: "32px", height: "32px", borderRadius: "8px" }}
                            onClick={() => {
                              setIsDeleteDialogOpen(true);
                              setDeleteDialogData({
                                id: item._id,
                                ProjectName: item.ProjectName,
                                ProjectType: item.ProjectType
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
                  <button type="button" onClick={prevTablePage} disabled={currentTablePage === 1} className="px-3 py-1 bg-gray-200 border border-gray-300 rounded disabled:opacity-50">Prev</button>
                  <button type="button" onClick={nextTablePage} disabled={(currentTablePage === totalTablePages) || (currentRows.length <= 0)} className="px-3 py-1 bg-gray-200 border border-gray-300 rounded disabled:opacity-50">Next</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}
