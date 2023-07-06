const withPWA = require('next-pwa');

module.exports = withPWA({
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
    },
});

///api/* 경로로 들어오는 모든 요청을 http://localhost:4000/api/* 로 리다이렉션
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:4000/api/:path*',
        },
      ];
    },
  };





