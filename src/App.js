import './index.css';
import RedditCard from './components/Card';
import logo from './resources/logo.png';
import { useState, useEffect } from 'react';

function App() {
	const [subreddit, setSubreddit] = useState('dankmemes');
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch(`https://www.reddit.com/r/${subreddit}.json?limit=10`)
			.then(res => res.json())
			.then(data => {
				if (data != null) {
					setPosts(data.data.children);
				}
				else {
					console.log("Got Empty Data!");
				}
			});
	}, [subreddit]);

	console.log("These are the posts:", posts);

	return (
		<div>
			<nav className="navbar">
				<img className="nav-logo" src={logo} alt="logo" />
				<a className="navbar-brand" href="#">
					Reacteddit
				</a>
			</nav>
			<div className="contents-under">
				{
					posts.map(
						(posts != null) ? (post, index) => <RedditCard post={post.data} key={index} /> : <h1>Loading...</h1>
					)
				}
			</div>
		</div>
	);
}

export default App;
