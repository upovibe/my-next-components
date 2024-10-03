import Link from "next/link";
import Logo from "@/components/common/Logo";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-row-reverse items-center justify-between p-2 border-t border-muted dark:border-faint">
      <Logo />
      <Link
        href="https://github.com/upovibe/my-next-components.git"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub className="text-2xl text-soft dark:text-pale hover:scale-105 hover:font-bold hover:text-deep transition-all duration-200 ease-linear" />
      </Link>
    </footer>
  );
};

export default Footer;
