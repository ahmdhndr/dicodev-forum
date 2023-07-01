import React from 'react';
import { Navigate } from 'react-router-dom';
import { PropTypes, childrenProps, userShape } from '../utils/globalPropTypes';

function ProtectAuthPage({ authUser, children }) {
  return authUser ? <Navigate to="/" replace /> : children;
}

ProtectAuthPage.propTypes = {
  authUser: PropTypes.shape(userShape),
  children: childrenProps.isRequired,
};

ProtectAuthPage.defaultProps = {
  authUser: null,
};

export default ProtectAuthPage;
