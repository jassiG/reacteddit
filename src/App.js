import './index.css';
import RedditCard from './components/Card';
import logo from './resources/logo.png';
import { useState, useEffect } from 'react';

function shuffle(array) {
	let currentIndex = array.length,  randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}

	return array;
}
  
function App() {
	const [subreddit, setSubreddit] = useState('all');
	const [correctSubreddit, setCorrectSubreddit] = useState(true);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch(`https://www.reddit.com/r/${subreddit}.json?limit=100`)
			.then(res => {
				if (res.status !== 200) {
					setCorrectSubreddit(false);
					console.log('Error: ' + res.status);
				}
				else {
					setCorrectSubreddit(true);
					return res.json();
				}
			}
			).then(data => {
				if (data != null) {
					shuffle(data.data.children);
					setPosts(data.data.children);
				}
				else {
					console.log("Got Empty Data!");
					setCorrectSubreddit(false);
				}
			});
	}, [subreddit]);

	// console.log("These are the posts:", posts);
	let searchTerm = "";
	return (
		<div>
			<nav className="navbar">
				<img className="nav-logo" src={logo} alt="logo" />
				<a className="navbar-brand" href="#">
					Reacteddit
				</a>
				<form className="subreddit-search">
					<input
						className="search-form"
						type="search"
						placeholder="Search"
						aria-label="Search"
						onChange={e => {
							// store the search term
							searchTerm = e.target.value;
						}}
						onKeyPress={e => {
							// if the user presses enter, set the subreddit to the search term
							if (e.key === 'Enter') {
								setSubreddit(searchTerm);
								console.log(searchTerm);
							}
						}}
					/>
					{/* <button
						className="search-btn"
						type="submit"
						onClick={e => setSubreddit(searchTerm)}
					>
						🔍
					</button> */}
				</form>
			</nav>
			{
				correctSubreddit ?
					<div className="contents-under">
						{
							posts.map(
								(posts != null) ? (post, index) => <RedditCard post={post.data} key={index} /> : <h1>Loading...</h1>
							)
						}
					</div>
					: <div className="contents-under invalid-subreddit">
						<h1 className="red">Invalid Subreddit</h1>
						<h2>Please try again</h2>
					</div>
			}
		</div>
	);
}

export default App;
