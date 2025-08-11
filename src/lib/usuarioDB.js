'use server'
import { revalidatePath } from "next/cache"
import connectDB from "./connectDB"
import xss from "xss"
import User from "@/model/user"

export async function createUser(name, email, cpf) {
    await connectDB()
    const nomeVerificado = xss(name)
    const emailVerificado = xss(email)
    const cpfVerificado = xss(cpf)
    const newUser = new User({
        name: nomeVerificado,
        email: emailVerificado,
        cpf: cpfVerificado
    })
    await newUser.save()
    revalidatePath('/')
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

    await User.findByIdAndUpdate(id, 
        { name: nameCheck, email: emailCheck, cpf }, 
        { runValidator: true })
    revalidatePath('/')
}