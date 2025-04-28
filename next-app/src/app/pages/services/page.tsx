"use client"; // 確保這是第一行，讓這個檔案變成 Client Component

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

function ServicesPage() {
    const services = [
        {
            title: "網頁開發",
            description:
                "我們提供專業的網頁開發服務，包括前端、後端和全端開發。",
            items: ["客製化網頁設計", "響應式網頁開發", "電子商務網站"],
        },
        {
            title: "應用程式開發",
            description: "我們開發跨平台的應用程式，包括 iOS 和 Android。",
            items: ["原生應用程式開發", "混合式應用程式開發", "UI/UX 設計"],
        },
        {
            title: "數位行銷",
            description: "我們提供全面的數位行銷服務，幫助您提升品牌知名度。",
            items: ["搜索引擎優化 (SEO)", "社交媒體行銷", "內容行銷"],
        },
        {
            title: "雲端服務",
            description: "我們提供雲端服務，讓您的業務更具彈性和擴展性。",
            items: ["雲端基礎架構建置", "雲端應用程式部署", "資料庫管理"],
        },
        {
            title: "設計服務",
            description:
                "我們提供專業的設計服務，包括品牌設計、UI/UX 設計和平面設計。",
            items: ["品牌識別設計", "使用者介面/使用者體驗設計", "平面設計"],
        },
        {
            title: "顧問服務",
            description: "我們提供專業的顧問服務，幫助您解決業務挑戰。",
            items: ["技術顧問", "行銷顧問", "業務顧問"],
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-25 pb-15 px-2 sm:px-6">
            <main className="flex flex-col items-center justify-center w-full max-w-7xl flex-1 px-5 sm:px-6 text-center">
                <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold">
                    我們的服務
                </h1>

                <p className="mt-3 text-xl sm:text-2xl">
                    我們提供多元化的服務，滿足您的需求。
                </p>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-teal-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                        >
                            <h2 className="text-2xl font-semibold mb-4 text-violet-400">
                                {service.title}
                            </h2>
                            <p className="text-gray-700">
                                {service.description}
                            </p>
                            <ul className="list-disc list-inside mt-4 text-blue-500">
                                {service.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default function Page() {
    return (
        <>
            <Navbar />
            <ServicesPage />
            <Footer />
        </>
    );
}
