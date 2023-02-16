import { useState, useEffect } from "react";
import { Stack, Input, Button, Container, List, ListItem } from '@chakra-ui/react'
import db from "./firebase";
import { collection, addDoc, query, getDocs, DocumentData } from "firebase/firestore";


export default function App() {
  const [turma, setTurma] = useState<string>("");
  const [turmas, setTurmas] = useState<DocumentData[]>([]);
  const [stateUpdate, setstateUpdate] = useState("")

  const register = async () => {
    try {
      const docRef = await addDoc(collection(db, "turmas"), {
        turma
      })
      setstateUpdate(docRef.id)
      setTurma("")
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "turmas"));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(v => v.data());

      setTurmas(data.sort((a, b) => a.turma.localeCompare(b.turma)));
    };
    fetchData();
  }, [stateUpdate])

  return (
    <Container>
      <Stack>
        <Input value={turma} onChange={(e) => setTurma(e.target.value)} placeholder='Nome da turma' size='lg' />
        <Button onClick={register} colorScheme='blue'>Cadastrar</Button>

        <List>
          {turmas.map(data => (<ListItem>{data.turma}</ListItem>))}
        </List>
      </Stack>
    </Container>
  )
}
