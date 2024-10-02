import Link from 'next/link';

const Logo = () => (
    <Link href="/" className="flex items-center gap-2 p-[5px] bg-background rounded-xl w-max shadow-md">
        {/* "MC" for medium and smaller screens */}
        <div className="md:hidden flex items-center gap-1">
            <span className="bg-primary text-white px-3 py-1 rounded-lg text-2xl font-bold">
                M
            </span>
            <span className='h-10 w-0.5 bg-primary'></span>
            <span className="bg-secondary text-white px-3 py-1 rounded-lg text-2xl font-bold">
                C
            </span>
        </div>

        {/* Full "MyComponent" logo for larger screens */}
        <div className="hidden md:flex items-center">
            <span className="bg-primary text-white px-3 py-1 rounded-lg text-2xl font-bold">
                M
            </span>
            <span className="text-gray-900 text-2xl font-semibold border-b-2 border-primary pb-[2px]">
                y
                <span className="text-primary text-2xl font-extrabold">
                    Component
                </span>
            </span>
        </div>
    </Link>
);

export default Logo;
