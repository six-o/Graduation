import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // 如果部署上線，必須用 Nginx/Apache 反向代理或前後端合併架設
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:8080/api/:path*",
            },
        ];
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "5mb",
        },
    },
};

export default nextConfig;
