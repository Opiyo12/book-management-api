import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Unauthorized</h1>
        <p className="text-slate-600 mb-6">
          You do not have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
        >
          Go back to login
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
