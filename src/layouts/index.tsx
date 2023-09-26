import Header from './Header'
import Footer from './Footer'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import styles from '../styles/Global.module.css'

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className={`${styles.main} ${styles.container}`}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}

export default Layout
