import React from "react";
import "../index.css";
export default RedditCard;

let baseLink = "https://source.unsplash.com/random/600x500?sig=";

function RedditCard({ post }) {
	return (
		<div className="RedditCard">
			<div className="RedditPostHeader">
				<h2>{post.title}</h2>
				<p>r/{post.subreddit}</p>
				<div className="PostDetails">
					<p>By: u/{post.author}</p>
					<p>{Date(post.created).toString()}</p>
				</div>
			</div>

			<div className="ImageContainer">
				<img className="RedditPostImage" src={
					post.url_overridden_by_dest != null
						? post.url_overridden_by_dest
						: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
				} alt="React Reddit" />
			</div>
			<div className="RedditPostFooter">
				<p>upvotes: {post.ups}({post.upvote_ratio * 100}%)</p>
				<p>comments: {post.num_comments}</p>
			</div>
		</div>
	);
}