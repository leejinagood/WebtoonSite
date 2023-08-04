const path = require('path');

module.exports = {
  pageExtensions: ['jsx', 'js'],
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.0.98:4000/api/:path*',
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
