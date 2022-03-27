import { useEffect, useState } from "react";
import { api } from "../api";

type Props = {
  id: number;
};

const TestApiView = ({ id }: Props) => {
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    const fetchData = () => {
      api.get(`/character/${id}`).then(({ data }) => setCharacter(data));
    };
    fetchData();
  }, []);

  return (
    <div>
      <p>Id: {character?.id}</p>
      <p>Nazwa: {character?.name}</p>
      <p>Płeć: {character?.gender}</p>
      <img src={character?.image} />
    </div>
  );
};

export default TestApiView;
