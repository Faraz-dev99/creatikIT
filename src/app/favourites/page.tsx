'use client';
import { useEffect, useState } from "react";
import { MdEdit, MdDelete, MdFavoriteBorder, MdFavorite } from "react-icons/md";
import Button from "@mui/material/Button";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../component/ProtectedRoutes";
import DeleteDialog from "../component/popups/DeleteDialog";
import toast from "react-hot-toast";
import {
  customerGetDataInterface,
  DeleteDialogDataInterface,
} from "@/store/customer.interface";
import {
  deleteCustomer,
  getFavoutiteCustomer,
  updateCustomer,
} from "@/store/customer";

interface FavouriteDialogDataInterface {
  id: string;
  name: string;
  ContactNumber: string;
  isFavourite?: boolean;
}

export default function FavouritePage() {
  const router = useRouter();
  const [favouriteData, setFavouriteData] = useState<customerGetDataInterface[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFavouriteDialogOpen, setIsFavouriteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] = useState<DeleteDialogDataInterface | null>(null);
  const [favouriteDialogData, setFavouriteDialogData] = useState<FavouriteDialogDataInterface | null>(null);
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const rowsPerTablePage = 10;

  useEffect(() => {
    getFavouriteData();
  }, []);

  const getFavouriteData = async () => {
    const data = await getFavoutiteCustomer();
    if (data) setFavouriteData(data);
  };

  const handleDelete = async (data: DeleteDialogDataInterface | null) => {
    if (!data) return;
    const response = await deleteCustomer(data.id);
    if (response) {
      toast.success(`Customer deleted successfully`);
      setIsDeleteDialogOpen(false);
      setDeleteDialogData(null);
      getFavouriteData();
    }
  };

  const handleEdit = (id: string | number) => {
    router.push(`/customer/edit/${id}`);
  };

  const handleFavouriteConfirm = async (data: FavouriteDialogDataInterface | null) => {
    if (!data) return;
    const formData = new FormData();
    formData.append("isFavourite", (!data.isFavourite).toString());
    const res = await updateCustomer(data.id, formData);
    if (res) {
      toast.success("Favourite status updated successfully");
      setIsFavouriteDialogOpen(false);
      setFavouriteDialogData(null);
      getFavouriteData();
    } else {
      toast.error("Failed to update favourite");
    }
  };

  const totalTablePages = Math.ceil(favouriteData.length / rowsPerTablePage);
  const indexOfLastRow = currentTablePage * rowsPerTablePage;
  const indexOfFirstRow = indexOfLastRow - rowsPerTablePage;
  const currentRows = favouriteData.slice(indexOfFirstRow, indexOfLastRow);

  const nexttablePage = () => {
    if (currentTablePage !== totalTablePages) setCurrentTablePage(currentTablePage + 1);
  };
  const prevtablePage = () => {
    if (currentTablePage !== 1) setCurrentTablePage(currentTablePage - 1);
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-56px)] overflow-auto bg-gray-200 max-md:py-10">
        <Toaster position="top-right" />

        {/* DELETE POPUP */}
        <DeleteDialog<DeleteDialogDataInterface>
          isOpen={isDeleteDialogOpen}
          title="Are you sure you want to delete this favourite?"
          data={deleteDialogData}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setDeleteDialogData(null);
          }}
          onDelete={handleDelete}
        />

        {/* FAVOURITE CONFIRMATION POPUP */}
        <DeleteDialog<FavouriteDialogDataInterface>
          isOpen={isFavouriteDialogOpen}
          title="Are you sure you want to favourite/unfavourite this customer?"
          data={favouriteDialogData}
          onClose={() => {
            setIsFavouriteDialogOpen(false);
            setFavouriteDialogData(null);
          }}
          onDelete={handleFavouriteConfirm}
        />

        <div className="p-4 max-md:p-3 w-full">
          <div className="flex justify-between items-center">
            <h2 className="flex gap-2 items-center font-light">
              <span className="text-gray-900 text-2xl">Dashboard</span>/<span>Favourites</span>
            </h2>
          </div>

          {/* TABLE */}
          <section className="flex flex-col mt-6 p-2 bg-white rounded-md">
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
                            sx={{
                              backgroundColor: "#E8F5E9",
                              color: "#2E7D32",
                              minWidth: "32px",
                              height: "32px",
                              borderRadius: "8px",
                            }}
                            onClick={() => handleEdit(item._id)}
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
                            onClick={() => {
                              setIsFavouriteDialogOpen(true);
                              setFavouriteDialogData({
                                id: item._id,
                                name: item.Name,
                                ContactNumber: item.ContactNumber,
                                isFavourite: item.isFavourite,
                              });
                            }}
                          >
                            {item.isFavourite ? <MdFavorite /> : <MdFavoriteBorder />}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center py-4 text-gray-500">
                        No favourite customers found.
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
