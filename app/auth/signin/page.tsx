import React from "react";

const page = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-center text-2xl font-bold">Login</h2>
            <form action="/login" method="post">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                />
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="form-checkbox text-primary-500"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm text-gray-600 hover:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-500 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-500"
              >
                Login
              </button>
              <p className="mt-8 text-xs text-center text-gray-400">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-primary-500 hover:text-primary-700"
                >
                  Register now
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
