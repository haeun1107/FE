import React from 'react';
import { useParams } from 'react-router-dom';

function PostDetailPage() {
  const { id } = useParams();

  return (
    <div style={styles.outer}>
      <div style={styles.wrapper}>
        <h2>게시글 상세 페이지</h2>
        <p>게시글 ID: {id}</p>

        <div style={styles.contentBox}>
          {/* TODO: GET /api/posts/{postId}로 게시글 상세 내용 받아오기 */}
          <p>본문 내용 (더미)</p>
        </div>

        {/* TODO: GET /api/posts/{postId}/comments로 댓글 목록 받아오기 */}
        {/* 댓글 목록 자리는 아래에 추가될 예정 */}

        <div style={styles.commentInputWrapper}>
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            style={styles.commentInput}
          />
          {/* TODO: POST /api/posts/{postId}/comments로 댓글 등록 */}
          <button style={styles.sendButton}>📩</button>
        </div>
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
    backgroundColor: '#ffffff',
    padding: '16px',
    fontFamily: 'sans-serif',
    boxSizing: 'border-box',
  },
  contentBox: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '12px',
  },
  commentInputWrapper: {
    display: 'flex',
    marginTop: '20px',
    gap: '10px',
  },
  commentInput: {
    flex: 1,
    padding: '12px',
    borderRadius: '24px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '14px',
  },
  sendButton: {
    backgroundColor: '#4e74f9',
    border: 'none',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default PostDetailPage;
