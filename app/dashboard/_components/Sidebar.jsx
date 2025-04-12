"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  HiOutlineHome,
  HiMiniServerStack,
  HiOutlineShieldCheck,
  HiOutlinePower,
} from "react-icons/hi2";
import { Progress } from "@/components/ui/progress";

const Sidebar = () => {
  const menu = [
    {
      id: 1,
      name: "Home",
      icon: <HiOutlineHome />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiMiniServerStack />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <HiOutlineShieldCheck />,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "Logout",
      icon: <HiOutlinePower />,
      path: "/dashboard/logout",
    },
  ];

  const path = usePathname();

  return (
    <div className="fixed h-full md:w-64 shadow-md p-5">
      <Image src="/logo.png" alt="Logo" width={160} height={100} className="mb-5" />
      <hr className="my-5" />

      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            <Link href={item.path}>
              <div
                className={`flex items-center gap-2 text-gray-600 hover:text-black hover:bg-gray-100 cursor-pointer p-2 rounded-md ${
                  item.path === path ? "bg-gray-100 text-black" : ""
                }`}
              >
                <div className="text-3xl">{item.icon}</div>
                <div className="text-2xl">{item.name}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-10 w-[80%]">
        <Progress value={33} />
        <h2 className="text-sm mt-2 text-gray-600">3 out of 5 Courses Created</h2>
      </div>
    </div>
  );
};

export default Sidebar;
