import Login from '../../components/Login';
import { Container, Typography } from '@mui/material';

export default function LoginPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        로그인
      </Typography>
      <Login />
    </Container>
  );
}
