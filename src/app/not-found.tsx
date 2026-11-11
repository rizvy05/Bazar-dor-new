import Link from "next/link";
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-slate-800 tracking-wider">
          404
        </h1>

        <div className="h-1 w-24 bg-indigo-500 mx-auto my-6 rounded-full" />

        <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-2">
          Page Not Found
        </h2>

        <p className="text-slate-500 mb-8 max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <Link   
          href="/"
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg
                     hover:bg-indigo-700 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;