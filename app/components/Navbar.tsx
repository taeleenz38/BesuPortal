"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Username from "./atoms/Username";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white p-2 xl:p-4 xl:hidden border-b-[1px] border-[#DDE1E6]">
        <button onClick={toggleMenu} className="focus:outline-none">
          <Image src="/images/LOGO2.png" alt="Logo2" width={80} height={80} />
        </button>
      </div>

      <div
        className={`bg-white flex flex-col absolute top-0 left-0 z-10 h-screen w-[350px] p-8 text-black border-r-[1px] border-[#DDE1E6] transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0`}
      >
        <button
          onClick={toggleMenu}
          className="xl:hidden self-end mb-4 focus:outline-none"
        >
          <CloseIcon />
        </button>

        <Image
          src="/images/LOGO2.png"
          alt="Logo2"
          width={125}
          height={125}
          className="mx-auto mb-8"
        />
        <div className="flex mb-8">
          <Image src="/images/user.png" alt="User" width={50} height={50} />{" "}
          <Username text="Ted Hansen" />
        </div>
        <div className="nav-items border-[1px] border-[#F2F4F8]">
          <Link
            href="/dashboard"
            className="flex p-3 border-b-[1px] border-[#F2F4F8] hover:bg-[#F2F4F8]"
            onClick={() => setMenuOpen(false)}
          >
            <Image src="/images/home.png" alt="Home" width={25} height={25} />
            <h2 className="self-center ml-2 font-medium">Home</h2>
          </Link>
          <Link
            href="/dashboard/myAccount"
            className="flex p-3 border-b-[1px] border-[#F2F4F8] hover:bg-[#F2F4F8]"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/images/folder.png"
              alt="Account Settings"
              width={25}
              height={25}
            />
            <h2 className="self-center ml-2 font-medium">My Account</h2>
          </Link>
          <Link
            href="/dashboard/marketplace"
            className="flex p-3 border-b-[1px] border-[#F2F4F8] hover:bg-[#F2F4F8]"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/images/folder.png"
              alt="Account Settings"
              width={25}
              height={25}
            />
            <h2 className="self-center ml-2 font-medium">Marketplace</h2>
          </Link>
          <Link
            href="/dashboard/accountSettings"
            className="flex p-3 border-b-[1px] border-[#F2F4F8] hover:bg-[#F2F4F8]"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/images/folder.png"
              alt="Account Settings"
              width={25}
              height={25}
            />
            <h2 className="self-center ml-2 font-medium">Account Settings</h2>
          </Link>
          {/* <Link
            href="/dashboard/bankAccount"
            className="flex p-3 border-b-[1px] border-[#F2F4F8] hover:bg-[#F2F4F8]"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/images/folder.png"
              alt="Bank Account"
              width={25}
              height={25}
            />
            <h2 className="self-center ml-2 font-medium">Bank Accounts</h2>
          </Link> */}
          <Link
            href="/dashboard/walletAddress"
            className="flex p-3 hover:bg-[#F2F4F8]"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/images/folder.png"
              alt="Wallet Address Book"
              width={25}
              height={25}
            />
            <h2 className="self-center ml-2 font-medium">
              Connect Wallet
            </h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

//
