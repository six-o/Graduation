"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Btn from "@/app/components/btn";

interface UploadedImage {
    file: File;
    url: string;
}

interface NavbarProps {
    className?: string;
}

const EnahncePage: React.FC<NavbarProps> = ({ className = "" }) => {
    const [image, setImage] = useState<UploadedImage | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage({ file, url });
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const url = URL.createObjectURL(file);
            setImage({ file, url });
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleRemove = () => {
        setImage(null);
        // inputRef.current?.value && (inputRef.current.value = ""); // 清空 input
    };

    const handleClickUpload = (e: React.MouseEvent<HTMLDivElement>) => {
        // 如果點的是圖片，不要觸發選擇檔案
        if ((e.target as HTMLElement).tagName === "IMG") {
            return;
        }
        inputRef.current?.click();
    };

    const formatFileSize = (sizeInBytes: number): string => {
        const sizeInKB = sizeInBytes / 1024;
        if (sizeInKB >= 1024) {
            return `${(sizeInKB / 1024).toFixed(2)} MB`;
        }
        return `${sizeInKB.toFixed(2)} KB`;
    };
    // ✅ 傳圖片到後端
    const handleAnalyzeImage = async () => {
        if (!image) return alert("請上傳圖片！");

        const formData = new FormData();
        formData.append("file", image.file); // 👈 加入圖片
        try {
            const res = await fetch("/api/images/load", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            console.log("上傳結果:", data);
        } catch (err) {
            console.error("上傳錯誤:", err);
        }
    };
    const SSG_F = () => {};

    return (
        <div className="min-h-screen pt-10 px-4 mx-auto">
            <div>
                <div className={`max-w-5xl ${className}`}>
                    <h2 className="text-xl font-bold mb-4 text-white">
                        圖片上傳
                    </h2>

                    <div
                        onClick={handleClickUpload}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`
                            group relative border-4 border-dashed rounded-xl p-6
                            min-h-[250px] sm:min-h-[300px] md:min-h-[400px]
                            max-w-full sm:max-w-[600px] md:max-w-[700px]
                            w-full
                            transition-all duration-300
                            ${
                                isDragging
                                    ? "border-blue-400 bg-blue-50 scale-105"
                                    : "border-gray-300 bg-white"
                            }
                            flex flex-col items-center justify-center text-center
                            ${
                                !image
                                    ? "cursor-pointer hover:scale-105"
                                    : "cursor-pointer"
                            }
                        `}
                    >
                        {/* 隱藏 input，點擊由 ref 觸發 */}
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />

                        {/* 上傳前顯示提示（帶 hover 特效） */}
                        {!image && (
                            <p className="text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                                拖曳圖片至此或點擊選擇
                            </p>
                        )}

                        {/* 圖片顯示區塊 */}
                        {image && (
                            <div className="mt-4 space-y-4 flex flex-col items-center pointer-events-none">
                                {/* 圖片區 */}
                                <img
                                    src={image.url}
                                    alt="預覽圖片"
                                    draggable={false}
                                    onClick={(e) => e.stopPropagation()}
                                    className="pointer-events-auto cursor-default w-full max-w-xs sm:max-w-md md:max-w-[600px] max-h-[400px] object-contain rounded-md border shadow"
                                />
                                {/* ./src/app/pages/enhance/page.tsx
                            111:29  Warning: Using `<img>` could result in slower LCP and higher bandwidth.
                            Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images.
                            This may incur additional usage or cost from your provider.
                            See: https://nextjs.org/docs/messages/no-img-element@next/next/no-img-element */}

                                {/* ✅ 檔案資訊區塊 */}
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="pointer-events-auto cursor-default bg-gray-100 text-gray-700 px-6 py-3 rounded-lg shadow-md text-sm space-y-1 w-fit text-center"
                                >
                                    <div>檔名：{image.file.name}</div>
                                    <div>
                                        大小：{formatFileSize(image.file.size)}
                                    </div>
                                </div>

                                {/* 移除按鈕 */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove();
                                    }}
                                    className="pointer-events-auto px-6 py-3 text-base bg-red-100 text-red-600 rounded hover:bg-red-200"
                                >
                                    移除圖片
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="gap-5 flex flex-row flex-wrap justify-center items-center pb-10">
                <Btn
                    btnName="分析圖片"
                    className=""
                    onClick={handleAnalyzeImage}
                />
                <Btn btnName="CCC" className="" />
                <Btn btnName="CCC" className="" />
                <Btn btnName="CCC" className="" />
                <Btn btnName="CCC" className="" />
            </div>
        </div>
    );
};

export default function Page() {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white z-50">
            <Navbar />
            <EnahncePage className="my-15" />
            <Footer />
        </div>
    );
}
