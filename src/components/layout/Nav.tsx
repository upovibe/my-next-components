"use client"; 

import { React } from "react";
import Link from "next/link";
import {FaHome, FaGithub, FaSignInAlt, FaUserAlt, FaInfo } from "react-icons/fa";
import Logo from "@/components/common/Logo";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import NavMenu from "@/components/navigations/NavMenu";
import SearchInput from "@/components/inputs/SearchInput";
import Divider from "@/components/basics/Divider";
import LinkButton from "@/components//buttons/LinkButton";

const Nav: React.FC = () => {
  const menuItems = [
    { label: "Home", href: "/", icon: FaHome },
    { label: "About", href: "/about", icon: FaInfo },
    { label: "Services", href: "/services", icon: FaInfo },
    {
      label: "Help",
      icon: FaUserAlt,
      children: [
        { label: "Contact", href: "/help/contact" },
        { label: "Faq", href: "/help/faq" },
      ],
    },
    {
      label: "Policies",
      icon: FaUserAlt,
      children: [
        { label: "Privacy", href: "/policies/privacy" },
        { label: "Terms", href: "/policies/terms" },
      ],
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
      <LinkButton href="/signin" icon={<FaSignInAlt/>} iconPosition="right" className="bg-highlight px-2 py-1 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-highlight/50">
        Sign Up
      </LinkButton>
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
