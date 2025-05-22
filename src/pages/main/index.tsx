import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import PostList from '../../components/PostList';
import { useState } from 'react';

export default function MainPage() {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState('');

  function logout() {
    try {
      window.user.logout();
    } catch (error) {
      console.error(error);
    }
  }

  function createPost() {
    const user_info_str = localStorage.getItem('user_info');
    if(user_info_str === null) {
      console.log('parse error json user info')
      return
    }
    const user_info = JSON.parse('user_info_str')
    const user_id = user_info.user_id;
    const username = user_info.username;
    window.post.createPost(user_id, username, title, content);
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        메인 페이지 입니다. (로그인 성공 시 보는 화면)
      </Typography>
      <Stack>
        <Button onClick={logout}>로그아웃</Button>
        <TextField
                id="outlined-basic"
                label="title 입력해주세요."
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></TextField>
              <TextField
                id="outlined-basic"
                label="content 입력해주세요."
                variant="outlined"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></TextField>
        <Button onClick={createPost}>글쓰기</Button>
      </Stack>
      <PostList />
    </Container>
  );
}
