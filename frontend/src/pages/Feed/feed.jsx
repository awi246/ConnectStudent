/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Box from "../../components/UI/Box/box";
import "../../styles/Feed.css";
import Post from "../../components/UI/Post/post";
import axios from "axios";
import Loading from "../../components/UI/Loading";
import NotFound from "../../assets/notFound.gif";
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/userSlice";

function Feed({ selectedOption }) {
  const user = useSelector(selectUser);
  const uid = user?.uid;
  // console.log("uid", uid);
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 5;
  useEffect(() => {
    async function getQuestions() {
      try {
        let url = "http://localhost:90/api/questions";
        if (selectedOption === "myPosts" && uid) {
          url += `?uid=${uid}`;
        } else if (selectedOption) {
          url += `?questionSubject=${selectedOption}`;
        }
        const response = await axios.get(url);

        const sortedPosts = response.data.sort((a, b) => {
          if (b.votes.upvote !== a.votes.upvote) {
            return b.votes.upvote - a.votes.upvote;
          } else if (b.votes.downvote !== a.votes.downvote) {
            return a.votes.downvote - b.votes.downvote;
          } else {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
        });

        setPosts(sortedPosts);
        setCurrentPage(0);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    }

    getQuestions();
  }, [selectedOption, uid]);

  useEffect(() => {
    const startIndex = currentPage * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    let filteredAndSlicedPosts = [];

    if (!selectedOption) {
      filteredAndSlicedPosts = posts.slice(startIndex, endIndex);
    } else {
      filteredAndSlicedPosts = posts
        .filter(
          (post) =>
            post.questionSubject === selectedOption ||
            (selectedOption === "myPosts" && post.uid === uid)
        )
        .slice(startIndex, endIndex);
    }

    setDisplayedPosts(filteredAndSlicedPosts);
  }, [currentPage, posts, selectedOption, uid]);

  return (
    <div className="feed">
      <Box />
      {loading && <Loading />}
      {!loading &&
        !error &&
        displayedPosts.map((post, index) => <Post key={index} post={post} />)}
      {!loading &&
        !error &&
        selectedOption &&
        posts.filter(
          (post) =>
            post.questionSubject === selectedOption ||
            (selectedOption === "myPosts" && post.uid === uid)
        ).length === 0 && (
          <div className="mt-6 flex flex-col justify-center">
            <p className="text-xl text-center">Oops!!! No data found</p>
            <img
              src={NotFound}
              className="bg-transparent m-auto rounded-lg"
              alt="Not Found"
            />
          </div>
        )}

      {!loading && !error && (
        <div className="pagination-container mt-auto">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={Math.ceil(
              posts.filter(
                (post) =>
                  !selectedOption ||
                  post.questionSubject === selectedOption ||
                  post.uid === uid
              ).length / postsPerPage
            )}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected }) => {
              setCurrentPage(selected);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination_link"}
            nextLinkClassName={"pagination_link"}
            disabledClassName={"pagination_link--disabled"}
            activeClassName={"pagination_link--active"}
          />
        </div>
      )}
    </div>
  );
}

export default Feed;
