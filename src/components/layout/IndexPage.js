import React from 'react';

import Search from '../tracks/Search';
import Tracks from '../tracks/Tracks';

const IndexPage = () => {
  return (
    <React.Fragment>
      <Search />
      <Tracks />
    </React.Fragment>
  );
};

export default IndexPage;