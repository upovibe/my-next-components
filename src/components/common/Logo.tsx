import Link from 'next/link';

const Logo = () => (
    <Link href="/" className="flex items-center gap-2 p-[5px] md:px-2 bg-background rounded-xl w-max shadow-md bg-primary dark:bg-shade">
        {/* "MC" for medium and smaller screens */}
        <div className="md:hidden flex items-center gap-1">
            <span className="bg-dim dark:bg-secondary text-light dark:text-deep px-3 py-1 rounded-lg text-2xl font-bold">
                M
            </span>
            <span className='h-10 w-0.5 bg-muted dark:bg-faint'></span>
            <span className="bg-dim dark:bg-secondary text-light dark:text-deep px-3 py-1 rounded-lg text-2xl font-bold">
                C
            </span>
        </div>

        {/* Full "MyComponent" logo for larger screens */}
        <div className="hidden md:flex items-center">
            <span className="bg-dim dark:bg-secondary text-light dark:text-deep px-3 py-1 rounded-lg text-2xl font-bold">
                M
            </span>
            <span className="text-soft dark:text-pale text-2xl font-semibold border-b-2 border-muted dark:border-faint pb-[2px]">
                y
                <span className="text-soft dark:text-pale text-2xl font-extrabold">
                    Component
                </span>
            </span>
        </div>
    </Link>
);

export default Logo;
