import { useState, useEffect } from "react";
import { Stack, Input, Button, Container, List, ListItem } from '@chakra-ui/react'
import db from "./firebase";
import { collection, addDoc, query, getDocs, DocumentData } from "firebase/firestore";


export default function App() {
  const [turma, setTurma] = useState<string>("");
  const [turmas, setTurmas] = useState<DocumentData[]>([]);

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

  useEffect(() => {

    const fetchData = async () => {
      const q = query(collection(db, "turmas"));
      const querySnapshot = await getDocs(q);
      setTurmas(querySnapshot.docs.map(v => v.data()));
    };

    fetchData();

  }, [])

  return (
    <Container>
      <Stack>
        <Input onChange={(e) => setTurma(e.target.value)} placeholder='Nome da turma' size='lg' />
        <Button onClick={register} colorScheme='blue'>Cadastrar</Button>

        <List>
          {turmas.map(data => (<ListItem>{data.turma}</ListItem>))}
        </List>
      </Stack>
    </Container>
  )
}
