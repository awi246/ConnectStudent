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
        <div className="quora__contents">
        <div className="quora__content">
          <Sidebar />
          <Feed />
          <Widget />
        </div>
      </div>
    </div>
  )
}

export default main