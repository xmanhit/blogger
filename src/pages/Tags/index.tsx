import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { RootState } from '../../store'
import { setArticlesRequest, setTagsRequest } from '../../store/slices/article.slice'
import CardArticle from '../../components/ui/CardArticle'
import { getPagination } from '../../store/selectors'
import { ITagsProps } from '../../models'

const Tags: React.FC<ITagsProps> = ({
  setTagsRequest,
  setArticlesRequest,
  isLoadingTags,
  isLoading,
  tagList,
  articles,
  total,
  limit,
  pagination,
}) => {
  const { tag } = useParams()
  let [searchParams, setSearchParams] = useSearchParams()
  const page: number = Number(searchParams.get('page')) || 1

  useEffect(() => {
    if (tagList.length === 0) {
      setTagsRequest()
    }
  }, [])

  useEffect(() => {
    console.log(tagList)

    console.log(page)
    const offset = (page - 1) * limit
    setArticlesRequest({ tag, limit, offset })
  }, [tag, page])

  return (
    <div>
      <h1>Tags</h1>
      {isLoadingTags && <div>Tags Loading...</div>}
      <div>
        {tagList?.map((tag: string) => (
          <Link key={tag} to={`/tags/${tag}`}>
            #{tag}
          </Link>
        ))}
      </div>

      {articles.map((article: any) => (
        <CardArticle key={article.slug} article={article} />
      ))}

      {isLoading && <div>Articles Loading...</div>}
      {articles.length <= 0 && !isLoading && <div>No articles yet</div>}

      {total > limit && (
        <div>
          {pagination.map((pageNumber: number) => (
            <button
              type='button'
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
      )}
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    tagList: state.article.tagList,
    isLoading: state.article.status.articles === 'loading',
    isLoadingTags: state.article.status.tagList === 'loading',
    articles: state.article.articles,
    total: state.article.total,
    limit: state.article.limit,
    pagination: getPagination(state),
  }),
  { setTagsRequest, setArticlesRequest }
)(Tags)
