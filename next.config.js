/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: {
    // ...
    globalObject: 'this',
  },
 
}
