import Link from "next/link";
import Logo from "@/components/common/Logo";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-row-reverse items-center justify-between p-2 border-t border-muted dark:border-faint bg-primary dark:bg-shade">
      <Logo />
      <Link
        href="https://github.com/upovibe/my-next-components.git"
        target="_blank"
        rel="noopener noreferrer"
        className="size-8 bg-secondary dark:bg-dim border border-border dark:border-coal rounded-md flex items-center justify-center"
      >
        <FaGithub
        />
      </Link>
    </footer>
  );
};

export default Footer;
