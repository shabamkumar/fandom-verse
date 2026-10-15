import { useNavigate } from 'react-router-dom'
export default function Breadcrumb({ current, parent, parentPath }) {
  const navigate = useNavigate()
  return <div className="breadcrumb page-breadcrumb"><button onClick={() => navigate('/')}>Home</button><span>›</span>{parent && <><button onClick={() => navigate(parentPath || '/')}>{parent}</button><span>›</span></>}<span>{current}</span></div>
}
