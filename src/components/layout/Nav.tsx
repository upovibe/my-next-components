import React from "react";
import Link from "next/link";
import Logo from '@/components/common/Logo'
import ThemeSwitcher from "@/components/common/ThemeSwitcher";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
            <Logo/>
          <Link href="/">Home</Link>
          <ThemeSwitcher/>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
