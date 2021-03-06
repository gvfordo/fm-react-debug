import { useState, useEffect } from 'react';
import './App.css';
import _ from 'underscore';

function App() {

  const [ posts, updatePosts ] = useState([]);
  const [ usersById, updateUsersById ] = useState({});

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(posts => updatePosts(posts));
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => updateUsersById(_.indexBy(users, 'id')));
  }, []);

  const getUsername = (userId) => {
    const user = usersById[ userId ];

    return user ? user.name : 'Unknown User';
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-content">
          <h1 className="App-title">Debugging App</h1>
        </div>
      </header>
      <section className="posts">
        { posts.map(post => {
          return (
            <article style={{ margin: '10px 0', padding: 10, border: '1px solid #ccc'}}>
              <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>{ post.title }</p>
              <p>{ getUsername(post.userId) }</p>
              <p>{ post.body }</p>
            </article>
          )
        })}
      </section>
    </div>
  );
}

export default App;
