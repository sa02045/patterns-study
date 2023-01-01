import React from "react";
import useFetchDogs from "./Hooks/useFetchDogs";
import Presentational from "./Presentational";

export default function Container2() {
  const { dogs } = useFetchDogs();
  return <Presentational dogs={dogs} />;
}
