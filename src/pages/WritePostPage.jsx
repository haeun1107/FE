import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const WritePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('/api/posts', {
        title,
        content
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('게시글이 등록되었습니다.');
      navigate('/main');
    } catch (err) {
      console.error('게시글 등록 실패:', err);
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>게시글 작성</h2>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />
      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        style={styles.textarea}
      />
      <button onClick={handleSubmit} style={styles.button}>등록</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'sans-serif'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    resize: 'vertical'
  },
  button: {
    marginTop: '12px',
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
};

export default WritePostPage;
