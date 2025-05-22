import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogoFull = () => {
  return (
    <Link href={"/"} className="flex items-center">
      <Image
        src="/logo.svg"
        loading="lazy"
        placeholder="blur"
        blurDataURL="/blur.jpg"
        alt="logo"
        width="20"
        height="20"
      />
      <p>gora</p>
    </Link>
  );
};

export default LogoFull;
