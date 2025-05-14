// src/components/ProfileModal.jsx
import React from 'react';

function ProfileModal({ onClose, onWithdraw }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '16px',
          width: '300px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '36px' }}>👤</div>
          {/* TODO: GET /api/user/mypage로 닉네임, 한줄소개 불러오기 */}
          <div style={{ fontWeight: 'bold' }}>랜덤 닉네임</div>
          <div style={{ fontSize: '12px', color: '#777' }}>한줄 소개 : 20</div>
        </div>

        <div>
          {/* TODO: POST /api/user/gps 위치 인증 요청 */}
          <button style={btnStyle}>인증하기 ➔</button>

          {/* TODO: DELETE /api/auth/logout 또는 탈퇴 API 연동 */}
          <button style={btnStyle} onClick={onWithdraw}>탈퇴하기 ➔</button>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: '16px',
            color: '#3478f6',
            background: 'none',
            border: 'none',
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  borderBottom: '1px solid #eee',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  fontSize: '14px',
};

export default ProfileModal;
