"use client";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { LuKey } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import PopUps from "./PopUps";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<
    "notifications" | "quickAdd" | "adminMail" | null
  >(null);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const quickAddRef = useRef<HTMLDivElement>(null);
  const adminMailRef = useRef<HTMLDivElement>(null);

  // outside click handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target as Node) &&
        quickAddRef.current &&
        !quickAddRef.current.contains(e.target as Node) &&
        adminMailRef.current &&
        !adminMailRef.current.contains(e.target as Node)
      ) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex max-md:flex-col max-md:float-right max-md:mt-8 max-md:mr-2 max-md:rounded-md justify-between items-center max-md:max-w-[200px] bg-gray-950 text-gray-300">
      <div className=" max-md:hidden"/>
      <nav className="px-2">
        <ul className="flex max-md:flex-col max-md:justify-center max-md:items-center gap-2">
          {/* Notifications */}
          <li ref={notificationsRef} className="grid place-items-center relative">
            <div className="grid place-items-center w-full h-full max-md:text-xs text-gray-200 cursor-pointer p-4 hover:bg-gray-800">
<IoMdNotificationsOutline
              className=" text-xl"
              onClick={() =>
                setOpenMenu(openMenu === "notifications" ? null : "notifications")
              }
              onMouseEnter={() => setOpenMenu("notifications")}
            />
            </div>
            
            {openMenu === "notifications" && (
              <div className=" absolute top-full md:right-0 max-md:right-[-200px]">
                <PopUps>
                <div className="flex flex-col w-[300px] min-h-[400px]">
                  <div className="flex justify-between items-center py-4 px-4 w-full text-lg bg-gray-300">
                    <h3 className="text-gray-500">Notifications</h3>
                    <p className="text-sky-700">view all</p>
                  </div>
                  <div>{/* notification list */}</div>
                </div>
              </PopUps>
              </div>
              
            )}
          </li>

          {/* Quick Add */}
          <li ref={quickAddRef} className="flex items-center relative gap-2">
            <div
              className="flex items-center gap-2 w-full h-full text-gray-200 cursor-pointer p-4 hover:bg-gray-800"
              onClick={() => setOpenMenu(openMenu === "quickAdd" ? null : "quickAdd")}
              onMouseEnter={() => setOpenMenu("quickAdd")}
            >
              <FaPlus />
              <span className="">Quick Add</span>
              {openMenu === "quickAdd" ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>
            {openMenu === "quickAdd" && (
              <div className=" absolute top-full right-0">
              <PopUps>
                <div className="flex flex-col">
                  {[
                    "Add State",
                    "Add City",
                    "Add Sub Location",
                    "Add Functional Area",
                    "Add Industry",
                    "Add Salary",
                    "Add Experience",
                    "Add Campaign",
                    "Add Expense",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 hover:bg-gray-200 py-4 px-4"
                    >
                      <FaPlus className="text-gray-700" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </PopUps>
              </div>
            )}
          </li>

          {/* Admin Mail */}
          <li ref={adminMailRef} className="flex items-center relative cursor-pointer gap-2 p-4 hover:bg-gray-800">
            <div
              className="flex items-center gap-2 w-full h-full text-gray-200"
              onClick={() => setOpenMenu(openMenu === "adminMail" ? null : "adminMail")}
              onMouseEnter={() => setOpenMenu("adminMail")}
            >
              <span className="">admin mail</span>
              {openMenu === "adminMail" ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>
            {openMenu === "adminMail" && (
              <div className=" absolute top-full right-0">
              <PopUps>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 hover:bg-gray-200 py-3 px-3">
                    <IoPersonOutline />
                    <p>Edit Profile</p>
                  </div>
                  <div className="flex items-center gap-2 hover:bg-gray-200 py-3 px-3">
                    <LuKey />
                    <p>Change Password</p>
                  </div>
                  <div className="flex items-center gap-2 hover:bg-gray-200 py-3 px-3">
                    <CiLogout />
                    <p>Logout</p>
                  </div>
                </div>
              </PopUps>
              </div>
            )}
          </li>

          {/* Logout button */}
          <li className="grid place-items-center relative cursor-pointer text-xl p-4 hover:bg-gray-800">
            <CiLogout />
          </li>
        </ul>
      </nav>
    </div>
  );
}
