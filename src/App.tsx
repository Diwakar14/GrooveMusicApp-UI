import React from 'react';
import { Provider } from 'react-redux';
import RoutesContainer from './components/RoutesContainer';
import Sidebar from './components/Sidebar/Sidebar';
import { store } from './redux/store';
import './styles/App.scss';

const App = () => {
  return (
    <Provider store={store}>
      <div className="groove-music">
        <Sidebar />
        <RoutesContainer />
      </div>

    </Provider>

  );
}

export default App;
