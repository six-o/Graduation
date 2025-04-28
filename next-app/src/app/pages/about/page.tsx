"use client"; // 確保這是第一行，讓這個檔案變成 Client Component

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

function AboutPage() {
    const infoList = [
        {
            title: "我們的使命",
            description: "提供創新且可靠的解決方案，滿足客戶的需求。",
        },
        {
            title: "我們的價值",
            description: "誠信、專業、創新、卓越。",
        },
        {
            title: "我們的團隊",
            description: "一群充滿熱情和專業知識的成員組成。",
        },
        {
            title: "聯絡我們",
            description: "隨時歡迎您與我們聯繫，我們將竭誠為您服務。",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-black text-white py-120 sm:py-80">
            <main className="w-full max-w-6xl text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                    關於我們
                </h1>
                <p className="mt-2 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                    我們是一個致力於提供優質服務的團隊。
                </p>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {infoList.map((info, index) => (
                        <div
                            key={index}
                            className="bg-white/90 text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <h3 className="text-xl font-bold text-indigo-600 mb-2">
                                {info.title} →
                            </h3>
                            <p className="text-base text-gray-800">
                                {info.description}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default function Page() {
    return (
        <div className="flex flex-col h-screen bg-black text-white">
            <Navbar className="h-16 mb-50" />
            <AboutPage />
            <Footer />
        </div>
    );
}
