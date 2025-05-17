import Signup from '../../components/Signup';
import { Container, Typography } from '@mui/material';

export default function SignupPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        회원가입
      </Typography>
      <Signup />
    </Container>
  );
}
