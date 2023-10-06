import { IPaginationProps } from '../../models'
import { usePagination, DOTS } from '../../hooks/usePagination'
import styles from '../../styles/Pagination.module.css'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

const Pagination: React.FC<IPaginationProps> = ({ total, limit, page, setSearchParams }) => {
  const paginationRange = usePagination({
    currentPage: page,
    totalCount: total,
    siblingCount: 1,
    pageSize: limit,
  })

  if (!paginationRange || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    const nextPage = (page + 1).toString()
    setSearchParams({ page: nextPage })
  }

  const onPrevious = () => {
    const previousPage = (page - 1).toString()
    setSearchParams({ page: previousPage })
  }

  let lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul className={styles.paginationContainer}>
      <li>
        <button
          title='Previous'
          className={`${styles.paginationItem} ${styles.paginationButton}`}
          disabled={page === 1}
          onClick={onPrevious}
        >
          <HiOutlineChevronLeft />
        </button>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index}>
              <span className={`${styles.paginationItem} ${styles.dot}`}>&#8230;</span>
            </li>
          )
        }

        return (
          <li key={index}>
            <span
              className={`${styles.paginationItem} ${pageNumber === page ? styles.active : ''}`}
              onClick={() => setSearchParams({ page: pageNumber.toString() })}
            >
              {pageNumber}
            </span>
          </li>
        )
      })}
      <li>
        <button
          title='Next'
          className={`${styles.paginationItem} ${styles.paginationButton}`}
          disabled={page === lastPage}
          onClick={onNext}
        >
          <HiOutlineChevronRight />
        </button>
      </li>
    </ul>
  )
}
export default Pagination
