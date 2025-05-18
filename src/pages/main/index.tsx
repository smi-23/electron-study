import { Button, Container, Stack, Typography } from '@mui/material';

export default function MainPage() {
  function logout() {
    try {
      window.user.logout();
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        메인 페이지 입니다. (로그인 성공 시 보는 화면)
      </Typography>
      <Stack>
        <Button onClick={logout}>로그아웃</Button>
      </Stack>
    </Container>
  );
}
