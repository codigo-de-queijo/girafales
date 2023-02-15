import { useState } from "react";
import { Stack, Input, Button, Container } from '@chakra-ui/react'
import db from "./firebase";
import { collection, addDoc } from "firebase/firestore";



export default function App() {
  const [turma, setTurma] = useState<string>("")

  const register = async () => {
    try {
      const docRef = await addDoc(collection(db, "turmas"), {
        turma
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <Container>
      <Stack>
        <Input onChange={(e) => setTurma(e.target.value)} placeholder='Nome da turma' size='lg' />
        <Button onClick={register} colorScheme='blue'>Cadastrar</Button>
      </Stack>
    </Container>
  )
}
