import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import UsersMock from '../../mocks/users.json';
import PostsMock from '../../mocks/posts.json';

describe(' some simple test cases', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders without crashing with mocked response', () => {
    fetch.mockResponses(
      [JSON.stringify(UsersMock)],
      [JSON.stringify(PostsMock)]
    )
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    expect(fetch).toBeCalledWith('https://jsonplaceholder.typicode.com/users');
    expect(fetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts');
  });

  it('renders without crashing with rejected response', () => {
    fetch.mockReject(new Error('fake error message'));

    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
    expect(fetch).toBeCalledWith('https://jsonplaceholder.typicode.com/users');
    expect(fetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts');
  });  
});
