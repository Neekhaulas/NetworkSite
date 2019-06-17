import React, { useContext } from "react";
import Link from "next/link";
import { UserContext } from "../pages/_app";

export default function AppBar() {
  const user = useContext(UserContext);
  return (
    <header className="AppBar">
      <Link href="/">
        <a>Home</a>
      </Link>
      -
      <Link href="/about">
        <a>About Us</a>
      </Link>
      -
      <Link href="/login">
        <a>Login</a>
      </Link>
    </header>
  );
}
