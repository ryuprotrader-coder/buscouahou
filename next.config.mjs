/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "maps.wikimedia.org" },
    ],
  },
  async redirects() {
    return [
      // Compatibilidade com a URL antiga do Astro que o preview do v0 ficou em cache
      { source: "/client", destination: "/", permanent: false },
      { source: "/client/:path*", destination: "/:path*", permanent: false },
    ]
  },
}

export default nextConfig
