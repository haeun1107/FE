import React from 'react';
import { useNavigate } from 'react-router-dom';

function LocationAuth() {
  const navigate = useNavigate();

  const handleAuth = () => {
    // TODO: POST /api/user/gps 위치 인증 요청 후 성공 시 아래 수행
    localStorage.setItem('gps', 'true');
    navigate('/main');
  };

  return (
    <div style={styles.outer}>
      <div style={styles.wrapper}>
        <h3>사용자 현 위치</h3>

        <div id="map" style={styles.mapBox}>
          지도 자리
        </div>

        <button onClick={handleAuth} style={styles.button}>
          인증하기
        </button>
      </div>
    </div>
  );
}

const styles = {
  outer: {
    backgroundColor: '#f1f1f1',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    width: '100%',
    maxWidth: '430px',
    backgroundColor: '#fff',
    padding: '16px',
    fontFamily: 'sans-serif',
  },
  mapBox: {
    width: '100%',
    height: '400px',
    backgroundColor: '#eee',
    borderRadius: '8px',
    marginTop: '10px',
  },
  button: {
    marginTop: '20px',
    width: '100%',
    padding: '16px',
    backgroundColor: '#3478f6',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default LocationAuth;
