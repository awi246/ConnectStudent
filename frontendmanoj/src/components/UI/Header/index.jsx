
//inbuild library
import { useState } from "react";

//thirdparty library
import axios from "axios";

//icons
import { FiHome } from "react-icons/fi";
import { MdOutlineAssignmentTurnedIn, MdExpandMore, MdOutlineFeaturedPlayList } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import { IoNotificationsOutline, IoCloseOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { Modal } from "react-responsive-modal";
import logo from "../../../assets/smalllogo.ico";

//styles
import '../../../styles/Header.css'
import { Button } from "@material-tailwind/react";

function Header ()
{
    const [ isModalOpen, setIsModalOpen ] = useState( false );
    const [ inputUrl, setInputUrl ] = useState( "" );
    const [ question, setQuestion ] = useState( "" );
    const Close = <IoCloseOutline />;
    const handleSubmit = async () =>
    {
        if ( question !== "" )
        {

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = {
                questionName: question,
                questionUrl: inputUrl,

            };
            await axios
            .post( "/api/questions", body, config )
                .then( ( res ) =>
                {
                    console.log( res.data );
                    alert( res.data.message );
                    window.location.href = "/";
                } )
                .catch( ( e ) =>
                {
                    console.log( e );
                    alert( "Error in adding question" );
                } );
        }
    };

    // const handleLogout = () => {
    //   if (window.confirm("Are you sure to logout ?")) {
    //     signOut(auth)
    //       .then(() => {
    //         dispatch(logout());
    //         console.log("Logged out");
    //       })
    //       .catch(() => {
    //         console.log("error in logout");
    //       });
    //   }
    // };

    return (
        <div className="Header">
            <div className="flex flex-row items-center gap-8">
                <div>
                    <img
                        src={ logo }
                        alt="logo"
                        width={ 56 }
                    />
                </div>
                <div className="flex flex-row gap-11">
                    <FiHome className='text-2xl cursor-pointer' />
                    <MdOutlineFeaturedPlayList className='text-2xl cursor-pointer' />
                    <MdOutlineAssignmentTurnedIn className='text-2xl cursor-pointer' />
                    <GoPeople className='text-2xl cursor-pointer' />
                    <IoNotificationsOutline className='text-2xl cursor-pointer' />

                </div>
                <div className="Header__input">
                    <CiSearch />
                    <input type="text" placeholder="Search questions" />
                </div>
                <div className="flex flex-row items-center gap-3">
                    <span >
                        <RxAvatar className='text-4xl' />
                    </span>
                    <Button color="blue" className="hover:bg-green-300" onClick={ () => setIsModalOpen( true ) }>Add Question</Button>
                </div>
                <Modal
                    open={ isModalOpen }
                    closeIcon={ Close }
                    classNames={ {
                        modal:'addQuestionModal',
                        modalAnimationIn: 'customEnterModalAnimation',
                        modalAnimationOut: 'customLeaveModalAnimation',
                    } }
                    animationDuration={ 800 }
                    onClose={ () => setIsModalOpen( false ) }
                    closeOnEsc
                    center
                    closeOnOverlayClick={ false }
                    styles={ {
                        overlay: {
                            height: "auto",
                        },
                    } }
                >
                    <div className="modal__title">
                        <h5>Add Question</h5>
                        <h5>Share Link</h5>
                    </div>
                    <div className="modal__info">
                        <RxAvatar className="avatar text-2xl" />
                        <div className="modal__scope">
                            <GoPeople className="text-xl" />
                            <p>Public</p>
                            <MdExpandMore />
                        </div>
                    </div>
                    <div className="modal__Field">
                        <input
                            value={ question }
                            onChange={ ( e ) => setQuestion( e.target.value ) }
                            type=" text"
                            className="p-3 mb-5"
                            placeholder="Start your question with 'What', 'How', 'Why', etc. "
                        />
                        <div
                            style={ {
                                display: "flex",
                                flexDirection: "column",
                            } }
                        >
                            <input
                                type="text"
                                value={ inputUrl }
                                onChange={ ( e ) => setInputUrl( e.target.value ) }
                                style={ {
                                    margin: "5px 0",
                                    border: "1px solid lightgray",
                                    padding: "10px",
                                    outline: "2px solid #000",
                                } }
                                placeholder="Optional: inclue a link that gives context"
                            />
                            { inputUrl !== "" && (
                                <img
                                    style={ {
                                        height: "40vh",
                                        objectFit: "contain",
                                    } }
                                    src={ inputUrl }
                                    alt="displayimage"
                                />
                            ) }
                        </div>
                    </div>
                    <div className="modal__buttons">
                        <button className="cancle" onClick={ () => setIsModalOpen( false ) }>
                            Cancel
                        </button>
                        <Button onClick={ handleSubmit } type="submit">
                            Add Question
                        </Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default Header;
