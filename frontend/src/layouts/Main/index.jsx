import Sidebar from '../SideBar';
import Widget from '../RightSide';
import Feed from '../../components/UI/Feed/feed';
import Header from '../../components/UI/Header/header';

const Main = () => {
  return (
      <div className='w-full'>
          <Header />
          <div className="bg-gray-100 min-h-screen p-12">
              <div className="flex flex-row justify-between">
                  <Sidebar />
                  <Feed />
                  <Widget/>
              </div>
          </div>
      </div>
  )
}

export default Main
