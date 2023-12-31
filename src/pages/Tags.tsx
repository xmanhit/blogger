import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { RootState } from '../store'
import { setArticlesRequest, setTagsRequest } from '../store/slices/article.slice'
import { CardArticle, Pagination } from '../components/ui'
import { IArticle, ITagsProps } from '../models'
import TagList from '../components/ui/TagList'
import ArticlesLoading from '../components/ui/ArticlesLoading'
import NotFound from './NotFound'
import styles from '../styles/Tags.module.css'

const Tags: React.FC<ITagsProps> = ({
  setTagsRequest,
  setArticlesRequest,
  isTagsLoading,
  isLoading,
  tagList,
  articles,
  total,
  limit,
}) => {
  const { tag } = useParams()
  let [searchParams, setSearchParams] = useSearchParams()
  const page: number = Number(searchParams.get('page')) || 1
  const maxPage: number = Math.ceil(total / limit)

  useEffect(() => {
    if (tagList.length === 0) {
      setTagsRequest()
    }
    document.title = `Blogger | ${tag}`
  }, [])

  useEffect(() => {
    const offset = (page - 1) * limit
    setArticlesRequest({ tag, limit, offset })
  }, [tag, page])

  if ((!isLoading && page > maxPage && maxPage > limit) || (!isLoading && articles.length <= 0)) {
    return <NotFound />
  }

  return (
    <section>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{tag}</h1>
      </div>
      <TagList tagList={tagList} tagActive={tag} isTagsLoading={isTagsLoading} />

      <div className={styles.articleWrapper}>
        {isLoading && <ArticlesLoading />}
        {articles?.map((article: IArticle) => (
          <CardArticle key={article.slug} article={article} />
        ))}
      </div>

      <Pagination total={total} limit={limit} page={page} setSearchParams={setSearchParams} />
    </section>
  )
}

export default connect(
  (state: RootState) => ({
    tagList: state.article.tagList,
    isLoading: state.article.status.articles === 'loading',
    isTagsLoading: state.article.status.tagList === 'loading',
    articles: state.article.articles,
    total: state.article.total,
    limit: state.article.limit,
  }),
  { setTagsRequest, setArticlesRequest }
)(Tags)
