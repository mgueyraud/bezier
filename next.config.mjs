/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        //https://github.com/langchain-ai/langchainjs/issues/5235
        serverComponentsExternalPackages: ["langchain", "@langchain/core"],
    },
};

export default nextConfig;
