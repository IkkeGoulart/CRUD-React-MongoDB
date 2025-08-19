'use client'

import { useState } from "react"
import { deleteUserControl, updateUserControl } from "@/controler/userController"
import DeleteUserModal from "./modal/DeleteUserModal"
import EditUserModal from "./modal/EditUserModal"

export default function TableUsers({ users }) {
    const [modalType, setModalType] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)

    const closeModal = () => {
        setModalType(null)
        setSelectedUser(null)
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
                                <span className="edit" onClick={() => {setModalType('edit'); setSelectedUser(user);}}>{"\u270E"}</span>
                                <span className="delete" onClick={() => { setModalType('delete'); setSelectedUser(user) }}>{"\u2716"}</span>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>

            {modalType === 'delete' && (
                <DeleteUserModal
                    user={selectedUser}
                    closeModal={closeModal}
                    onConfirm={() => { deleteUserControl(selectedUser._id); closeModal() }} />
            )}

            {modalType === 'edit' && (
                <EditUserModal
                    user={selectedUser}
                    closeModal={closeModal}
                    onSave={(data) => updateUserControl(selectedUser._id, data.newName, data.newEmail, data.newCpf)}
                />
            )}
        </div>
    )
}