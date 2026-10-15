import { useApp } from '../context/AppContext'

export default function Modal() {
  const { modal, closeModal } = useApp()
  const open = !!modal

  return (
    <div className={`modal${open ? ' open' : ''}`} onClick={(e) => e.target === e.currentTarget && closeModal()}>
      <div className="modal-card">
        <button className="modal-close" onClick={closeModal}>
          ×
        </button>
        <div id="modalBody">{modal}</div>
      </div>
    </div>
  )
}
