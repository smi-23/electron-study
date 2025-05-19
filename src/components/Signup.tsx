import { Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | ''>('');

  async function signup() {
    try {
      const res = await window.user.signup(username, password, passwordCheck);
      if (!res.success) {
        setErrorMsg(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function toLogin() {
    try{
    window.user.toLogin();
    }catch(error){
      console.error(error)
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
      <TextField
        id="outlined-basic"
        label="비밀번호를 한번 더 입력해주세요."
        variant="outlined"
        value={passwordCheck}
        onChange={(e) => setPasswordCheck(e.target.value)}
      ></TextField>
      {errorMsg && <Typography color="red">{errorMsg}</Typography>}
      <Button onClick={signup}>회원가입</Button>
      <Typography onClick={toLogin} sx={{ cursor: 'pointer', color: 'blue' }}>
        이미 계정이 있으신가요? 로그인하기
      </Typography>
    </Stack>
  );
}
