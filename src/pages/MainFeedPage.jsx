import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaUserCircle,
  FaHeart,
  FaPlus,
  FaPaperPlane,
} from 'react-icons/fa';
import ProfileModal from '../components/ProfileModal';

function MainFeedPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
    console.log('검색어:', e.target.value);

    // 🔹 게시글 검색 API 호출 자리 (GET /api/posts?keyword=키워드)
    // fetch(`/api/posts?keyword=${e.target.value}`)...
  };

  const handleCancelSearch = () => {
    setIsSearching(false);
    setSearchText('');
  };

  return (
    <div style={styles.pageWrapper} onClick={isSearching ? handleCancelSearch : undefined}>
      {isSearching ? (
        <div style={styles.searchBarWrapper} onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchText}
            onChange={handleSearchInput}
            autoFocus
            style={styles.searchInput}
          />
        </div>
      ) : (
        <div style={styles.header}>
          <FaSearch style={styles.icon} onClick={() => setIsSearching(true)} />
          <FaUserCircle style={styles.icon} onClick={() => setShowModal(true)} />
        </div>
      )}

      <div style={styles.sectionTitle}>Best 톡</div>

      {/* 🔹 게시글 강조 카드 → 실제 데이터 불러오기 필요 (GET /api/posts) */}
      <div style={styles.highlightCard}>
        <div style={styles.imageBox}></div>
        <div style={styles.cardTextWrapper}>
          <div style={styles.cardTitle}>톡 제목</div>
          <div style={styles.cardMeta}>게시자 닉네임</div>
        </div>
        <img src="https://i.imgur.com/3GvwNBf.png" alt="profile" style={styles.roundProfile} />
      </div>

      <FaHeart style={styles.heartIcon} />

      <div style={styles.filterTabs}>
        <button style={styles.filterActive}>최신순</button>
        <button style={styles.filterInactive}>인기순</button>
        <button style={styles.filterInactive}>...</button>
        <button style={styles.filterInactive}>...</button>
        <button style={styles.filterInactive}>...</button>
      </div>

      {/* 🔹 게시글 목록 불러오기 자리 (GET /api/posts) */}
      <div style={styles.feedList}>
        {[1, 2, 3, 4, 5, 6].map((item, idx) => (
          <div
            key={idx}
            style={styles.card}
            onClick={() => navigate(`/posts/${idx + 1}`)} // 🔹 게시글 상세 보기 (GET /api/posts/{postId})
          >
            <div style={styles.imageBox}></div>
            <div style={styles.cardTextWrapper}>
              <div style={styles.cardTitle}>톡 제목</div>
              <div style={styles.cardMeta}>
                게시자 닉네임 - {idx === 0 ? '59분 전' : '25/04/13'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.inputBar}>
        <FaPlus style={styles.plusIcon} onClick={() => navigate('/write')} />
        <input type="text" placeholder="텍스트" style={styles.inputField} />
        <FaPaperPlane style={styles.sendIcon} onClick={() => {
          // 🔹 댓글 등록 자리 (POST /api/posts/{postId}/comments)
          console.log('댓글 전송');
        }} />
      </div>

      {showModal && (
        <ProfileModal
          onClose={() => setShowModal(false)}
          onWithdraw={() => {
            // 🔹 회원 탈퇴 확인 후 호출 (DELETE /api/auth/logout)
            console.log('탈퇴 API 연결 예정');
          }}
        />
      )}
    </div>
  );
}

const styles = {
  pageWrapper: {
    maxWidth: '430px',
    margin: '0 auto',
    padding: '16px',
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    paddingBottom: '80px',
    fontFamily: 'sans-serif',
  },
  searchBarWrapper: {
    display: 'flex',
    marginBottom: '12px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  icon: {
    fontSize: '20px',
    color: '#000',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '12px',
  },
  highlightCard: {
    backgroundColor: '#f4f7ff',
    borderRadius: '16px',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    marginBottom: '12px',
  },
  roundProfile: {
    width: '48px',
    height: '48px',
    borderRadius: '999px',
    position: 'absolute',
    right: '16px',
  },
  imageBox: {
    width: '48px',
    height: '48px',
    backgroundColor: '#d6d6e2',
    borderRadius: '8px',
  },
  cardTextWrapper: {
    marginLeft: '12px',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  cardMeta: {
    fontSize: '11px',
    color: '#777',
    marginTop: '4px',
  },
  heartIcon: {
    color: '#000',
    fontSize: '16px',
    margin: '12px 0',
  },
  filterTabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
  },
  filterActive: {
    backgroundColor: '#3478f6',
    color: '#fff',
    border: 'none',
    borderRadius: '16px',
    padding: '6px 12px',
    fontSize: '12px',
  },
  filterInactive: {
    backgroundColor: '#e0e0e0',
    color: '#000',
    border: 'none',
    borderRadius: '16px',
    padding: '6px 12px',
    fontSize: '12px',
  },
  feedList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  card: {
    backgroundColor: '#f4f7ff',
    borderRadius: '16px',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  inputBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f1f1f1',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid #ccc',
    maxWidth: '430px',
    margin: '0 auto',
    width: '100%',
  },
  plusIcon: {
    fontSize: '16px',
    marginRight: '12px',
    color: '#444',
  },
  inputField: {
    flex: 1,
    padding: '8px 12px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    fontSize: '13px',
    marginRight: '12px',
  },
  sendIcon: {
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#3478f6',
    padding: '8px',
    borderRadius: '50%',
  },
};

export default MainFeedPage;