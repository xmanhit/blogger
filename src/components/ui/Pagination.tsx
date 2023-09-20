import { IPaginationProps } from '../../models'

const Pagination: React.FC<IPaginationProps> = ({ pagination, total, limit, page, setSearchParams }) => {
  return (
    total > limit && (
      <div>
        {pagination.map((pageNumber: number) => (
          <button
            className={pageNumber === page ? 'active' : ''}
            key={pageNumber}
            onClick={() => {
              setSearchParams({ page: pageNumber.toString() })
            }}
          >
            {pageNumber === page ? 'Current' : ''} {pageNumber}
          </button>
        ))}
      </div>
    )
  )
}
export default Pagination
