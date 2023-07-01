import React from 'react';
import { PropTypes } from '../utils/globalPropTypes';

function DicodevLogo({ fillColor }) {
  return (
    <div
      style={{
        width: '24px',
        display: 'flex',
        alignItems: 'center',
        verticalAlign: 'middle',
      }}
    >
      <svg
        id="Layer_2"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 456.66 472.49"
      >
        <path
          fill={fillColor}
          d="M413.4,191.6H341.46a88.92,88.92,0,1,1,0-177.84h87.45a49.48,49.48,0,0,1,49.42,49.42,25,25,0,0,1-50,.58H341.46a38.92,38.92,0,1,0,0,77.84H413.4a25,25,0,0,1,0,50Z"
          transform="translate(-21.67 -13.76)"
        />
        <path
          fill={fillColor}
          d="M233.31,486.24A25,25,0,0,1,212.41,475l-90.74-138.3a3.67,3.67,0,0,0-2.18-1.1H71.09a49.48,49.48,0,0,1-49.42-49.42V63.18A49.48,49.48,0,0,1,71.09,13.76H83.16c74.92,0,135.88,61,135.88,135.87a25,25,0,0,1-50,0A86,86,0,0,0,83.16,63.76H71.67V285.55h47.61c.82,0,1.63,0,2.44.06A53.88,53.88,0,0,1,161,305.73a24.47,24.47,0,0,1,1.48,2l70.15,106.92,65.57-106.33a28.22,28.22,0,0,1,1.86-2.62,53.88,53.88,0,0,1,39.3-20.12c.77,0,1-.05,88.95-.06a25,25,0,0,1,50,.58,49.48,49.48,0,0,1-49.42,49.42c-22.66,0-80.34,0-87.5,0a3.79,3.79,0,0,0-1.8.94l-85,137.85a25,25,0,0,1-20.93,11.87Z"
          transform="translate(-21.67 -13.76)"
        />
      </svg>
    </div>
  );
}

DicodevLogo.propTypes = {
  fillColor: PropTypes.string.isRequired,
};

export default DicodevLogo;
