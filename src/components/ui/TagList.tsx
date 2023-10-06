import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'
import { useEffect, useRef, useState } from 'react'
import Tag from './Tag'
import TagsLoading from './TagsLoading'
import styles from '../../styles/TagList.module.css'

interface Props {
  isTagsLoading: boolean
  tagList: string[]
  tagActive?: string
}

const TagList: React.FC<Props> = ({ isTagsLoading, tagList, tagActive }) => {
  const tabRef = useRef<HTMLUListElement>(null)
  const [isAt, setIsAt] = useState<{ start: boolean; end: boolean }>({
    start: false,
    end: false,
  })

  useEffect(() => {
    handleScroll()
  }, [tagList.length])

  const handleScroll = () => {
    if (tabRef.current) {
      const { scrollWidth, scrollLeft, clientWidth } = tabRef.current
      const isAtStart = scrollLeft === 0
      const isAtEnd = scrollWidth - Math.floor(scrollLeft) <= clientWidth + 1
      const isNotScroll = scrollWidth <= clientWidth

      if (isAtStart) {
        setIsAt({
          start: true,
          end: false,
        })
      }
      if (isAtEnd) {
        setIsAt({
          start: false,
          end: true,
        })
      }
      if (isNotScroll) {
        setIsAt({
          start: false,
          end: false,
        })
      }
    }
  }

  const scrollNext = () => {
    if (tabRef.current) {
      tabRef.current.scrollLeft += tabRef.current.clientWidth / 2
    }
  }

  const scrollPrev = () => {
    if (tabRef.current) {
      tabRef.current.scrollLeft -= tabRef.current.clientWidth / 2
    }
  }
  if (isTagsLoading) {
    return <TagsLoading />
  }

  return (
    tagList.length > 0 && (
      <section className={styles.tabContainer}>
        <div className={styles.tabBar}>
          <div className={`${isAt.end ? styles.active : ''} ${styles.leftArrow}`}>
            <HiOutlineChevronLeft className={styles.icon} title='Previous' onClick={scrollPrev} />
          </div>
          <ul className={styles.tabs} ref={tabRef} onScroll={handleScroll}>
            {tagList.map((tag: string) => (
              <li key={tag}>
                <Tag tag={tag} tagActive={tagActive} />
              </li>
            ))}
          </ul>
          <div className={`${isAt.start ? styles.active : ''} ${styles.rightArrow}`}>
            <HiOutlineChevronRight className={styles.icon} title='Next' onClick={scrollNext} />
          </div>
        </div>
      </section>
    )
  )
}

export default TagList
