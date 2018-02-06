import React from 'react';
import HomeScreen from '../../components/HomeScreen/HomeScreen';
import './RootContainer.scss';

export default class RootContainer extends React.Component {
  render() {
    return (
      <div>
        <span className="logo">🌈💻 Colors.sh</span>
        <HomeScreen />
        <footer>
          <a
            href="https://misc.flogisoft.com/bash/tip_colors_and_formatting"
            target="_blank"
            rel="noopener noreferrer"
          >
            Full docs
          </a>
          <div className="author">
            Made by
            <a href="https://twitter.com/messutied" target="_blank" rel="noopener noreferrer">
              @messutied
            </a>
          </div>
        </footer>
      </div>
    );
  }
}
