'use client';

import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { PlusSquare } from "lucide-react";
import Button from "@mui/material/Button";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ProtectedRoute from "@/app/component/ProtectedRoutes";
import PopupMenu from "@/app/component/popups/PopupMenu";
import SingleSelect from "@/app/component/SingleSelect";
import toast from "react-hot-toast";

import {
  ExpenseMarketingGetDataInterface,
  ExpenseMarketingDialogDataInterface,
} from "@/store/financial/expensemarketing/expensemarketing.interface";

import {
  deleteExpenseMarketing,
  getFilteredExpenseMarketing,
  getExpenseMarketing,
} from "@/store/financial/expensemarketing/expensemarketing";

import DeleteDialog from "@/app/component/popups/DeleteDialog";

export default function FinanceExpense() {
  const router = useRouter();

  const [expenseData, setExpenseData] = useState<ExpenseMarketingGetDataInterface[]>([]);
  const [filters, setFilters] = useState({
    User: [] as string[],
    Expense: [] as string[],
    PaymentMethode: [] as string[],
    Keyword: "" as string,
    Limit: [] as string[],
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] = useState<ExpenseMarketingDialogDataInterface | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    getExpenseList();
  }, []);

  const getExpenseList = async () => {
    const data = await getExpenseMarketing();
    if (data) setExpenseData(data);
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

    const queryParams = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((v) => queryParams.append(key, v));
      } else if (typeof value === "string" && value) {
        queryParams.append(key, value);
      }
    });

    const data = await getFilteredExpenseMarketing(queryParams.toString());
    if (data) setExpenseData(data);
  };

  const clearFilter = async () => {
    setFilters({
      User: [],
      Expense: [],
      PaymentMethode: [],
      Keyword: "",
      Limit: [],
    });
    await getExpenseList();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await deleteExpenseMarketing(deleteId);
    if (res) {
      toast.success("Expense record deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeleteDialogData(null);
      setDeleteId(null);
      getExpenseList();
    } else {
      toast.error("Failed to delete expense record");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(expenseData.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = expenseData.slice(startIndex, startIndex + rowsPerPage);

  // Dummy dropdown options (replace with dynamic adv API if available)
  const users = ["Admin", "Staff1", "Staff2"];
  const expenses = ["Purchase", "Salary", "Utility"];
  const paymentMethods = ["Cash", "UPI", "Bank Transfer"];
  const limits = ["10", "25", "50", "100"];

  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-56px)] overflow-auto bg-gray-200 max-md:py-10">
        <Toaster position="top-right" />

        {/* DELETE POPUP */}
        <DeleteDialog<ExpenseMarketingDialogDataInterface>
          isOpen={isDeleteDialogOpen}
          title="Are you sure you want to delete this expense?"
          data={deleteDialogData}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setDeleteDialogData(null);
            setDeleteId(null);
          }}
          onDelete={handleDelete}
        />

        <div className="p-4 w-full">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="flex gap-2 items-center font-light">
              <span className="text-gray-900 text-2xl">Dashboard</span>/
              <span>Finance / Expense</span>
            </h2>

            <Link href="/financial/expense_marketings/add">
              <button className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-[#4e6787] text-white px-4 py-2 rounded-md hover:cursor-pointer font-semibold">
                <PlusSquare size={18} /> Add
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
                options={users}
                label="User"
                value={filters.User[0]}
                onChange={(val) => handleSelectChange("User", val)}
              />
              <SingleSelect
                options={expenses}
                label="Expense"
                value={filters.Expense[0]}
                onChange={(val) => handleSelectChange("Expense", val)}
              />
              <SingleSelect
                options={paymentMethods}
                label="Payment Method"
                value={filters.PaymentMethode[0]}
                onChange={(val) => handleSelectChange("PaymentMethode", val)}
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
            <div className="border border-gray-300 rounded-md m-2 overflow-auto">
            <table className="table-auto w-full border-collapse text-sm">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">S.No.</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Party Name</th>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Expense</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Due Amount</th>
                  <th className="px-4 py-3 text-left">Payment Method</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
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
                      <td className="px-4 py-3">{item.Date}</td>
                      <td className="px-4 py-3">{item.PartyName}</td>
                      <td className="px-4 py-3">{item.User}</td>
                      <td className="px-4 py-3">{item.Expense}</td>
                      <td className="px-4 py-3">{item.Amount}</td>
                      <td className="px-4 py-3">{item.DueAmount}</td>
                      <td className="px-4 py-3">{item.PaymentMethode}</td>
                      <td className="px-4 py-3">{item.Status}</td>
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
                            router.push(`/financial/expense_marketings/edit/${item._id}`)
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
                            setDeleteDialogData({
                              id: item._id,
                              PartyName: item.PartyName,
                              Amount: item.Amount,
                            });
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
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 border border-gray-300 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
                  }
                  disabled={currentPage === totalPages}
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
