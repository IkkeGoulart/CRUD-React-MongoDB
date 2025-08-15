import FormInput from "@/components/FormInput";
import TableUsers from "@/components/TableUsers";
import { getUsers } from "@/lib/userDB";

export default async function Home() {
  const users = await getUsers()

  return (
    <div className="main">
      <FormInput title={'Usuários'} button={'Adicionar'}/>
      <TableUsers users={JSON.parse(JSON.stringify(users))}/>
    </div>
  )
}
