const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
      { source: "/book", destination: "/contact", permanent: true },
      { source: "/book-confirmed", destination: "/contact", permanent: true },
      { source: "/qr", destination: "/contact", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; style-src * 'unsafe-inline'; frame-src https://js.stripe.com https://hooks.stripe.com;"
          }
        ]
      }
    ];
  }
};
module.exports = nextConfig;
