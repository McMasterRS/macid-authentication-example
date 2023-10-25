/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MAC_AZURE_CLIENT_ID: process.env.MAC_AZURE_CLIENT_ID,
        MAC_AZURE_TENANT_ID: process.env.MAC_AZURE_TENANT_ID,
        MAC_AZURE_REDIRECT_URI: process.env.MAC_AZURE_REDIRECT_URI,
    },
}

module.exports = nextConfig
