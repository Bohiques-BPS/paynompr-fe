import React from "react";
import Axios from "axios";

type Props = {};
export function getTodo() {
  Axios.get("https://jsonplaceholder.typicode.com/todos") // Using a post request, specifying the user
    .then((response) => {
      // Data retrieval and processing
      console.log(response.data);
    })
    .catch((error) => {
      // If the query fails, an error will be displayed on the terminal.
      console.error(error);
    });
}
