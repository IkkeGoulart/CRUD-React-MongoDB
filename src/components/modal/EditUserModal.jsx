import { formatCPF } from "@/app/utils/formatCPF";
import Modal from "./Modal";
import { useState } from "react";
import Input from "../Input";

export default function EditUserModal({ user, closeModal, onSave }) {
    const [newName, setNewName] = useState(user.name)
    const [newEmail, setNewEmail] = useState(user.email)
    const [newCpf, setNewCpf] = useState(user.cpf)

    const [errors, setErrors] = useState({})

    const edit = async () => {
        const result = await onSave({ newName, newEmail, newCpf })

        if (result.success) {
            closeModal()
            return
        }

        setErrors(result.errs)
    }
    
    return (
        <Modal isOpen={true} closeModal={closeModal}>
            <div className="modal-info">
                <h2>Edite os dados do usuário</h2>
                <div className="modal-edit-user">
                    <Input label={'Nome'} type={'text'} value={newName} onChange={(e) => setNewName(e.target.value)} error={errors?.name} />
                    <Input label={'Email'} type={'text'} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} error={errors?.email} />
                    <Input label={'CPF'} type={'text'} value={newCpf} onChange={(e) => { const formatted = formatCPF(e.target.value); setNewCpf(formatted) }} error={errors?.cpf} />
                </div>
                <div className="modal-actions">
                    <button className="delete-btn" onClick={edit}>Salvar</button>
                    <button className="delete-btn no-btn" onClick={closeModal}>Cancelar</button>
                </div>
            </div>
        </Modal>
    )
}