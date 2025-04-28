"use client"; // 確保這是第一行，讓這個檔案變成 Client Component

import { Mail, User, MessageSquare } from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

function ContractPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-10">
            <main className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto py-20 px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
                    聯絡我們
                </h1>
                <p className="text-base sm:text-lg text-gray-300 mb-10 text-center">
                    我們期待收到您的來信！
                </p>

                <div className="w-full">
                    <form className="space-y-6">
                        <div className="relative">
                            <User className="absolute left-3 top-4 h-5 w-5 text-indigo-400" />
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="pl-10 pr-4 py-3 w-full border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="請輸入您的姓名"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-3 top-4 h-5 w-5 text-indigo-400" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="pl-10 pr-4 py-3 w-full border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="請輸入您的電子郵件"
                            />
                        </div>

                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-indigo-400" />
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="pl-10 pr-4 py-3 w-full border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="請輸入您的訊息"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                送出
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default function Page() {
    return (
        <>
            <Navbar />
            <ContractPage />
            <Footer />
        </>
    );
}
