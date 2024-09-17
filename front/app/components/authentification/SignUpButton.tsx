"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export function SignUpButton() {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/authentification/register");
  };

  return (
    <p className="text-center font-semibold">
      Don&rsquo;t have an account?
      <Link
        href="#"
        onClick={handleClick}
        className="text-green-500 ml-2 hover:underline cursor-pointer"
      >
        Sign up
      </Link>
    </p>
  );
}
