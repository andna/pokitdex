import React, {useState} from "react";
import PokemonList from "../components/templates/PokemonList";
import {useRouter} from "next/router";

export default function Home() {


    return (
    <>
      <PokemonList />
    </>
    )
}
