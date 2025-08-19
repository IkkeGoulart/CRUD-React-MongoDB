import Modal from "./Modal";

export default function DeleteUserModal({ user, closeModal, onConfirm }) {
    return (
        <Modal isOpen={true} closeModal={closeModal}>
            <div className="modal-info">
                <h2>Deseja deletar este usuário?</h2>
                <div className="modal-user-info">
                    <span>Nome: {user.name}</span>
                    <span>Email: {user.email}</span>
                    <span>Cpf: {user.cpf}</span>
                </div>
                <div className="modal-actions">
                    <button className="delete-btn" onClick={onConfirm}>Sim</button>
                    <button className="delete-btn no-btn" onClick={closeModal}>Não</button>
                </div>
            </div>
        </Modal>
    )
}