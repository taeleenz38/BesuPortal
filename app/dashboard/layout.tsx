"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LoadingAnimation from "../components/atoms/LoadingAnimation";

interface LayoutProps {
  children: ReactNode;
}
var isValidationInProgress = false;

export default function Layout({ children }: LayoutProps) {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isValidationInProgress) {
  //     (async () => {
  //       isValidationInProgress = true;
  //       const state = await validateUser();
  //       if (!state) {
  //         router.push("/");
  //       }
  //       setIsAuthenticated(state);
  //       isValidationInProgress = false;
  //     })();
  //   }
  // }, []);

  {
    return (
      <>
        <div className="flex p-0 m-0 w-screen h-screen text-black">
          <Navbar />
          <main className="bg-[#F2F4F8] overflow-scroll w-full">
            {children}
          </main>
        </div>
      </>
    );
  }

  return <LoadingAnimation />;
}

// async function validateUser(): Promise<boolean> {
//   try {
//     const response = await axios.get("/api/auth/validate");
//     if (response.data.isAuthenticated) {
//       return true;
//     }
//   } catch (error) {
//     return false;
//   }
//   return false;
// }
