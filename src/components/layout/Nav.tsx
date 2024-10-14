"use client"; 

import { React } from "react";
import Link from "next/link";
import {FaHome, FaGithub, FaSignInAlt, FaPhone, FaUserAlt, FaInfo } from "react-icons/fa";
import Logo from "@/components/common/Logo";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import NavMenu from "@/components/navigations/NavMenu";
import SearchInput from "@/components/form/inputs/SearchInput";
import Divider from "@/components/common/Divider";
import ButtonLink from "@/components/form/buttons/ButtonLink";

const Nav: React.FC = () => {
  const menuItems = [
    { label: "Home", href: "/", icon: FaHome },
    { label: "About", href: "/about", icon: FaInfo },
    {
      label: "Services",
      icon: FaUserAlt,
      children: [
        { label: "Web Development", href: "/services/web" },
        { label: "Mobile Development", href: "/services/mobile" },
      ],
    },
    {
      label: "Contact",
      href: "/contact",
      icon: FaPhone,
      command: () => alert("Contact clicked!"),
    },
  ];

  const actionElements = (
    <div className="flex items-center">
      <Divider layout="vertical" type="solid" className="mx-2" />
      <ThemeSwitcher className="flex items-center justify-center size-8 bg-secondary dark:bg-dim border border-border dark:border-coal rounded-md" />
      <Divider layout="vertical" type="solid" className="mx-2"/>
      <Link
        href="https://github.com/upovibe/my-next-components.git"
        target="_blank"
        rel="noopener noreferrer"
        className="size-8 bg-secondary dark:bg-dim border border-border dark:border-coal rounded-md flex items-center justify-center"
      >
        <FaGithub
        />
      </Link>
      <Divider layout="vertical" type="solid" className="mx-2" />
      <ButtonLink href="#" icon={FaSignInAlt} iconPosition="right" className="">
        Sign Up

      </ButtonLink>
    </div>
  );

  return (
    <NavMenu
      logo={<Logo />}
      items={menuItems}
      input={<SearchInput placeholder="search" showButton/>}
      actionElement={actionElements}
      className="mx-auto"
      displayType="sidebar"
    />
  );
};

export default Nav;
