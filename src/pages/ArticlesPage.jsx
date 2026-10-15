import { useApp } from '../context/AppContext'
import ListPage from './ListPage'

export default function ArticlesPage() {
  const { DATA } = useApp()
  return <ListPage title="Articles" sub="Long-form stories and fandom news." items={DATA.articles} type="article" />
}
