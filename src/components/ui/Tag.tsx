import { Link } from 'react-router-dom'
import styles from '../../styles/Global.module.css'

const Tag: React.FC<any> = ({ tag, tagActive }) => {
  return (
    <Link className={`${styles.tab} ${tagActive === tag ? styles.active : ''}`} to={`/tags/${tag}`}>
      #{tag}
    </Link>
  )
}

export default Tag
