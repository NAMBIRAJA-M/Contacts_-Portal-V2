export default function WelcomeCard({ user }: any) {
  return (
    <div className="flex items-center justify-between w-[98%] min-h-[120px] ml-6 mt-0 bg-gradient-to-r from-white to-gray-100 border border-gray-200 rounded-xl p-6 pt-2 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 dark:from-slate-800 dark:to-slate-900 dark:border-slate-700">
      {/* Text Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-100">
          Welcome Back, {user.name} 🙋‍♂️
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed dark:text-slate-300">
          Manage your work, track your progress, and access essential
          services—all in one place.
        </p>
      </div>

      {/* Avatar / Image Section */}
      <div className="hidden sm:flex">
        <img
          src={user.profile}
          alt="Avatar"
          className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover dark:border-slate-600"
        />
      </div>
    </div>
  );
}
