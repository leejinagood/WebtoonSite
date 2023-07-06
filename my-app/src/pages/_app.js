// pages/_app.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

serviceWorkerRegistration.register();


export default MyApp;
