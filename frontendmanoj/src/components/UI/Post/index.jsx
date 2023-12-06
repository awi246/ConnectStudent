//inbuild ilbrary
import { useState } from "react";


//third party library
import ReactQuill from "react-quill";
import { Modal } from "react-responsive-modal";
import axios from "axios";

//assets / icons
import { IoArrowDown, IoArrowUp, IoClose } from "react-icons/io5";
import { SlUser } from "react-icons/sl";
import { CiChat2 } from "react-icons/ci";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsRepeat } from "react-icons/bs";
import { CiShare2 } from "react-icons/ci";
import BrokenImg from "../../../assets/brokeImg.png";

//styles
import "../../../styles/Post.css";
import "react-responsive-modal/styles.css";
import "react-quill/dist/quill.snow.css";


//services
// import { useSelector } from "react-redux";
// import { selectUser } from "../feature/userSlice";
function LastSeen ( { date } )
{
  return (
    <span>
      { new Date().getFullYear() }-{ ( new Date().getMonth() + 1 ).toString().padStart( 2, '0' ) }-{ new Date().getDate().toString().padStart( 2, '0' ) } { new Date().getHours().toString().padStart( 2, '0' ) }:{ new Date().getMinutes().toString().padStart( 2, '0' ) }:{ new Date().getSeconds().toString().padStart( 2, '0' ) }
    </span>
  );
}
function Post ( { post } )
{
  console.log( "post", post );
  const [ isModalOpen, setIsModalOpen ] = useState( false );
  const [ answer, setAnswer ] = useState( "" );
  const Close = <IoClose />;

  //   const user = useSelector(selectUser);

  const handleQuill = ( value ) =>
  {
    setAnswer( value );
  };
  // console.log(answer);

  const handleSubmit = async () =>
  {
    if ( post?._id && answer !== "" )
    {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        answer: answer,
        questionId: post?._id,
        // user: user,
      };
      await axios
        .post( "/api/answers", body, config )
        .then( ( res ) =>
        {
          console.log( res.data );
          alert( "Answer added succesfully" );
          setIsModalOpen( false );
          window.location.href = "/";
        } )
        .catch( ( e ) =>
        {
          console.log( e );
        } );
    }
  };
  return (
    <div className="post">
      <div className="post__info">
        <img src={ post?.user?.photo ? post?.user?.photo : BrokenImg } width={ 48 } />
        <h4>{ post?.user?.userName }</h4>

        <small>
          <LastSeen date={ post?.createdAt } />
        </small>
      </div>
      <div className="post__body">
        <div className="post__question">
          <p>{ post?.questionName }</p>
          <button
            onClick={ () =>
            {
              setIsModalOpen( true );
              console.log( post?._id );
            } }
            className="post__btnAnswer"
          >
            Answer
          </button>
          <Modal
            open={ isModalOpen }
            closeIcon={ Close }
            onClose={ () => setIsModalOpen( false ) }
            closeOnEsc
            center
            closeOnOverlayClick={ false }
            classNames={ {
              modal: 'answermodal',
              modalAnimationIn: 'customEnterModalAnimation',
              modalAnimationOut: 'customLeaveModalAnimation',
            } }
            styles={ {
              overlay: {
                height: "auto",
              },
            } }
          >
            <div className="modal__question">
              <h1>{ post?.questionName }</h1>
              <p>
                asked by <span className="name">{ post?.user?.userName }</span> on{ " " }
                <span className="name">
                  {/* { new Date( post?.createdAt ).toLocaleString() } */ }
                  { new Date().getFullYear() }-{ ( new Date().getMonth() + 1 ).toString().padStart( 2, '0' ) }-{ new Date().getDate().toString().padStart( 2, '0' ) } { new Date().getHours().toString().padStart( 2, '0' ) }:{ new Date().getMinutes().toString().padStart( 2, '0' ) }:{ new Date().getSeconds().toString().padStart( 2, '0' ) }
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <ReactQuill
                value={ answer }
                onChange={ handleQuill }
                placeholder="Enter your answer"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={ () => setIsModalOpen( false ) }>
                Cancel
              </button>
              <button onClick={ handleSubmit } type="submit" className="add">
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        { post && post.questionUrl !== "" && <img src={ post.questionUrl } alt="url" /> }

      </div>
      <div className="post__footer">
        <div className="flex items-center gap-4 text-2xl w-full justify-between">
          <div className="post__footerAction space-x-6">
            <IoArrowUp />
            <IoArrowDown />
          </div>
          <BsRepeat />
          <CiChat2 />
          <div className="post__footerLeft flex items-center gap-2">
            <CiShare2 />
            <FiMoreHorizontal />
          </div>
        </div>
      </div>
      <p
        style={ {
          color: "rgba(0,0,0,0.5)",
          fontSize: "12px",
          fontWeight: "bold",
          margin: "10px 0",
        } }
      >
        { post?.allAnswers.length } Answer(s)
      </p>

      <div
        style={ {
          margin: "5px 0px 0px 0px ",
          padding: "5px 0px 0px 20px",
          borderTop: "1px solid lightgray",
        } }
        className="post__answer"
      >
        { post?.allAnswers?.map( ( _a ) => (
          <>
            <div
              style={ {
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "10px 5px",
                borderTop: "1px solid lightgray",
              } }
              className="post-answer-container"
            >
              <div
                style={ {
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#888",
                } }
                className="post-answered"
              >
                { _a?.user?.photo !== '' ?
                  <img src={ _a?.user?.photo } />
                  :
                  <SlUser />
                }
                <div
                  style={ {
                    margin: "0px 10px",
                  } }
                  className="post-info"
                >
                  <p>{ _a?.user?.userName }</p>
                  <span>
                    <LastSeen date={ _a?.createdAt } />
                  </span>
                </div>
              </div>
              <div className="post-answer">{ ReactHtmlParser( _a?.answer ) }</div>
            </div>
          </>
        ) ) }
      </div>
    </div>
  );
}

export default Post;
