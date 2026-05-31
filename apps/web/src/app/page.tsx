import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      <div className="w-full max-w-lg space-y-8 text-center">
        <div className="mt-8 flex justify-center">
          <div className="animate-bounce-slow flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-[#00bdff] shadow-lg shadow-purple-200">
            <span className="text-4xl font-bold text-white">H</span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="bg-gradient-to-r from-blue-500 to-[#00bdff] bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
            Welcome to Hunqz
          </h1>
          <p className="text-lg leading-relaxed text-gray-500">
            Your space to connect, discover, and grow.
            <br />
            Find amazing people and build meaningful relationships.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="rounded-2xl border border-purple-50 bg-white p-4 shadow-md shadow-purple-100 transition-shadow duration-300 hover:shadow-lg">
            <span className="text-3xl">🔍</span>
            <p className="mt-2 text-sm font-medium text-gray-600">Discover</p>
          </div>
          <div className="rounded-2xl border border-purple-50 bg-white p-4 shadow-md shadow-purple-100 transition-shadow duration-300 hover:shadow-lg">
            <span className="text-3xl">💬</span>
            <p className="mt-2 text-sm font-medium text-gray-600">Connect</p>
          </div>
          <div className="rounded-2xl border border-purple-50 bg-white p-4 shadow-md shadow-purple-100 transition-shadow duration-300 hover:shadow-lg">
            <span className="text-3xl">🌟</span>
            <p className="mt-2 text-sm font-medium text-gray-600">Grow</p>
          </div>
        </div>

        <Link
          href="/profile"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-[#00bdff] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <span>Explore Profiles</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        <p className="text-sm text-gray-400">Join thousands of users already on Hunqz ✨</p>
      </div>
    </div>
  );
}
