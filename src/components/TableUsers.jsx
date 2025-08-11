'use client'

import { useState } from "react"
import Modal from "./Modal"
import FormInput from "./FormInput"
import { deleteUserControl, updateUserControl } from "@/controler/usuarioController"
import Input from "./Input"

export default function TableUsers({ users }) {
    const [modal, setModal] = useState(false)
    const [modalType, setModalType] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)

    const [data, setData] = useState({ name: "", email: "", cpf: "" })
    const [errors, setErrors] = useState({})

    const closeModal = () => {
        setModal(false)
        setModalType(null)
        setSelectedUser(null)
        setData({ name: "", email: "", cpf: "" })
        setErrors({})
    }

    const edit = async () => {
        const result = await updateUserControl(selectedUser._id, data.name, data.email, data.cpf)

        if (result.success) {
            closeModal()
            return
        }

        setErrors(result.errs)
    }

    return (
        <div className="container table-container">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.cpf}</td>
                            <td>
                                <span className="edit" onClick={() => { setModal(true); setModalType('edit'); setSelectedUser(user); setData({ name: user.name, email: user.email, cpf: user.cpf }); }}>{"\u270E"}</span>
                                <span className="delete" onClick={() => { setModal(true); setModalType('delete'); setSelectedUser(user) }}>{"\u2716"}</span>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>

            <Modal isOpen={modal} closeModal={closeModal} children={
                modalType === 'delete' ? (
                    <div className="modal-info">
                        <h2>Deseja deletar este usuário?</h2>
                        <div className="modal-user-info">
                            <span>Nome: {selectedUser.name}</span>
                            <span>Email: {selectedUser.email}</span>
                            <span>Cpf: {selectedUser.cpf}</span>
                        </div>
                        <div className="modal-actions">
                            <button className="delete-btn" onClick={() => {
                                deleteUserControl(selectedUser._id); closeModal()
                            }}>Sim</button>
                            <button className="delete-btn no-btn" onClick={closeModal}>Não</button>
                        </div>
                    </div>
                )
                    : modalType === 'edit' && data ?(
                    <div className="modal-info">
                        <h2>Edite os dados do usuário</h2>
                        <div className="modal-edit-user">
                            <Input label={'Nome'} type={'text'} value={data.name || ''} onChange={(e) => setData({ ...data, name: e.target.value })} error={errors.name} />
                            <Input label={'Email'} type={'text'} value={data.email || ''} onChange={(e) => setData({ ...data, email: e.target.value })} error={errors.email} />
                            <Input label={'CPF'} type={'number'} value={data.cpf || ''} onChange={(e) => setData({ ...data, cpf: e.target.value })} error={errors.cpf} />
                        </div>
                        <div className="modal-actions">
                            <button className="delete-btn" onClick={edit}>Salvar</button>
                            <button className="delete-btn no-btn" onClick={closeModal}>Cancelar</button>
                        </div>
                    </div>)
                    :null
            } />
        </div>
    )
}