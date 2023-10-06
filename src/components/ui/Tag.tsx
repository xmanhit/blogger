import { Link } from 'react-router-dom'
import styles from '../../styles/TagList.module.css'

interface Props {
  tag: string
  tagActive?: string
}

const Tag: React.FC<Props> = ({ tag, tagActive }) => {
  return (
    <Link className={`${styles.tab} ${tagActive === tag ? styles.active : ''}`} to={`/tags/${tag}`}>
      #{tag}
    </Link>
  )
}

export default Tag
