/* eslint-disable react/prop-types */
// Feed.js
import { useEffect, useState } from "react";
import Box from "./../Box/box";
import "../../../styles/Feed.css";
import Post from "./../Post/post";
import axios from "axios";
import Loading from "../Loading";
import NotFound from "../../../assets/notFound.gif";

function Feed({ selectedOption }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getQuestion() {
      try {
        const response = await axios.get("http://localhost:90/api/questions");
        const filteredPosts = response.data.filter(
          (post) => post.questionSubject === selectedOption
        );
        setPosts(filteredPosts.reverse());
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    }
    getQuestion();
  }, [selectedOption]);

  return (
    <div className="feed">
      <Box />
      {loading && <Loading />}
      {error && <p>{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <>
          <div className="mt-6 flex flex-col justify-center">
            <p className="text-xl text-center mb-2">Oops. No any data found</p>
            <img src={NotFound} className="bg-transparent w-full rounded-lg" />
          </div>
        </>
      )}
      {!loading &&
        !error &&
        posts.map((post, index) => <Post key={index} post={post} />)}
    </div>
  );
}

export default Feed;
