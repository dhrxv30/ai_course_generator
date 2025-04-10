import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-5 shadow-sm">
      <Image src={"/logo.svg"} alt="Website Logo" height={100} width={100} />
      <Link href={"/dashboard"}>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
};

export default Header;
