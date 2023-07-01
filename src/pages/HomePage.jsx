import { Container, Divider, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ButtonAddThread from '../components/ButtonAddThread';
import CategoriesList from '../components/CategoriesList';
import SectionCategory from '../components/SectionCategory';
import SectionThread from '../components/SectionThread';
import ThreadsList from '../components/ThreadsList';
import { PropTypes, userShape } from '../utils/globalPropTypes';

function HomePage({ authUser }) {
  const [keyword, setKeyword] = useState('');
  const users = useSelector((state) => state.users);
  const threads = useSelector((state) => state.threads);

  const handleCategory = (key) => {
    setKeyword((prevState) => (prevState === key ? '' : key));
  };

  const categories = threads
    .map(({ category }) => category)
    .filter(
      (category, index, currentCategory) =>
        currentCategory.indexOf(category) === index,
    );

  const threadList = threads
    .map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId),
      authUser,
    }))
    .filter((thread) => {
      if (keyword === '') {
        return thread;
      }
      return thread.category === keyword;
    });

  return (
    <Container component="section">
      <Grid container>
        <SectionThread>
          <ThreadsList threads={threadList} authUser={authUser} />
        </SectionThread>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ order: { md: 2 }, display: { xs: 'none', md: 'block' } }}
        />
        <SectionCategory>
          <CategoriesList
            categories={categories}
            keyword={keyword}
            handleCategory={handleCategory}
          />
        </SectionCategory>
      </Grid>
      {authUser && <ButtonAddThread />}
    </Container>
  );
}

HomePage.propTypes = {
  authUser: PropTypes.shape(userShape),
};

HomePage.defaultProps = {
  authUser: null,
};

export default HomePage;
