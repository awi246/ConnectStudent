import { FaUserCircle } from "react-icons/fa";
import '../../../styles/Box.css'
const Box = () => {
  return (
      <>
          <div className="Box">
              <div className="Box__info">
                  <FaUserCircle className='text-3xl' />
              </div>
              <div className="Box__question">
                  <h5>What is your question or link?</h5>
              </div>
          </div>
      </>
  )
}

export default Box
