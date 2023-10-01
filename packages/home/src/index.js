import "./styles/main.scss";
import logo from "./assets/logo.png";
import axios from "axios";

const logoElement = document.getElementById("logo");
logoElement.src = logo;

const getJoke = () => {
  axios.get("https://api.chucknorris.io/jokes/random").then((response) => {
    const joke = response.data.value;
    const jokeElement = document.getElementById("joke");
    jokeElement.innerText = joke;
  });
};

const jokeButton = document.getElementById("jokeBtn");
jokeButton.addEventListener("click", getJoke);
