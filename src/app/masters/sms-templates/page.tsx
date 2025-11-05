"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import Button from "@mui/material/Button";
import { PlusSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import PopupMenu from "../../component/popups/PopupMenu";

interface SMSTemplate {
  _id?: string;
  Name: string;
  Status: string;
}

interface DeleteDialogData {
  id: string;
  name: string;
}

export default function SmsTemplatesPage() {
  const [smsTemplates, setSmsTemplates] = useState<SMSTemplate[]>([]);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState("10");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] = useState<DeleteDialogData | null>(null);
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const rowsPerTablePage = 10;
  const router = useRouter();

  // Fetch SMS Templates (dummy data)
  const fetchSmsTemplates = async () => {
    const data = [
      { Name: "Welcome Message", Status: "Active" },
      { Name: "Payment Reminder", Status: "Inactive" },
      { Name: "Subscription Renewal", Status: "Active" },
    ];

    const formattedData = data.map((i) => ({
      ...i,
      Name: i.Name.charAt(0).toUpperCase() + i.Name.slice(1),
    }));

    setSmsTemplates(formattedData);
  };

  useEffect(() => {
    fetchSmsTemplates();
  }, []);

  // Filtered Data
  const filteredSmsTemplates = useMemo(() => {
    return smsTemplates
      .filter((i) => keyword === "" || i.Name.toLowerCase().includes(keyword.toLowerCase()))
      .slice(0, Number(limit));
  }, [smsTemplates, keyword, limit]);

  const handleDelete = async (data: DeleteDialogData | null) => {
    /* Delete logic (API call) */
  };

  const handleEdit = (id?: string) => {
    router.push(`/sms-templates/edit?id=${id}`);
  };

  const handleClear = () => {
    setKeyword("");
    setLimit("10");
  };

  const totalTablePages = Math.ceil(filteredSmsTemplates.length / rowsPerTablePage);
  const indexOfLastRow = currentTablePage * rowsPerTablePage;
  const indexOfFirstRow = indexOfLastRow - rowsPerTablePage;
  const currentRows = filteredSmsTemplates.slice(indexOfFirstRow, indexOfLastRow);

  const nexttablePage = () => {
    if (currentTablePage !== totalTablePages) setCurrentTablePage(currentTablePage + 1);
  };
  const prevtablePage = () => {
    if (currentTablePage !== 1) setCurrentTablePage(currentTablePage - 1);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-slate-100 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
            Dashboard <span className="text-gray-500 text-sm">/ SMS Templates</span>
          </h1>
        </div>

        {/* DELETE POPUP */}
        {isDeleteDialogOpen && deleteDialogData && (
          <PopupMenu
            onClose={() => {
              setIsDeleteDialogOpen(false);
              setDeleteDialogData(null);
            }}
          >
            <div className="flex flex-col gap-10 m-2">
              <h2 className="font-bold">Are you sure you want to delete this SMS Template?</h2>
              <p>
                Name: <span className="text-gray-600">{deleteDialogData.name}</span>
              </p>
              <div className="flex justify-between items-center">
                <button
                  className="text-[#C62828] bg-[#FDECEA] hover:bg-[#F9D0C4] rounded-md px-4 py-2"
                  onClick={() => handleDelete(deleteDialogData)}
                >
                  Yes, delete
                </button>
                <button
                  className="text-blue-800 hover:bg-gray-200 rounded-md px-4 py-2"
                  onClick={() => {
                    setIsDeleteDialogOpen(false);
                    setDeleteDialogData(null);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </PopupMenu>
        )}

        {/* Card Container */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 relative">
          {/* Add Button */}
          <Link href="/sms-templates/add">
            <button className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-[#4e6787] text-white px-4 py-2 rounded-md absolute right-4 top-4 hover:cursor-pointer font-semibold">
              <PlusSquare size={18} /> Add
            </button>
          </Link>

          {/* Filter Form */}
          <form className="w-full flex flex-wrap gap-6 items-end mb-6 mt-16">
            {/* Keyword */}
            <div className="flex flex-col flex-1 w-60">
              <label htmlFor="keyword" className="text-lg font-medium text-gray-900 pl-1">
                Keyword
              </label>
              <input
                id="keyword"
                type="text"
                placeholder="Search by SMS template..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full outline-none border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800"
              />
            </div>

            {/* Limit */}
            <div className="flex flex-col w-40">
              <label htmlFor="limit" className="text-lg font-medium text-gray-900 pl-1">
                Limit
              </label>
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

            {/* Clear */}
            <div className="flex gap-3 ml-auto">
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 text-sm hover:underline transition-all"
              >
                Clear Search
              </button>
            </div>
          </form>

          {/* Table */}
          <div className="border border-gray-400 rounded-md m-2 overflow-auto">
            <table className="table-auto w-full border-collapse text-sm">
              <thead className="bg-gray-900 text-white">
                <tr className="flex justify-between items-center w-full">
                  <th className="flex items-center gap-10 px-8 py-3 text-left w-1/2">
                    <p className="w-[60px] text-left">S.No.</p>
                    <p className="w-[200px] text-left">Name</p>
                  </th>
                  <th className="flex items-center gap-10 px-8 py-3 text-left w-1/2 justify-end">
                    <p className="w-[120px] text-left">Status</p>
                    <p className="w-[120px] text-left">Action</p>
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((i, index) => (
                    <tr
                      key={i._id || index}
                      className="border-t flex justify-between items-center w-full hover:bg-[#f7f6f3] transition-all duration-200"
                    >
                      <td className="flex items-center gap-10 px-8 py-3 w-1/2">
                        <p className="w-[60px]">{index + 1}</p>
                        <p className="w-[200px] font-semibold">{i.Name}</p>
                      </td>

                      <td className="flex items-center gap-10 px-8 py-3 w-1/2 justify-end">
                        <div className="w-[120px]">
                          <span
                            className={`px-3 py-1 rounded-[2px] text-xs font-semibold ${
                              i.Status === "Active"
                                ? "bg-[#C8E6C9] text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {i.Status}
                          </span>
                        </div>

                        <div className="w-[120px] flex gap-2 items-center justify-start">
                          <Button
                            sx={{
                              backgroundColor: "#C8E6C9",
                              color: "#2E7D32",
                              minWidth: "32px",
                              height: "32px",
                              borderRadius: "8px",
                            }}
                            onClick={() => handleEdit(i._id || String(index))}
                          >
                            <MdEdit />
                          </Button>

                          <Button
                            sx={{
                              backgroundColor: "#F9D0C4",
                              color: "#C62828",
                              minWidth: "32px",
                              height: "32px",
                              borderRadius: "8px",
                            }}
                            onClick={() => {
                              setIsDeleteDialogOpen(true);
                              setDeleteDialogData({
                                id: i._id || String(index),
                                name: i.Name,
                              });
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
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      No SMS templates match your search.
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
        </div>
      </div>
    </>
  );
}
