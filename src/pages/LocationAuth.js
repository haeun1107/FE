import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const LocationAuth = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [coords, setCoords] = useState(null);

  // 현재 위치 불러오기
  useEffect(() => {
    if (!navigator.geolocation) {
      alert('이 브라우저에서는 GPS를 지원하지 않습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
      },
      (error) => {
        console.error('GPS 위치 정보 실패:', error);
        alert('GPS 위치 정보를 가져오는 데 실패했습니다.');
      }
    );
  }, []);

  // 카카오맵 띄우기 (autoload=false 후 SDK 로드)
  useEffect(() => {
    if (!coords) return;

    const loadMap = () => {
      console.log('✅ 카카오맵 SDK 로딩 완료, 지도 생성 시작');
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(coords.latitude, coords.longitude),
        level: 3
      });

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(coords.latitude, coords.longitude)
      });

      marker.setMap(map);
    };

    const checkAndLoad = () => {
      if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
        window.kakao.maps.load(loadMap);
      } else {
        setTimeout(checkAndLoad, 100);
      }
    };

    checkAndLoad();
  }, [coords]);

  // 위치 인증 처리
  const handleGpsVerify = async () => {
    if (!coords) {
      alert('위치 정보를 불러오는 중입니다. 잠시만 기다려주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        '/api/user/gps',
        { latitude: coords.latitude, longitude: coords.longitude },
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
      <p>정확한 서비스를 위해 현재 위치를 확인 중입니다.</p>

      {/* 지도 영역 */}
      <div ref={mapRef} style={styles.map}></div>

      {/* 인증 버튼 */}
      <button style={styles.button} onClick={handleGpsVerify}>
        GPS 인증하기
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center'
  },
  map: {
    width: '100%',
    height: '300px',
    marginTop: '20px',
    borderRadius: '12px',
    backgroundColor: '#eee'
  },
  button: {
    marginTop: '30px',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

export default LocationAuth;
