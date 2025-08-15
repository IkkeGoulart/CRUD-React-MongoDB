'use client'
import { useState } from "react";
import Input from "./Input";
import { addUser } from "@/controler/userController";

export default function FormInput({ title, button }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')

    const [errors, setErrors] = useState({})

    const handleClickButton = async () => {
        const result = await addUser(name, email, cpf)
        console.log(result)
        if (!result.success) {
            setErrors(result.errs)
            return
        }

        setName('')
        setEmail('')
        setCpf('')
        setErrors({})
    }

    return (
        <div className="container">
            <h2>{title}</h2>
            <div className="input-area">
                <Input label={'Nome'} type={'text'} value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
                <Input label={'Email'} type={'text'} value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email}/>
                <Input label={'CPF'} type={'text'} value={cpf} onChange={(e) => setCpf(e.target.value)} error={errors.cpf}/>
                <button onClick={handleClickButton}>{button}</button>
            </div>
        </div>
    )
}