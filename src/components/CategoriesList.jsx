import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import { handleCategoryProps, keywordProps } from '../utils/globalPropTypes';

function CategoriesList({ categories, keyword, handleCategory }) {
  return (
    <Box
      className="custom-scrollbar"
      sx={{
        display: {
          xs: 'flex',
          md: 'grid',
        },
        alignItems: 'center',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridAutoFlow: 'dense',
        gap: 1,
        overflow: { xs: 'auto', md: 'hidden' },
      }}
    >
      {categories.map((category) => (
        <CategoryItem
          key={category}
          keyword={keyword}
          category={category}
          handleCategory={handleCategory}
        />
      ))}
    </Box>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  keyword: keywordProps.isRequired,
  handleCategory: handleCategoryProps.isRequired,
};

export default CategoriesList;
