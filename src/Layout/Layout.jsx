import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Carta from '../components/Carta/Carta'
import Team from '../components/Team/Team'
import Career from '../components/Career/Career'
import News from '../components/News/News'
import Partners from '../components/Partners/Partners'

function Layout() {
  return (
    <div>
        <Header/>
        <Carta/>
        <Outlet/>
        <Partners/>
        <News/>
        <Team/>
        <Career/>
        <Footer/>
    </div>
  )
}

export default Layout