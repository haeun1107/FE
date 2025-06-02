import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const MainFeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [topPost, setTopPost] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/api/posts?sortType=recent', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const fetchedPosts = response.data.result.posts;
        setPosts(fetchedPosts);
        const sorted = [...fetchedPosts].sort((a, b) => b.likeCount - a.likeCount);
        setTopPost(sorted[0]);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
        alert('게시글을 불러오지 못했습니다.');
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h2 style={styles.header}>📰 명예의 라운지 📰</h2>
        <div style={styles.iconGroup}>
          <span style={styles.icon} onClick={() => setSearchOpen(!searchOpen)}>🔍</span>
          <span style={styles.icon} onClick={() => setDrawerOpen(true)}>☰</span>
        </div>
      </div>

      {searchOpen && (
        <input
          type="text"
          placeholder="제목으로 검색"
          style={styles.searchInput}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      )}

      {topPost && (
        <div style={styles.featured} onClick={() => navigate(`/posts/${topPost.postId}`)}>
          {truncateTitle(topPost.title)}
        </div>
      )}
      
      {filteredPosts.map((post) => (
        <div
          key={post.postId}
          style={styles.postCard}
          onClick={() => navigate(`/posts/${post.postId}`)}
        >
          <div style={styles.postMeta}>
            <span style={styles.nickname}>{post.nickname}</span>
            <span style={styles.date}>{formatDate(post.createdAt)}</span>
          </div>
          <div style={styles.title}>{truncateTitle(post.title)}</div>
          <div style={styles.engagement}>
            ❤️ {post.likeCount} · 👁️ {post.viewCount} · 💬 {post.commentCount}
          </div>
        </div>
      ))}

      <button onClick={() => navigate('/write')} style={styles.fab}>+</button>

      {drawerOpen && (
        <div style={styles.drawer}>
          <div style={styles.drawerContent}>
            <div style={styles.profile}>
              <div style={styles.avatar} />
              <div>
                <div style={styles.nickname}>랜덤 닉네임</div>
                <div style={styles.intro}>합줄 소개 : 20</div>
              </div>
            </div>
            <div style={styles.drawerItem}>인증하기</div>
            <div style={styles.drawerItem} onClick={() => setShowConfirm(true)}>탈퇴하기</div>
          </div>
        </div>
      )}

      {showConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <p style={{ fontWeight: 'bold' }}>연합생활관을 나가십니까?</p>
            <p style={{ marginTop: 4 }}>수고하셨습니다.</p>
            <div style={styles.modalButtons}>
              <button style={styles.modalCancel} onClick={() => setShowConfirm(false)}>취소</button>
              <button style={styles.modalConfirm} onClick={() => alert("탈퇴 처리됨")}>탈퇴</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const truncateTitle = (title) => {
  return title.length > 30 ? title.slice(0, 30) + '...' : title;
};


const formatDate = (datetime) => {
  if (!datetime) return '';
  const date = new Date(datetime);
  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};


const styles = {
  container: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    padding: '20px 12px',
    overflowX: 'hidden'
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  header: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  iconGroup: {
    display: 'flex',
    gap: '10px'
  },
  icon: {
    fontSize: '22px',
    cursor: 'pointer'
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '14px'
  },
  featured: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '14px 18px',
    marginBottom: '28px',
    fontSize: '15px',
    color: '#333',
    cursor: 'pointer',
    textAlign: 'center',
    fontWeight: 'bold',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
  },
  postCard: {
    backgroundColor: '#fff6fa',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  postMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#888'
  },
  nickname: {
    fontWeight: 'bold'
  },
  date: {
    fontStyle: 'italic'
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333'
  },
  engagement: {
    fontSize: '13px',
    color: '#999'
  },
  fab: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '32px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '240px',
    height: '100%',
    backgroundColor: '#fff',
    boxShadow: '-2px 0 6px rgba(0,0,0,0.1)',
    zIndex: 1000,
    transition: '0.3s'
  },
  drawerContent: {
    padding: '20px'
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px'
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '24px',
    backgroundColor: '#ddd'
  },
  intro: {
    fontSize: '13px',
    color: '#555'
  },
  drawerItem: {
    padding: '12px 0',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px 24px',
    borderRadius: '14px',
    textAlign: 'center',
    width: '80%',
    maxWidth: '300px'
  },
  modalButtons: {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  modalCancel: {
    flex: 1,
    marginRight: '8px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#eee',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  modalConfirm: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#3d73ff',
    color: '#fff',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default MainFeedPage;
