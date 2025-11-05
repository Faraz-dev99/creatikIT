"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import Button from "@mui/material/Button";
import { PlusSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import PopupMenu from "../../component/popups/PopupMenu";
import {
  subtypeGetDataInterface,
  subtypeDialogDataInterface,
} from "@/store/masters/subtype/subtype.interface";
import { deleteSubtype, getSubtype } from "@/store/masters/subtype/subtype";
import DeleteDialog from "@/app/component/popups/DeleteDialog";


export default function CustomerSubtypePage() {
  const [subtypes, setSubtypes] = useState<subtypeGetDataInterface[]>([]);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState("10");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] =
    useState<subtypeDialogDataInterface | null>(null);
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const rowsPerTablePage = 10;
  const router = useRouter();

  const fetchSubtypes = async () => {
    const data = await getSubtype();
    if (data) {
      const formatted = data.map((s: subtypeGetDataInterface) => ({
        ...s,
        Name: s.Name?.charAt(0).toUpperCase() + s.Name?.slice(1),
        Campaign: s.Campaign?.charAt(0).toUpperCase() + s.Campaign?.slice(1),
        CustomerType:
          s.CustomerType?.charAt(0).toUpperCase() + s.CustomerType?.slice(1),
      }));
      setSubtypes(formatted);
    }
  };

  useEffect(() => {
    fetchSubtypes();
  }, []);

  const filtered = useMemo(() => {
    return subtypes
      .filter(
        (s) =>
          keyword === "" ||
          s.Name.toLowerCase().includes(keyword.toLowerCase()) ||
          s.Campaign.toLowerCase().includes(keyword.toLowerCase()) ||
          s.CustomerType.toLowerCase().includes(keyword.toLowerCase())
      )
      .slice(0, Number(limit));
  }, [subtypes, keyword, limit]);

  const handleDelete = async (data: subtypeDialogDataInterface | null) => {
    if (!data) return;
    const res = await deleteSubtype(data.id);
    if (res) {
      toast.success("Customer Subtype deleted successfully!");
      setIsDeleteDialogOpen(false);
      setDeleteDialogData(null);
      fetchSubtypes();
      return;
    }
    toast.error("Failed to delete Customer Subtype.");
  };

  const handleEdit = (id?: string) => {
    router.push(`/masters/customer-subtype/edit/${id}`);
  };

  const handleClear = () => {
    setKeyword("");
    setLimit("10");
  };

  const totalTablePages = Math.max(1, Math.ceil(filtered.length / rowsPerTablePage));
  const indexOfLastRow = currentTablePage * rowsPerTablePage;
  const indexOfFirstRow = indexOfLastRow - rowsPerTablePage;
  const currentRows = filtered.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
            Dashboard <span className="text-gray-500 text-sm">/ Customer Subtype</span>
          </h1>
        </div>

        {/* DELETE POPUP */}

        <DeleteDialog<subtypeDialogDataInterface>
          isOpen={isDeleteDialogOpen}
          title="Are you sure you want to delete this followup?"
          data={deleteDialogData}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setDeleteDialogData(null);
          }}
          onDelete={handleDelete}
        />

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 relative">
          <Link href="/masters/customer-subtype/add">
            <button className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-[#4e6787] text-white px-4 py-2 rounded-md absolute right-4 top-4 hover:cursor-pointer font-semibold">
              <PlusSquare size={18} /> Add
            </button>
          </Link>

          <form className="w-full flex flex-wrap gap-6 items-end mb-6 mt-16">
            <div className="flex flex-col flex-1 w-60">
              <label htmlFor="keyword" className="text-lg font-medium text-gray-900 pl-1">Keyword</label>
              <input
                id="keyword"
                type="text"
                placeholder="Search by name, campaign or type..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full outline-none border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800"
              />
            </div>

            <div className="flex flex-col w-40">
              <label htmlFor="limit" className="text-lg font-medium text-gray-900 pl-1">Limit</label>
              <select
                id="limit"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="h-10 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>

            <div className="flex gap-3 ml-auto">
              <button type="button" onClick={handleClear} className="px-4 py-2 text-sm hover:underline transition-all">Clear Search</button>
            </div>
          </form>

          <div className="border border-gray-400 rounded-md m-2 overflow-auto">
            <table className="table-auto w-full border-collapse text-sm">
              <thead className="bg-gray-900 text-white">
                <tr className="flex justify-between items-center w-full">
                  <th className="flex items-center gap-8 px-8 py-3 text-left w-2/3">
                    <p className="w-[60px]">S.No.</p>
                    <p className="w-[160px]">Campaign</p>
                    <p className="w-[160px]">Customer Type</p>
                    <p className="w-[200px]">Name</p>
                  </th>

                  <th className="flex items-center gap-10 px-8 py-3 text-left w-1/3 justify-end">
                    <p className="w-[120px]">Status</p>
                    <p className="w-[120px]">Action</p>
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((s, i) => (
                    <tr key={s._id || i} className="border-t flex justify-between items-center w-full hover:bg-[#f7f6f3] transition-all duration-200">
                      <td className="flex items-center gap-8 px-8 py-3 w-2/3">
                        <p className="w-[60px]">{indexOfFirstRow + i + 1}</p>
                        <p className="w-[160px]">{s.Campaign}</p>
                        <p className="w-[160px] text-gray-700">{s.CustomerType}</p>
                        <p className="w-[200px] font-semibold">{s.Name}</p>
                      </td>

                      <td className="flex items-center gap-10 px-8 py-3 w-1/3 justify-end">
                        <div className="w-[120px]">
                          <span className={`px-3 py-1 rounded-[2px] text-xs font-semibold ${s.Status === "Active" ? "bg-[#C8E6C9] text-green-700" : "bg-red-100 text-red-700"}`}>
                            {s.Status}
                          </span>
                        </div>

                        <div className="w-[120px] flex gap-2 items-center justify-start">
                          <Button
                            sx={{ backgroundColor: "#C8E6C9", color: "#2E7D32", minWidth: "32px", height: "32px", borderRadius: "8px" }}
                            onClick={() => handleEdit(s._id || String(i))}
                          >
                            <MdEdit />
                          </Button>

                          <Button
                            sx={{ backgroundColor: "#F9D0C4", color: "#C62828", minWidth: "32px", height: "32px", borderRadius: "8px" }}
                            onClick={() => {
                              setIsDeleteDialogOpen(true);
                              setDeleteDialogData({ id: s._id || String(i), Name: s.Name, Status: s.Status });
                            }}
                          >
                            <MdDelete />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">No customer subtypes found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-3 py-3 px-5">
              <p className="text-sm">Page {currentTablePage} of {totalTablePages}</p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setCurrentTablePage(p => Math.max(1, p - 1))} disabled={currentTablePage === 1} className="px-3 py-1 bg-gray-200 border border-gray-300 rounded disabled:opacity-50">Prev</button>
                <button type="button" onClick={() => setCurrentTablePage(p => (p < totalTablePages ? p + 1 : p))} disabled={currentTablePage === totalTablePages || currentRows.length <= 0} className="px-3 py-1 bg-gray-200 border border-gray-300 rounded disabled:opacity-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
