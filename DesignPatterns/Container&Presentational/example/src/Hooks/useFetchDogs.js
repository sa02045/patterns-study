import { useEffect, useState } from "react";

export default function useFetchDogs() {
  const [dogs, setDogs] = useState([]);
  useEffect(() => {
    const fetchDogs = async () => {
      const res = await fetch(
        "https://dog.ceo/api/breed/labrador/images/random/6"
      );
      const { message } = await res.json();
      setDogs(message);
    };
    fetchDogs();
  }, []);
  return { dogs };
}
