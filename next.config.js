/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Enables static site generation
    images: { unoptimized: true }, // Image Optimization API is not compatible with static site generation
    reactStrictMode: true, // Enables React Strict Mode
};

module.exports = nextConfig;
