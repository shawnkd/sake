/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: {
    // ...
    globalObject: 'this',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Explore',
        permanent: true,
      },
    ]
  },
 
}
