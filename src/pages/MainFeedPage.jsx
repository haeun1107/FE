import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const MainFeedPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/api/posts?sortType=recent', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setPosts(response.data.result.posts);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
        alert('게시글을 불러오지 못했습니다.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📰 명예의 라운지 📰</h2>

      {posts.map((post) => (
      <div
        key={post.postId}
        style={styles.postCard}
        onClick={() => navigate(`/posts/${post.postId}`)}
      >
        <div style={styles.postMeta}>
          <span style={styles.nickname}>{post.nickname}</span>
          <span style={styles.date}>{post.createdAt}</span>
        </div>
        <div style={styles.title}>{truncateTitle(post.title)}</div>
        <div style={styles.engagement}>
          ❤️ {post.likeCount} · 👁️ {post.viewCount} · 💬 {post.commentCount}
        </div>
      </div>
    ))}


      <button
        onClick={() => navigate('/write')}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: '#fff',
          fontSize: '32px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
        }}
      >
        +
      </button>

    </div>
  );
};

const truncateTitle = (title) => {
  return title.length > 30 ? title.slice(0, 30) + '...' : title;
};

const formatDate = (datetime) => {
  const date = new Date(datetime);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    minHeight: '100vh',
    fontFamily: 'sans-serif'
  },
  header: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  postCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    cursor: 'pointer', 
    transition: 'background-color 0.2s', 
    ':hover': {
      backgroundColor: '#eee' 
    }
  },
  postMeta: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  nickname: {
    fontWeight: '600'
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
    color: '#999',
    marginTop: '8px'
  }
};

export default MainFeedPage;
