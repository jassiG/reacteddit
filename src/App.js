import './App.css';

let baseLink = "https://source.unsplash.com/random/150x400?sig=";

function RedditCard() {
  return (
    <div className="RedditCard">
      <RedditPostHeader />
      <RedditPostBody />
    </div>
  );
}

function RedditPostHeader() {
  return (
    <div className="RedditPostHeader">
      <h1>Post Title</h1>
      <PostDetails />
    </div>
  );
}
function PostDetails() {
  return (
    <div className="PostDetails">
      <p>By: u/Author</p>
      <p>18/10/21</p>
    </div>
  );
}

function RedditPostBody() {
  return (
    <img className="RedditPostImage" src={baseLink + Math.random() * 1000} alt="React Reddit" />
  );
}

function App() {
  return (
    <RedditCard />
  );
}

export default App;
