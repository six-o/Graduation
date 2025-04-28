"use client"; // 這裡就可以用

import { useState } from "react";

export default function EchoPage() {
    const [result, setResult] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, password}),
            });
            if (!res.ok) throw new Error("登入失敗");

            const data = await res.text();
            setMessage(`登入成功！Token: ${data}`);
            // localStorage.setItem("token", data.token); // 可以儲存 JWT
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "發生未知錯誤";
            setMessage(errorMessage);
        }
    };

    return (
        <div>
            <h1>登入頁面</h1>
            <input
                type="text"
                placeholder="帳號"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleLogin}>登入</button>
            <p>{message}</p>
        </div>
    );
}
