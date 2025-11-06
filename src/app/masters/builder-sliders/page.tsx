"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import Button from "@mui/material/Button";
import { PlusSquare } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  builderslidersGetDataInterface,
  DeleteDialogDataInterface,
} from "@/store/masters/buildersliders/buildersliders.interface";

import {
  getBuildersliders,
  deleteBuildersliders,
} from "@/store/masters/buildersliders/buildersliders";

import DeleteDialog from "@/app/component/popups/DeleteDialog";

export default function BuilderSlidersPage() {
  const [sliders, setSliders] = useState<builderslidersGetDataInterface[]>([]);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState("10");

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] =
    useState<DeleteDialogDataInterface | null>(null);

  const [currentTablePage, setCurrentTablePage] = useState(1);
  const rowsPerTablePage = 10;

  const router = useRouter();

  // ✅ Fetch sliders
  const fetchSliders = async () => {
    const data = await getBuildersliders();
    if (!data) return;
    console.log(data)
    setSliders(data);
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // ✅ Filter + limit logic
  const filteredSliders = useMemo(() => {
    return sliders
      .filter(
        (s) =>
          keyword === "" ||
          s.Status.toLowerCase().includes(keyword.toLowerCase())
      )
      .slice(0, Number(limit));
  }, [sliders, keyword, limit]);

  // ✅ Delete
  const handleDelete = async (data: DeleteDialogDataInterface | null) => {
    if (!data) return;

    const res = await deleteBuildersliders(data.id);

    if (res) {
      toast.success("Builder Slider deleted successfully!");
      setIsDeleteDialogOpen(false);
      setDeleteDialogData(null);
      fetchSliders();
      return;
    }
    toast.error("Failed to delete slider.");
  };

  // ✅ Edit
  const handleEdit = (id: string) => {
    router.push(`/masters/builder-sliders/edit/${id}`);
  };

  const handleClear = () => {
    setKeyword("");
    setLimit("10");
  };

  // ✅ Pagination
  const totalTablePages = Math.ceil(filteredSliders.length / rowsPerTablePage);
  const indexOfLastRow = currentTablePage * rowsPerTablePage;
  const indexOfFirstRow = indexOfLastRow - rowsPerTablePage;
  const currentRows = filteredSliders.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const nexttablePage = () => {
    if (currentTablePage !== totalTablePages)
      setCurrentTablePage(currentTablePage + 1);
  };

  const prevtablePage = () => {
    if (currentTablePage !== 1)
      setCurrentTablePage(currentTablePage - 1);
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-slate-100 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
            Dashboard <span className="text-gray-500 text-sm">/ Builder Sliders</span>
          </h1>
        </div>

        {/* Delete Dialog */}
        <DeleteDialog<DeleteDialogDataInterface>
          isOpen={isDeleteDialogOpen}
          title="Are you sure you want to delete this slider?"
          data={deleteDialogData}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setDeleteDialogData(null);
          }}
          onDelete={handleDelete}
        />

        {/* Card container */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 relative">

          {/* Add Button */}
          <Link href="/masters/builder-sliders/add">
            <button className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-[#4e6787] text-white px-4 py-2 rounded-md absolute right-4 top-4 hover:cursor-pointer font-semibold">
              <PlusSquare size={18} /> Add
            </button>
          </Link>

          {/* Filter Form */}
          <form className="w-full flex flex-wrap gap-6 items-end mb-6 mt-16">
            <div className="flex flex-col flex-1 min-w-[250px]">
              <label className="text-lg font-medium text-gray-900 pl-1">
                Keyword
              </label>
              <input
                type="text"
                placeholder="Search by status..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full outline-none border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800"
              />
            </div>

            <div className="flex flex-col w-40">
              <label className="text-lg font-medium text-gray-900 pl-1">
                Limit
              </label>
              <select
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="h-10 border border-gray-300 rounded-md px-3 text-gray-800"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>

            <div className="flex gap-3 ml-auto">
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 text-sm hover:underline"
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
                    <p className="w-[60px]">S.No.</p>
                    <p className="w-[200px]">Image</p>
                  </th>
                  <th className="flex items-center gap-10 px-8 py-3 text-left w-1/2 justify-end">
                    <p className="w-[120px]">Status</p>
                    <p className="w-[120px]">Action</p>
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((s, i) => (
                    <tr
                      key={s._id}
                      className="border-t flex justify-between items-center w-full hover:bg-gray-100 transition-all"
                    >
                      {/* LEFT */}
                      <td className="flex items-center gap-10 px-8 py-3 w-1/2">
                        <p className="w-[60px]">{i + 1}</p>

                        {/* Image Preview */}
                        <img
                          src={s.Image}
                          alt="slider"
                          className="w-28 h-16 rounded-md object-cover border"
                        />
                      </td>

                      {/* RIGHT */}
                      <td className="flex items-center gap-10 px-8 py-3 w-1/2 justify-end">
                        <div className="w-[120px]">
                          <span
                            className={`px-3 py-1 rounded-[2px] text-xs font-semibold ${
                              s.Status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {s.Status}
                          </span>
                        </div>

                        <div className="w-[120px] flex gap-2 items-center">
                          <Button
                            sx={{
                              backgroundColor: "#C8E6C9",
                              color: "#2E7D32",
                              minWidth: "32px",
                              height: "32px",
                              borderRadius: "8px",
                            }}
                            onClick={() => handleEdit(s._id)}
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
                              setDeleteDialogData({ id: s._id });
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
                    <td
                      colSpan={4}
                      className="text-center py-4 text-gray-500"
                    >
                      No sliders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* ✅ Pagination */}
            <div className="flex justify-between items-center mt-3 py-3 px-5">
              <p className="text-sm">
                Page {currentTablePage} of {totalTablePages}
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={prevtablePage}
                  disabled={currentTablePage === 1}
                  className="px-3 py-1 bg-gray-200 border rounded disabled:opacity-50"
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
                  className="px-3 py-1 bg-gray-200 border rounded disabled:opacity-50"
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
