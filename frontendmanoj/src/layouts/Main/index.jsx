import Feed from "../../components/UI/Feed"
import Header from "../../components/UI/Header"
import Widget from "../RightSide"
import Sidebar from "../SideBar"

const Main = () => {
  return (
      <div className='w-full'>
          <Header />
          <div className="bg-gray-100 min-h-screen p-12">
              <div className="flex flex-row justify-between w-[70vw]">
                  <Sidebar />
                  <Feed />
                  <Widget />
              </div>
          </div>
      </div>
  )
}

export default Main
