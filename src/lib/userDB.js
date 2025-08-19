'use server'
import { revalidatePath } from "next/cache"
import connectDB from "./connectDB"
import xss from "xss"
import User from "@/model/user"

//função para inserir no banco
export async function createUser(name, email, cpf) {
    await connectDB()
    const nomeCheck = xss(name)
    const emailCheck = xss(email)
    const cpfCheck = xss(cpf)

    //verifica se o email e o cpf já estão cadastrados no banco
    const duplicate = await User.findOne({
        $or: [
            { email: emailCheck },
            { cpf: cpfCheck }
        ]
    })

    //caso exista dado duplicado, retorna um objeto para o control com o campo duplicado
    if (duplicate) {
        return {
            success: false,
            duplicateFields: {
                email: duplicate.email === emailCheck,
                cpf: duplicate.cpf === cpfCheck

            }
        }
    }
    //adicionando o novo usuário 
    const newUser = new User({
        name: nomeCheck,
        email: emailCheck,
        cpf: cpfCheck
    })
    await newUser.save()
    revalidatePath('/')
    return { success: true }
}

export async function getUsers() {
    await connectDB()
    return await User.find({})
}

export async function deleteUser(id) {
    await connectDB()
    await User.findByIdAndDelete(id)
    revalidatePath('/')
}

export async function updateUser(id, name, email, cpf) {
    await connectDB()
    const nameCheck = xss(name)
    const emailCheck = xss(email)
    const cpfCheck = xss(cpf)
    //verifica se existe email e cpf já cadastrado, excluindo o próprio cadastro
    const duplicate = await User.findOne({
        $and: [
            { _id: { $ne: id } },
            {
                $or: [
                    { email: emailCheck },
                    { cpf: cpfCheck }
                ]
            }
        ]
    })

    if (duplicate) {
        return {
            success: false,
            duplicateFields: {
                email: duplicate.email === emailCheck,
                cpf: duplicate.cpf === cpfCheck
            }
        }
    }
    //atualiza o banco
    await User.findByIdAndUpdate(id,
        { name: nameCheck, email: emailCheck, cpf: cpfCheck },
        { runValidator: true })
    revalidatePath('/')
    return { success: true }
}