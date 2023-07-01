import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import useInput from '../hooks/useInput';
import { PropTypes } from '../utils/globalPropTypes';

function LoginForm({ login }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const toggleShowPassword = () => setShowPassword((show) => !show);

  const onEmailChangeHandler = ({ target }) => {
    setEmail(target.value);
  };

  const onPasswordChangeHandler = ({ target }) => {
    setPassword(target.value);
  };

  const handleClick = () => {
    login({ email, password });
  };

  return (
    <Box sx={{ marginTop: 3 }}>
      <TextField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={onEmailChangeHandler}
        fullWidth
      />
      <TextField
        id="password"
        label="Password"
        value={password}
        onChange={onPasswordChangeHandler}
        fullWidth
        sx={{ marginY: 3 }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button type="button" fullWidth variant="contained" onClick={handleClick}>
        Masuk
      </Button>
    </Box>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
