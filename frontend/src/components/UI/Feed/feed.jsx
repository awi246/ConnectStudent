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
    async function getQuestions() {
      try {
        let url = "http://localhost:90/api/questions";
        if (selectedOption) {
          url += `?questionSubject=${selectedOption}`;
        }
        const response = await axios.get(url);
        const filteredPosts = response.data.reverse();
        setPosts(filteredPosts);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data. See console for details.");
        setLoading(false);
      }
    }

    getQuestions();
  }, [selectedOption]);

  return (
    <div className="feed">
      <Box />
      {loading && <Loading />}
      {!loading &&
        !error &&
        posts
          .filter(
            (post) => !selectedOption || post.questionSubject === selectedOption
          )
          .map((post, index) => <Post key={index} post={post} />)}
      {!loading &&
        !error &&
        posts.filter(
          (post) => !selectedOption || post.questionSubject === selectedOption
        ).length === 0 && (
          <div className="mt-6 flex flex-col justify-center">
            <p className="text-xl text-center">Oops. No any data found</p>
            <img
              src={NotFound}
              width={500}
              className="bg-transparent m-auto rounded-lg"
              
            />
          </div>
        )}{" "}
    </div>
  );
}

export default Feed;
