import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import kakaoIcon from '../assets/kakao.svg';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      alert('카카오 SDK가 로드되지 않았습니다.');
      return;
    }

    window.Kakao.Auth.login({
      scope: 'profile_nickname, account_email, profile_image',
      success: function (authObj) {
        const kakaoAccessToken = authObj.access_token;

        axios
          .post('/api/auth/kakao/login', {
            accessToken: kakaoAccessToken
          })
          .then((res) => {
            const { accessToken, refreshToken, requireGps } = res.data.result;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('auth', 'true');
            localStorage.setItem('gps', requireGps ? 'false' : 'true');
            console.log('Kakao Access Token:', kakaoAccessToken);
            console.log('Access Token:', accessToken);
            console.log('requireGps:', requireGps);

            if (requireGps) {
              localStorage.setItem('gps', 'false'); // 인증 필요
              navigate('/gps');
            } else {
              localStorage.setItem('gps', 'true'); // 인증 불필요 → 바로 /main 가능
              navigate('/main');
            }
          })
          .catch((err) => {
            console.error('로그인 실패:', err);
            alert('로그인에 실패했습니다.');
          });
      },
      fail: function (err) {
        console.error('카카오 로그인 실패:', err);
        alert('카카오 로그인 실패');
      }
    });
  };

  return (
    <div style={styles.container}>
      {/* 회색 상자 */}
      <div style={styles.grayBox}></div>

      {/* 카카오 로그인 아이콘 이미지 (버튼 대신 클릭) */}
      <img
        src={kakaoIcon}
        alt="카카오 로그인"
        style={styles.kakaoIcon}
        onClick={handleKakaoLogin}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#fff'
  },
  grayBox: {
    width: '360px',
    height: '360px',
    backgroundColor: '#ddd',
    borderRadius: '20px',
    marginBottom: '40px'
  },
  kakaoIcon: {
    width: '540px',   
    height: '135px',   
    cursor: 'pointer'
  }
};

export default LoginPage;
