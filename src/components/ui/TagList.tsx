import Tag from './Tag'
import styles from '../../styles/Global.module.css'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'
import { useEffect, useRef, useState } from 'react'

interface Props {
  tagList: string[]
  tagActive: string | undefined
}

const TagList: React.FC<Props> = ({ tagList, tagActive }) => {
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

  return (
    tagList.length > 0 && (
      <section className={styles.tabContainer}>
        <div className={styles.tabBar}>
          <div className={`${isAt.end ? styles.active : ''} ${styles.leftArrow}`}>
            <HiOutlineChevronLeft className={styles.icon} title='Previous' onClick={scrollPrev} />
          </div>
          <ul className={styles.tabs} ref={tabRef} onScroll={handleScroll}>
            {tagList.map((tag: string) => (
              <Tag key={tag} tag={tag} tagActive={tagActive} />
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
