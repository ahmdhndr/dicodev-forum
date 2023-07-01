import { AccountCircle } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import capitalizeFirstLetter from '../utils/CapitalizeFirstLetter';
import DicodevLogo from './DicodevLogo';
import { PropTypes, userShape } from '../utils/globalPropTypes';
import { HOME_PATH, LEADERBOARD_PATH, LOGIN_PATH } from '../utils/Constants';

function Navigation({ authUser, signOut }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenuAccount = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOutHandler = () => {
    setAnchorEl(null);
    signOut();
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Link to={HOME_PATH}>
            <DicodevLogo fillColor="#f3efe0" />
          </Link>
        </Box>
        <Link to={LEADERBOARD_PATH}>
          <Button color="secondary" sx={{ fontWeight: 700 }}>
            Leadeboards
          </Button>
        </Link>
        {authUser ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography color="secondary">Hi, {capitalizeFirstLetter(authUser.name)}</Typography>
            <IconButton
              size="large"
              aria-label="User Avatar"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleMenuAccount}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={signOutHandler}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Link to={LOGIN_PATH}>
            <Button color="secondary" sx={{ fontWeight: 700 }}>
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape(userShape),
  signOut: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  authUser: null,
};

export default Navigation;
