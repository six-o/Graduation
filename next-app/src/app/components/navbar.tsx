"use client";

import { useState, useEffect, use } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
    className?: string;
}
// 呼叫後端清除 cookie
const res = async () =>
    await fetch("/api/users/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: `${localStorage.getItem("username")}`,
        }),
    });
const handleLogout = async () => {
    try {
        const data = await res();
        if (data.ok) {
            // 清除 localStorage 快取
            localStorage.removeItem("username");
            localStorage.removeItem("cookieTime");
            // 登出成功後的操作，例如導向到首頁
            window.location.href = "/pages/home";
        } else {
            console.error("登出失敗");
            alert(localStorage.getItem("username"));
        }
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

// 所以現階段是
// 在登入成功時，產生一組cookie、創建兩個localstorage包含username和cachetime
// 接下來是檢查cookie有沒有過期，
const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const checkCookie = async () => {
            const cacheUser = localStorage.getItem("username");
            const cacheTime = localStorage.getItem("cookieTime");

            if (cacheTime && Date.now() > parseInt(cacheTime)) {
                setUsername(null);
                try {
                    await res(); // 呼叫後端登出
                } catch (error) {
                    console.error("Error logging out:", error);
                }
                // cookie 過期，清除快取與 cookie
                localStorage.removeItem("username");
                localStorage.removeItem("cookieTime");
                window.location.href = "/pages/home"; // 導向登入頁
            } else if (cacheUser) {
                setUsername(cacheUser);
            }
        };

        checkCookie();
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50 ${className}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="text-2xl sm:text-3xl font-bold">
                        MyWebsite
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 lg:space-x-8 text-base lg:text-lg items-center">
                        {[
                            "Home",
                            "About",
                            "Contact",
                            "Services",
                            "Enhance",
                            "Login",
                        ].map((item) => (
                            <a
                                key={item}
                                href={`/pages/${item.toLowerCase()}`}
                                className="hover:text-gray-300"
                            >
                                {item}
                            </a>
                        ))}
                        {username && (
                            <div className="relative">
                                <button
                                    className="cursor-pointer hover:text-gray-300"
                                    onClick={() =>
                                        setUserMenuOpen(!userMenuOpen)
                                    }
                                >
                                    👤 {username}
                                </button>
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg z-50">
                                        <a
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            個人資料
                                        </a>
                                        <a
                                            onClick={handleLogout}
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            登出
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col bg-gray-800 space-y-1 px-4 py-3">
                    {[
                        "Home",
                        "About",
                        "Services",
                        "Contact",
                        "Enhance",
                        "Login",
                    ].map((item) => (
                        <a
                            key={item}
                            href={`/pages/${item.toLowerCase()}`}
                            className="block text-white hover:bg-gray-700 rounded px-2 py-2"
                        >
                            {item}
                        </a>
                    ))}

                    {username && (
                        <div className="flex flex-col text-white mt-2">
                            <button
                                className="py-2 text-left bg-gray-700 rounded px-2"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                            >
                                👤 {username}
                            </button>
                            {userMenuOpen && (
                                <div className="mt-2 ml-2 space-y-1 text-sm">
                                    <a
                                        href="/pages/profile"
                                        className="block px-2 py-1 hover:bg-gray-700 rounded"
                                    >
                                        個人資料
                                    </a>
                                    <a
                                        onClick={handleLogout}
                                        href="#"
                                        className="block px-2 py-1 hover:bg-gray-700 rounded"
                                    >
                                        登出
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
