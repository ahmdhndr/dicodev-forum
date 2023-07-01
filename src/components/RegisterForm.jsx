import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import useInput from '../hooks/useInput';
import { PropTypes } from '../utils/globalPropTypes';

function RegisterForm({ register }) {
  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((show) => !show);

  const onNameChangeHandler = ({ target }) => {
    setName(target.value);
  };

  const onEmailChangeHandler = ({ target }) => {
    setEmail(target.value);
  };

  const onPasswordChangeHandler = ({ target }) => {
    setPassword(target.value);
  };

  const handleClick = () => {
    register({ name, email, password });
  };

  return (
    <Box sx={{ marginTop: 3 }}>
      <TextField
        id="name"
        label="Nama Lengkap"
        type="text"
        value={name}
        onChange={onNameChangeHandler}
        fullWidth
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={onEmailChangeHandler}
        fullWidth
        sx={{ marginTop: 3 }}
      />
      <TextField
        id="password"
        label="Password"
        value={password}
        onChange={onPasswordChangeHandler}
        fullWidth
        sx={{ marginTop: 3 }}
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
      <Button
        type="button"
        fullWidth
        variant="contained"
        onClick={handleClick}
        sx={{ marginTop: 3 }}
      >
        Daftar
      </Button>
    </Box>
  );
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterForm;
