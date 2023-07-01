import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { handleCategoryProps, keywordProps } from '../utils/globalPropTypes';

function CategoryItem({ keyword, category, handleCategory }) {
  const onClickButtonHandler = ({ currentTarget }) => {
    handleCategory(currentTarget.innerText.toLowerCase());
  };
  return (
    <Button
      variant={keyword === category ? 'contained' : 'outlined'}
      sx={{
        minWidth: 'auto',
        p: '5px 12px',
      }}
      size="small"
      type="button"
      onClick={onClickButtonHandler}
    >
      {category}
    </Button>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  keyword: keywordProps.isRequired,
  handleCategory: handleCategoryProps.isRequired,
};

export default CategoryItem;
