import { Container, Typography } from '@mui/material';
import PostList from '../../components/PostList';

export default function PostListPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        게시파 리스트
      </Typography>
      <PostList />
    </Container>
  );
}
