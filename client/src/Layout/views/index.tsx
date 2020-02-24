import React from 'react';

import Layout from '../Layout';
import routes from '../../routes';
import RouteList from '../../routes/RouteList';

import './index.scss';

const App = () => {
  return (
    <Layout>
      <RouteList routes={routes} />
    </Layout>
  );
};

export default App;
