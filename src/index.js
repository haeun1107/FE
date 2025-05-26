import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const kakaoKey = '0ed3854f979dd16e1531d7ab36086a4b';

function loadKakaoScript(callback) {
  const script = document.createElement('script');
  script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
  script.async = true;
  script.onload = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
      console.log('✅ Kakao SDK Initialized');
    }
    callback();
  };
  document.head.appendChild(script);
}

loadKakaoScript(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
});
