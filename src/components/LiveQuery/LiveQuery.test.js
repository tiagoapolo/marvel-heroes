import React from 'react';
import ReactDOM from 'react-dom';
import LiveQuery from './LiveQuery';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LiveQuery />, div);
  ReactDOM.unmountComponentAtNode(div);
});
