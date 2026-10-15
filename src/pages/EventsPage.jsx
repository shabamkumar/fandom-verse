import { useApp } from '../context/AppContext'
import ListPage from './ListPage'

export default function EventsPage() {
  const { DATA } = useApp()
  return <ListPage title="Events" sub="Past and upcoming fandom-related events." items={DATA.events} type="event" />
}
