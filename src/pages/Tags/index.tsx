import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { RootState } from '../../store'
import { setArticlesRequest, setTagsRequest } from '../../store/slices/article.slice'
import { CardArticle, Pagination } from '../../components/ui'
import { IArticle, ITagsProps } from '../../models'
import TagList from '../../components/ui/TagList'
import styles from '../../styles/Global.module.css'

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
    const offset = (page - 1) * limit
    setArticlesRequest({ tag, limit, offset })
  }, [tag, page])

  return (
    <section>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{tag}</h1>
      </div>
      {isLoadingTags && <div>Tags Loading...</div>}
      <TagList tagList={tagList} tagActive={tag} />

      <div className={styles.articleWrapper}>
        {isLoading && <div>Articles Loading...</div>}
        {articles.length <= 0 && !isLoading && <div>No articles yet</div>}
        {articles?.map((article: IArticle) => (
          <CardArticle key={article.slug} article={article} />
        ))}
      </div>

      {isLoading && <div>Articles Loading...</div>}
      {articles.length <= 0 && !isLoading && <div>No articles yet</div>}

      <Pagination total={total} limit={limit} page={page} setSearchParams={setSearchParams} />
    </section>
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
  }),
  { setTagsRequest, setArticlesRequest }
)(Tags)
