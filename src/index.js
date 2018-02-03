import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RootContainer from './containers/RootContainer/RootContainer';

class ErrorReporter extends React.Component {
  render() {
    return (
      <div className="unrecoverable-error">
        <b>Unrecoverable error:</b> {this.props.error.message}
        {this.props.error.stack}
      </div>
    );
  }
}

function render(Component = RootContainer) {
  ReactDOM.render(
    <AppContainer errorReporter={ErrorReporter}>
      <Component />
    </AppContainer>,
    document.getElementById('app'),
  );
}

render();

if (module.hot) {
  module.hot.accept('./containers/RootContainer/RootContainer', () => {
    render(require('./containers/RootContainer/RootContainer').default);
  });
}
