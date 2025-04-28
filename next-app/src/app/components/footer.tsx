// "use client";

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
    return (
        <footer
            className={`bg-gray-900 text-gray-700 p-6 sm:py-9 ${className}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 品牌和版權 */}
                    <div>
                        <div className="text-xl sm:text-2xl font-bold mb-2 text-white">
                            My Website
                        </div>
                        <p className="text-sm sm:text-base text-gray-300">
                            &copy; {new Date().getFullYear()} My Website, Inc.
                        </p>
                    </div>

                    {/* 連結 */}
                    {/* <div className="flex-col"></div> */}
                    <div className="flex flex-wrap md:flex-row justify-start md:justify-end space-y-10 md:space-y-6 space-x-6 md:space-x-8">
                        {[
                            "Home",
                            "About",
                            "Contact",
                            "Services",
                            "Enhance",
                            "Login",
                        ].map((link) => (
                            <a
                                key={link}
                                href={`/pages/${link.toLowerCase()}`}
                                className="text-gray-200 hover:underline inline-block px-1"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
