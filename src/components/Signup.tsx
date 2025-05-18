import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  function signup() {
    try {
      const res = window.user.signup(username, password, passwordCheck);
      console.log(res, "message from renderer in signup compo");
    } catch (error) {
      console.log(error);
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
      <Button onClick={signup}>회원가입</Button>
    </Stack>
  );
}
