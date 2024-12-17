import React, { useEffect } from "react";
import axios from "../../api/axios";

export default function Budget() {
  const getBudget = () => {
    axios
      .get("/disposable-income")
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getBudget();
  }, []);
  return (
    <div>
      <h4>Budget</h4>
    </div>
  );
}
