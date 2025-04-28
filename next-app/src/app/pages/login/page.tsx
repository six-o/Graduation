"use client"; // 確保這是第一行，讓這個檔案變成 Client Component

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
// import axios from "axios";

const LoginForm = () => {
    // const [formData, setFormData] = useState({
    //     username: "",
    //     password: "",
    // });

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     console.log("登入資料:", formData);
    //     // 這裡可以接 API 做驗證
    //     // 進行登入操作
    //     const res = await fetch("/api/users/login", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(formData),
    //         credentials: "include", // 這裡可以加入 cookie
    //     });

    //     if (res.ok) {
    //         const user = await res.json();
    //         console.log("登入成功:", user);
    //         const threeHoursLater = Date.now() + 60 * 1000; // 3小時後的時間
    //         localStorage.setItem("username", user.username);
    //         localStorage.setItem("cookieTime", threeHoursLater.toString());
    //         // 登入成功後的操作，例如導向到首頁
    //         window.location.href = "/pages/home";
    //     } else {
    //         console.error("登入失敗");
    //         alert("登入失敗，請檢查帳號或密碼。");
    //     }
    // };
    const { data: session } = useSession();

    return (
        <div>
            <form
                // onSubmit={handleSubmit}
                className="w-[90%] sm:w-[80%] md:max-w-md mx-auto mt-10 p-6 border rounded shadow"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    登入帳號
                </h2>

                <label className="block mb-4 text-base sm:text-lg">
                    帳號：
                    <input
                        type="text"
                        name="username"
                        // value={formData.username}
                        // onChange={handleChange}
                        className="w-full px-3 py-2 border rounded mt-1 text-base sm:text-lg"
                        required
                    />
                </label>

                <label className="block mb-6 text-base sm:text-lg">
                    密碼：
                    <input
                        type="password"
                        name="password"
                        // value={formData.password}
                        // onChange={handleChange}
                        className="w-full px-3 py-2 border rounded mt-1 text-base sm:text-lg"
                        required
                    />
                </label>

                <div className="flex flex-col justify-center items-center gap-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 w-full sm:w-auto"
                    >
                        登入
                    </button>

                    <a
                        href="/pages/login/register"
                        className="text-sm text-gray-300 hover:underline"
                    >
                        註冊
                    </a>
                </div>
            </form>
            <div className="p-10 text-center">
                <h1 className="text-2xl mb-4">Google 登入</h1>
                {session ? (
                    <div>
                        <p>👋 歡迎 {session.user?.name}</p>
                        <img
                            src={session.user?.image ?? ""}
                            width={80}
                            className="rounded-full m-auto"
                        />
                        <br />
                        <button
                            onClick={() => signOut()}
                            className="mt-4 bg-red-500 px-4 py-2 text-white"
                        >
                            登出
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => signIn("google")}
                        className="bg-blue-500 px-4 py-2 text-white"
                    >
                        使用 Google 登入
                    </button>
                )}
            </div>
        </div>
    );
};

export default function Page() {
    return (
        <div className="pt-30">
            <Navbar />
            <LoginForm />
            <Footer className="mt-40" />
        </div>
    );
}
