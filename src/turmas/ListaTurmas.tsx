import { useEffect, useState } from "react";

import { List, ListItem } from "@chakra-ui/react";
import { collection, DocumentData, getDocs, query } from "firebase/firestore";

import db from "../firebase";

const ListaTurmas = () => {
  const [turmas, setTurmas] = useState<DocumentData[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "turmas"));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(v => v.data());

      setTurmas(data.sort((a, b) => a.turma.localeCompare(b.turma)));
    };
    fetchData();
  }, []);

  return (
    <List>
      {turmas.map((data, idx) => (<ListItem key={idx}>{data.turma}</ListItem>))}
    </List>
  );
};

export default ListaTurmas;