import "./modal.css"
export default function Modal({ isOpen, children, closeModal}) {
    if (isOpen) {
        return (
            <div className="background-modal">
                <div className="modal">
                    <span className="exit-btn" onClick={closeModal}>&#9679;</span>
                    {children}
                </div>
            </div>
        )
    }

    return null
}