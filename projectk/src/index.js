import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './page/MainPage';
// 요일 임포트
import MondayPage from './page/MondayPage';
import TuesDayPage from './page/TuesDayPage';
import WednesDayPage from './page/WednesDayPage';
import ThursDayPage from './page/ThursDayPage';
import FriDayPage from './page/FirDayPage';
import SaturDayPage from './page/SaturDaypage';
import SunDayPage from './page/SunDayPage';
import ListPage from './page/ListPage';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';
const root = document.getElementById('root');
const render = () => {
  ReactDOM.render(
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mon" element={<MondayPage />} />
          <Route path="/tues" element={<TuesDayPage />} />
          <Route path="/wednes" element={<WednesDayPage />} />
          <Route path="/thurs" element={<ThursDayPage />} />
          <Route path="/fri" element={<FriDayPage />} />
          <Route path="/satur" element={<SaturDayPage />} />
          <Route path="/sun" element={<SunDayPage />} />
          <Route path="/list" element={<ListPage/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>,
    root
  );
};

serviceWorkerRegistration.register();
render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
