import './index.css';
import RedditCard from './components/Card';
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
			{
				posts.map(
					(posts != null) ? (post, index) => <RedditCard post={post.data} key={index} /> : <h1>Loading...</h1>
				)
			}
		</div>
	);
}

export default App;
