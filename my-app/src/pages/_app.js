// // pages/_app.js

// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// serviceWorkerRegistration.register();


// export default MyApp;

import React from 'react';
import App from 'next/app';

function MyApp({ Component, pageProps }) {
  // 공통 레이아웃이나 설정을 처리하는 로직을 추가할 수 있습니다.
  return <Component {...pageProps} />;
}

export default MyApp;
