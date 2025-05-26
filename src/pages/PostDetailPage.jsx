import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostDetailPage = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [commentContent, setCommentContent] = useState('');

  const fetchPostDetail = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPost(response.data.result);
    } catch (err) {
      console.error('게시글 상세 조회 실패:', err);
      alert('게시글을 불러올 수 없습니다.');
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) return;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(`/api/posts/${postId}/comments`, {
        content: commentContent
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCommentContent('');
      fetchPostDetail();
    } catch (err) {
      console.error('댓글 등록 실패:', err);
      alert('댓글을 등록할 수 없습니다.');
    }
  };

  const handleDeletePost = async () => {
    const confirm = window.confirm('정말 게시글을 삭제하시겠습니까?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('게시글이 삭제되었습니다.');
      navigate('/main');
    } catch (err) {
      console.error('게시글 삭제 실패:', err);
      alert('게시글을 삭제할 수 없습니다.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  const formatCreatedAt = (value) => {
    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) return value;
      return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    } catch {
      return value;
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => window.history.back()} style={styles.backButton}>←</button>
        <div>
          <div style={styles.nickname}>{post.nickname}</div>
          <div style={styles.meta}>{formatCreatedAt(post.createdAt)}</div>
        </div>
      </div>

      <div style={styles.content}>
        <p style={styles.title}>{post.title}</p>
        <p>{post.content}</p>
      </div>

      {post.mine && (
        <div style={styles.postActions}>
          <button
            onClick={() => alert('수정 페이지로 이동 또는 모달')}
            style={styles.editButton}
          >
            수정
          </button>
          <button
            onClick={async () => {
              if (window.confirm('정말 삭제하시겠습니까?')) {
                try {
                  const token = localStorage.getItem('accessToken');
                  await axios.delete(`/api/posts/${post.postId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  alert('삭제되었습니다.');
                  window.history.back();
                } catch (err) {
                  alert('삭제 실패');
                }
              }
            }}
            style={styles.deleteButton}
          >
            삭제
          </button>
        </div>
      )}

      <div style={styles.engagement}>
        <span>❤️ {post.likeCount}</span>
        <span style={{ marginLeft: '20px' }}>💬 {post.commentCount}</span>
      </div>

      <hr />

      {/* 댓글 목록 */}
      <div style={styles.commentSection}>
        {Array.isArray(post.comments) && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment.commentId} style={styles.comment}>
              <div style={styles.commentHeader}>
                <span>{comment.nickName}</span>
                <span style={styles.commentDate}>{formatCreatedAt(comment.createdAt)}</span>
              </div>
              <div>{comment.content}</div>
            </div>
          ))
        ) : (
          <p style={styles.noComment}>아직 댓글이 없습니다.</p>
        )}
      </div>

      {/* 댓글 입력창 */}
      <div style={styles.commentInputWrapper}>
        <input
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="댓글을 입력하세요."
          style={styles.commentInput}
        />
        <button onClick={handleCommentSubmit} style={styles.commentButton}>등록</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    fontFamily: 'sans-serif'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px'
  },
  backButton: {
    marginRight: '12px',
    fontSize: '18px',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  },
  nickname: {
    fontWeight: 'bold'
  },
  meta: {
    fontSize: '12px',
    color: '#999'
  },
  content: {
    marginTop: '16px',
    lineHeight: '1.6'
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  postActions: {
  display: 'flex',
  gap: '10px',
  marginTop: '12px',
  marginBottom: '12px',
  },
  editButton: {
    padding: '6px 12px',
    fontSize: '13px',
    borderRadius: '6px',
    backgroundColor: '#f0ad4e',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '6px 12px',
    fontSize: '13px',
    borderRadius: '6px',
    backgroundColor: '#d9534f',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  actionButton: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '13px'
  },
  engagement: {
    marginTop: '12px',
    fontSize: '14px',
    color: '#777'
  },
  commentSection: {
    marginTop: '20px'
  },
  comment: {
    background: '#f9f9f9',
    padding: '12px',
    borderRadius: '10px',
    marginBottom: '12px'
  },
  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  commentDate: {
    fontWeight: 'normal',
    fontSize: '12px',
    color: '#aaa'
  },
  noComment: {
    fontSize: '14px',
    color: '#888',
    textAlign: 'center',
    marginTop: '10px'
  },
  commentInputWrapper: {
    display: 'flex',
    gap: '8px',
    marginTop: '20px'
  },
  commentInput: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },
  commentButton: {
    padding: '12px 16px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

export default PostDetailPage;
