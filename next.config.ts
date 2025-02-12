/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true // Ensure appDir is enabled
  },
  async headers() {
    return [
      {
        source: "/_not-found",
        headers: [{ key: "x-prerender-bypass", value: "true" }]
      }
    ];
  }
};

module.exports = nextConfig;
