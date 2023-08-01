/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd', 'rc-util', '@ant-design',
    'rc-pagination', 'rc-picker', 'rc-tree', 'rc-table']
}

module.exports = nextConfig
