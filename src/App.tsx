import { Stack, Container } from '@chakra-ui/react'
import ListaTurmas from "./turmas/ListaTurmas";
import CadastraTurma from './turmas/CadastraTurma'

export default function App() {

  return (
    <Container>
      <Stack>
        <CadastraTurma/>
        <ListaTurmas />
      </Stack>
    </Container>
  )
}
