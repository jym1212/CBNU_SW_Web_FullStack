/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  redirects: async () => {
    return [
      {
        source: '/company/contact', // 사용자가 요청한 URL
        destination: '/company/intro', //시스템에서 리다이렉트할 URL
        permanent: true, //영구 리다이렉션 여부
      },
    ];
  },
};

export default nextConfig;
