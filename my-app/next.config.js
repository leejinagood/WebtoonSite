const path = require('path');

module.exports = {
  pageExtensions: ['jsx', 'js'],
  
  async rewrites() {
    return [
      // {
      //   source: '/api/translate/:path*', // 프론트엔드에서의 API 경로
      //   destination: 'http://localhost:3002/api/translate/:path*', // 백엔드 서버의 API 경로
      // },
      {
        source: '/api/:path*',
        destination: 'http://http://107.23.243.5:4000/api/:path*',
      }
    ];
  },
  
  
  // 기본적인  PWA 설정   //나중에 true 로 바꿔야함
  pwa: { 
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['~'] = __dirname; // 기존 경로 설정
      config.resolve.alias['~'] = path.resolve(__dirname, 'src'); // src 폴더로 변경된 경로 설정
    }
    
    
    return config;
  }
};
