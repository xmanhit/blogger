import { Link, LoaderFunction, redirect, useNavigate, useParams } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'
import ArticleForm from '../../components/form/ArticleForm'
import { isAuthenticated } from '../../services'
import Logo from '../../assets/logo.svg'
import styles from '../../styles/ArticleForm.module.css'

export const formArticleLoader: LoaderFunction = () => {
  if (!isAuthenticated()) {
    return redirect('/login')
  }
  return null
}

const FormArticle: React.FC = () => {
  const { slug } = useParams<string>()
  const navigate = useNavigate()

  return (
    <>
      <header className={styles.formArticleHeader}>
        <div className={styles.container}>
          <nav className={styles.navbar}>
            <Link className={`${styles.logo} ${styles.navLink}`} to='/' aria-label='logo'>
              <Logo />
            </Link>
            <p className={styles.title}>{!slug ? 'Create Post' : 'Edit Post'}</p>
            <button type='button' onClick={() => navigate(-1)} className={styles.btnClose} title='Close the Editer'>
              <IoClose />
            </button>
          </nav>
        </div>
      </header>
      <main className={styles.container}>
        <ArticleForm />
      </main>
    </>
  )
}

export default FormArticle
