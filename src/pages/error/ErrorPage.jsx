import React from "react";
import { Link, useRouteError } from "react-router-dom";
import "./ErrorPage.scss";

export default function ErrorPage() {
  const { error, status, statusText } = useRouteError();
  console.log(error, status, statusText);
  return (
    <div className="error">
      <h1 className="error__status">
        {status} {statusText}
      </h1>
      <div>
        <p className="error__message">{error.message}</p>
        <Link to={"/home"} className="error__link">
          Back Home
        </Link>
      </div>
    </div>
  );
}
