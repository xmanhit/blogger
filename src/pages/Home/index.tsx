import { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import { setArticleFollowingRequest, setArticlesRequest, setTagsRequest } from '../../store/slices/article.slice'
import { Link, LoaderFunction, NavLink, redirect, useLoaderData, useSearchParams } from 'react-router-dom'
import { getPagination } from '../../store/selectors'
import { IArticle, IHomeProps } from '../../models'
import CardArticle from '../../components/ui/CardArticle'
import { isAuthenticated } from '../../services'

export const homeLoader: LoaderFunction = ({ request }) => {
  const url: URL = new URL(request.url)
  const isFollowing: boolean = url.pathname === '/following'
  if (!isAuthenticated() && isFollowing) {
    return redirect('/login')
  }
  return { isFollowing }
}

const Home: React.FC<IHomeProps> = ({
  isAuthenticated,
  setTagsRequest,
  setArticlesRequest,
  setArticleFollowingRequest,
  isLoadingTags,
  isLoading,
  tagList,
  articles,
  limit,
  total,
  pagination,
}): JSX.Element => {
  let [searchParams, setSearchParams] = useSearchParams()
  const page: number = Number(searchParams.get('page')) || 1

  let { isFollowing } = useLoaderData() as { isFollowing: boolean }
  useEffect(() => {
    if (tagList.length === 0) {
      setTagsRequest()
    }
  }, [])

  useEffect(() => {
    const offset = (page - 1) * limit

    if (isAuthenticated && isFollowing) {
      setArticleFollowingRequest({
        limit,
        offset,
      })
    } else {
      setArticlesRequest({
        limit,
        offset,
      })
    }
  }, [isAuthenticated, page, isFollowing])

  return (
    <div>
      {isLoadingTags && <div>Tags Loading...</div>}
      <div>
        {tagList?.map((tag: string) => (
          <Link key={tag} to={`/tags/${tag}`}>
            #{tag}
          </Link>
        ))}
      </div>
      {isAuthenticated && (
        <div>
          <NavLink to='/'>Latest</NavLink>
          <NavLink to='/following'>Following</NavLink>
        </div>
      )}
      {isLoading && <div>Articles Loading...</div>}
      {articles.length <= 0 && !isLoading && <div>No articles yet</div>}
      {articles?.map((article: IArticle) => (
        <CardArticle key={article.slug} article={article} />
      ))}

      {total > limit && (
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
      )}
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: isAuthenticated(),
    isLoading: state.article.status.articles === 'loading',
    isLoadingTags: state.article.status.tagList === 'loading',
    tagList: state.article.tagList,
    articles: state.article.articles,
    limit: state.article.limit,
    total: state.article.total,
    pagination: getPagination(state),
  }),
  {
    setTagsRequest,
    setArticlesRequest,
    setArticleFollowingRequest,
  }
)(Home)
