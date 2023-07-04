import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainPage from './page/MainPage';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// 요일 임포트
import MondayPage from './page/MondayPage';
import TuesDayPage from './page/TuesDayPage';
import WednesDayPage from './page/WednesDayPage';
import ThursDayPage from './page/ThursDayPage';
import FriDayPage from './page/FirDayPage';
import SaturDayPage from './page/SaturDaypage';
import SunDayPage from './page/SunDayPage';


serviceWorkerRegistration.register();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path='/' element={<MainPage/>}/>

        <Route path='/mon' element={<MondayPage/>}/>
        <Route path='/tues' element={<TuesDayPage/>}/>
        <Route path='/wednes' element={<WednesDayPage/>}/>
        <Route path='/thurs' element={<ThursDayPage/>}/>
        <Route path='/wednes' element={<WednesDayPage/>}/>
        <Route path='/fri' element={<FriDayPage/>}/>
        <Route path='/satur' element={<SaturDayPage/>}/>
        <Route path='/sun' element={<SunDayPage/>}/>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
