import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

// 원흥역 기준 좌표
const WONSEUNG_LAT = 37.650763;
const WONSEUNG_LNG = 126.367002;

// Haversine 거리 계산 함수
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // 지구 반지름 (km)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // km
};

const LocationAuth = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [coords, setCoords] = useState(null);

  // 현재 위치 가져오기
  useEffect(() => {
    if (!navigator.geolocation) {
      alert('이 브라우저는 GPS를 지원하지 않습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
      },
      (error) => {
        console.error('위치 정보 오류:', error);
        alert('GPS 위치 정보를 가져오는 데 실패했습니다.');
      }
    );
  }, []);

  // 카카오맵 띄우기
  useEffect(() => {
    if (!coords) return;

    const loadMap = () => {
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
      if (window.kakao?.maps?.load) {
        window.kakao.maps.load(loadMap);
      } else {
        setTimeout(checkAndLoad, 100);
      }
    };

    checkAndLoad();
  }, [coords]);

  // 인증 버튼 클릭
  const handleGpsVerify = async () => {
    if (!coords) {
      alert('위치 정보를 불러오는 중입니다.');
      return;
    }

    const distance = calculateDistance(
      coords.latitude,
      coords.longitude,
      WONSEUNG_LAT,
      WONSEUNG_LNG
    );

    if (distance > 1.0) {
      alert('현재 위치는 인증 대상 반경(1km) 밖입니다.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');

      const response = await axios.post(
        '/api/user/gps',
        { success: true }, // ✅ 서버에는 인증 성공 여부만 전달
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('서버 응답:', response.data);
      localStorage.setItem('gps', 'true');
      alert('GPS 인증이 완료되었습니다!');
      navigate('/main');
    } catch (error) {
      console.error('GPS 인증 API 오류:', error);
      alert('GPS 인증에 실패했습니다.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>📍 위치 인증이 필요합니다</h2>
      <p>원흥역 반경 1km 이내에 있는 경우에만 인증됩니다.</p>
      <div ref={mapRef} style={styles.map}></div>
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
