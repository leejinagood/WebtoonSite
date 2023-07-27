module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.0.98:4000/api/:path*',
      },
    ];
  },

  // 기본적인 PWA 설정
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
};
