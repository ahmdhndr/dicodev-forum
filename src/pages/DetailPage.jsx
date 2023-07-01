import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailThread from '../components/DetailThread';
import SectionComment from '../components/SectionComment';
import { asyncAddComment, asyncReceiveDetailThread } from '../states/detailThread/action';

function DetailPage() {
  const { id } = useParams();
  const authUser = useSelector((state) => state.authUser);
  const detailThread = useSelector((state) => state.detailThread);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));
  }, [id, dispatch]);

  if (!detailThread) {
    return null;
  }

  const commentThreadHandler = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  return (
    <Container component="section" sx={{ marginY: 3 }} maxWidth="md">
      <DetailThread detailThread={detailThread} authUser={authUser} />
      <SectionComment
        authUser={authUser}
        comments={detailThread.comments}
        onCommentThread={commentThreadHandler}
      />
    </Container>
  );
}

export default DetailPage;
