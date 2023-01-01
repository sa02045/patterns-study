import React, { useEffect, useState } from "react";
import Presentational from "./Presentational";
export default function Container() {
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
  return <Presentational dogs={dogs} />;
}
