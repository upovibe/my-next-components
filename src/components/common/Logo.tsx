import Link from "next/link";
import Image from "next/image";

const Logo = () => (
  <Link
    href="/"
    className="flex items-center gap-2 p-[5px] bg-background rounded-xl w-max transition-all duration-200 ease-linear bg-secondary dark:bg-dim"
  >
    {/* "MC" for medium and smaller screens */}
    <div className="md:hidden flex items-center gap-1">
      <Image
        src="/images/logo/Logo.png"
        alt="Logo"
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>

    {/* Full "MyComponent" logo for larger screens */}
    <div className="hidden md:flex items-center gap-1">
      <Image
        src="/images/logo/Logo.png"
        alt="Logo"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="font-bold text-deep dark:text-light"> Edu-Portal</div>
    </div>
  </Link>
);

export default Logo;
