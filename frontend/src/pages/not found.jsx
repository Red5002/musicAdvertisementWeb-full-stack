export default function NotFound() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center item-center">
        <h1 className="text-center text-7xl font-bold">404:</h1>
        <p className="text-center ">
          {" "}
          This page does not exist 😞 return{" "}
          <a href="/" className="text-blue-900 font-bold">
            home
          </a>
        </p>
      </div>
    </>
  );
}
