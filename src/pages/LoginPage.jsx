import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // TODO: 백엔드 카카오 로그인 URL로 리다이렉트 → /api/auth/kakao/login
    // window.location.href = 'http://localhost:8080/api/auth/kakao/login';

    // (테스트용 임시 로직)
    localStorage.setItem('auth', 'true');
    navigate('/gps');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.loginBox}>
        <img
          src="/kakao_login_medium_narrow.png"
          alt="카카오 로그인"
          style={styles.kakaoButton}
          onClick={handleLogin}
        />
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: '#985f5f', //  배경색
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    maxWidth: '430px',
    margin: '0 auto',
  },
  loginBox: {
    width: '100%',
    padding: '32px',
    textAlign: 'center',
  },
  kakaoButton: {
    width: '260px',
    cursor: 'pointer',
  },
};

export default LoginPage;
