/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://15.165.173.111:8080/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
