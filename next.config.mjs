/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '183.102.80.161',
                port: '8090',
                pathname: '/**',
            },
            {
                protocol: "https",
                hostname: "a31.ddns.net",
                port: "8090",
                pathname: '/**',
            },
            {
                protocol: "http",
                hostname: "192.168.219.100",
                port: "8080",
                pathname: '/**',
            },
        ],
    },   
};

export default nextConfig;
