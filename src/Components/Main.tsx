import React from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Store } from '../Features/Store'
import Body from './body/Body'
import Nav from './Head/Nav'


const Main = () => {
  return (
    <>
      <div className="vh-100 ">
        <Provider store={Store}>
      <BrowserRouter>
        <ProSidebarProvider>
            <Nav />
            <Body/>
        </ProSidebarProvider>
        </BrowserRouter>
        </Provider>
      </div>

    </>

  )
}

export default Main