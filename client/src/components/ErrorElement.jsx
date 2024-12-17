import { useRouteError } from "react-router-dom";

export default function ErrorElement() {
  const error = useRouteError();
  console.log(error);
  return <h4>Something went wrong... Try again later.</h4>;
}
