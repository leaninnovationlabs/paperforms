import { useRouteError } from "react-router-dom";

const Error = () => {
    let error = useRouteError()
    console.error(error);
    // Uncaught ReferenceError: path is not defined
    return <div>{JSON.stringify(error)}</div>;
  }

  export default Error