/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: false, // This is done to avoid useEffect running twice
    experimental: {
        optimizePackageImports: [
            '@mantine/carousel',
            '@mantine/charts',
            '@mantine/core',
            '@mantine/dates',
            '@mantine/dropzone',
            '@mantine/form',
            '@mantine/hooks',
            '@mantine/modals',
            '@mantine/notifications',
            '@mantine/nprogress',
            '@mantine/spotlight',
            'dayjs',
            'recharts'
        ],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
            {
                source: '/settings',
                destination: '/settings/account',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
