import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white"
      : "bg-slate-800 text-slate-300 hover:bg-slate-700";

  return (
    <nav className="flex justify-between items-center bg-slate-900 rounded-2xl px-8 py-5 shadow-2xl border border-slate-700">

      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl">
          🚀
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">
            JobHunter AI
          </h1>

          <p className="text-slate-400">
            AI Powered Career Assistant
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">

        <Link
          to="/"
          className={`px-5 py-2 rounded-xl transition-all ${isActive("/")}`}
        >
          Dashboard
        </Link>

        <Link
          to="/applications"
          className={`px-5 py-2 rounded-xl transition-all ${isActive("/applications")}`}
        >
          Applications
        </Link>

        <Link
          to="/cover-letter"
          className={`px-5 py-2 rounded-xl transition-all ${isActive("/cover-letter")}`}
        >
          Cover Letter
        </Link>

        <button className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
          🔔
        </button>

        <button className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
          🌙
        </button>

        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
          P
        </div>

      </div>
    </nav>
  );
}

export default Navbar;