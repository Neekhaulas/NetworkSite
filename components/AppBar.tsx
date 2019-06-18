import React from "react";
import Link from "next/link";

export default function AppBar() {
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
