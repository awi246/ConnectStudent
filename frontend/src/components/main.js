import React from 'react'
import Header from './Header'
import './css/Main.css'
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widget from  './Widget';
function main() {
  return (
    <div className='main'>
        <Header/>
        <div className="contents">
        <div className="content">
          <Sidebar />
          <Feed />
          <Widget />
        </div>
      </div>
    </div>
  )
}

export default main