"use client"; // 確保這是第一行，讓這個檔案變成 Client Component

// import { useState } from "react";
// import { Lock, Mail } from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

function HomePage() {
    return (
        <main className="flex flex-col min-h-screen overflow-hidden bg-black text-white justify-center items-center px-2">
            <div className="text-center">
                <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold">歡迎來到我的網站</h1>
                <p className="mt-4 text-lg sm:text-lg md:text-xl">
                    這是一個使用 Next.js 13 和 Tailwind CSS 建立的網站。
                </p>

                <div className="mt-8">
                    <a
                        href="/pages/about"
                        // inline-block   transition-all duration-200
                        className="rounded-lg bg-blue-500 px-5 sm:px-8 py-3 sm:py-4 text-base sm:text-lg text-white hover:bg-blue-600 transition-all duration-200"
                    >
                        關於我們
                    </a>
                </div>
            </div>
        </main>
    );
}

export default function Page() {
    return (
        <div className="flex flex-col h-screen bg-black text-white">
            <Navbar />
            <HomePage />
            <Footer />
        </div>
    );
}
