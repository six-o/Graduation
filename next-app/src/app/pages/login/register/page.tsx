"use client";

import React from "react";
import { useState } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
// import { getUsers, createUser } from "../../api/call-backend"; // 假設這是你的 API 函數

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("註冊資料:", formData);
        // 可以在這裡接 API
        // 進行註冊操作
        const res = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const users = await res.json();
        console.log("註冊結果:", users);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-[90%] sm:w-[80%] max-w-md mx-auto mt-10 p-6 border rounded shadow"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">註冊帳號</h2>

            <label className="block mb-4 text-base sm:text-lg">
                帳號：
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded mt-1 text-base sm:text-lg"
                    required
                />
            </label>

            <label className="block mb-6 text-base sm:text-lg">
                密碼：
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded mt-1 text-base sm:text-lg"
                    required
                />
            </label>

            <div className="flex flex-col justify-center items-center gap-4">
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 w-full sm:w-auto"
                >
                    註冊
                </button>

                <a
                    href="/pages/login"
                    className="text-sm text-gray-300 hover:underline"
                >
                    登入
                </a>
            </div>
        </form>
    );
};

export default function RegisterPage() {
    return (
        <div className="pt-30">
            <Navbar />
            <RegisterForm />
            <Footer className="mt-40" />
        </div>
    );
}
