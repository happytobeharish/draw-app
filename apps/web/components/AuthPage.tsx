"use client";

interface AuthPageProps {
  isSignin: boolean;
}

export function AuthPage({ isSignin }: AuthPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          {isSignin ? "Sign In to Your Account" : "Create a New Account"}
        </h2>

        <form className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {isSignin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Link toggle */}
        <p className="mt-6 text-sm text-center text-gray-600">
          {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
          <a
            href={isSignin ? "/signup" : "/signin"}
            className="text-indigo-600 font-medium hover:underline"
          >
            {isSignin ? "Sign Up" : "Sign In"}
          </a>
        </p>
      </div>
    </div>
  );
}
