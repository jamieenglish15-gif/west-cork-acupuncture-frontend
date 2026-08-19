const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
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
