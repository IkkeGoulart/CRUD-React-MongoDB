import { isValidCPF } from "@/app/utils/cpfValidator"
import { isValidEmail } from "@/app/utils/emailValidator"
import { createUser, deleteUser, getUsers, updateUser } from "@/lib/userDB"

export default function validateUser(name, email, cpf) {
    let errors = {}
    if (!name) errors.name = 'Campo obrigatório'

    if (!email) errors.email = 'Campo obrigatório'
    if (email && !isValidEmail(email)) errors.email = 'Email inválido'

    if (!cpf) errors.cpf = 'Campo obrigatório'
    if (cpf && !isValidCPF(cpf)) errors.cpf = 'CPF inválido'

    return errors
}

export async function addUser(name, email, cpf) {
    const errs = validateUser(name, email, cpf)

    if (Object.keys(errs).length > 0) return { success: false, errs }

    const result = await createUser(name, email, cpf)

    if (!result.success) {
        if (result.duplicateFields?.email) errs.email = "Email já cadastrado"
        if (result.duplicateFields?.cpf) errs.cpf = "CPF já cadastrado"

        return { success: false, errs }
    }
    return { success: true, errs }

}

export async function getUser() {
    const users = await getUsers()
    return users
}

export async function deleteUserControl(id) {
    await deleteUser(id)
}

export async function updateUserControl(id, name, email, cpf) {
    const errs = validateUser(name, email, cpf)

    if (Object.keys(errs).length > 0) {
        return { success: false, errs }
    }

    await updateUser(id, name, email, cpf)
    return { success: true }
}