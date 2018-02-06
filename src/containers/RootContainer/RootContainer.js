import React from 'react';
import HomeScreen from '../../components/HomeScreen/HomeScreen';
import './RootContainer.scss';

export default class RootContainer extends React.Component {
  render() {
    return (
      <div>
        <span className="logo">🌈💻 Colors.sh</span>
        <HomeScreen />
      </div>
    );
  }
}
