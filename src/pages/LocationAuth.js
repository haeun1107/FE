import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LocationAuth = () => {
  const navigate = useNavigate();

  const handleGpsVerify = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        '/api/user/gps',
        { success: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('GPS 인증 응답:', response.data);
      localStorage.setItem('gps', 'true');
      navigate('/main');
    } catch (error) {
      console.error('GPS 인증 실패:', error);
      alert('GPS 인증에 실패했습니다.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>📍 위치 인증이 필요합니다</h2>
      <p>정확한 서비스를 위해 GPS 인증을 진행해주세요.</p>
      <button style={styles.button} onClick={handleGpsVerify}>
        GPS 인증하기
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '60px',
    textAlign: 'center'
  },
  button: {
    marginTop: '20px',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

export default LocationAuth;
