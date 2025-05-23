import { Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState(''); // 여기는 타입 추론
  const [errorMsg, setErrorMsg] = useState('');
  // const navigate = useNavigate(); // 웹에서는 쓰는데 일렉트론에서 잠시 사용 중단

  async function login() {
    try {
      const res = await window.user.login(username, password);
      if (!res.success) {
        setErrorMsg(res.message);
      }
      console.log(res); // temp 확인용
      localStorage.setItem('user_info', JSON.stringify(res.user_info))
    } catch (error) {
      console.error(error);
    }
  }

  function toSingup() {
    // navigate('/signup');
    try {
      window.user.toSignup();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Stack>
      <TextField
        id="outlined-basic"
        label="아이디를 입력해주세요."
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></TextField>
      <TextField
        id="outlined-basic"
        label="비밀번호를 입력해주세요."
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>
      <Button variant="text" onClick={login}>
        로그인
      </Button>
      {errorMsg && <Typography color="red">{errorMsg}</Typography>}
      <Typography onClick={toSingup} sx={{ cursor: 'pointer', color: 'blue' }}>
        아직 회원이 아니신가요?
      </Typography>
    </Stack>
  );
}
