import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      Expendifii Home. You need to login to access the website.{" "}
      <Link href="/login" className="text-blue-500 underline">
        Login
      </Link>
    </div>
  );
};

export default Page;
