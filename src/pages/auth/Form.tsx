import { Link } from "react-router-dom";
import type { Props, UserDataType } from "./types";
import { useState, type ChangeEvent, type FormEvent } from "react";

const Form: React.FC<Props> = ({ type, onSubmit }) => {
  const [userData, setUserData] = useState<UserDataType>({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userData);
  };
  return (
    <div className="mx-auto flex min-h-dvh w-full min-w-80 flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      <main className="flex max-w-full flex-auto flex-col">
        <div className="relative mx-auto flex min-h-dvh w-full max-w-10xl items-center justify-center overflow-hidden p-4 lg:p-8">
          <section className="w-full max-w-xl py-6">
            {/* Header */}
            <header className="mb-10 text-center">
              <h1 className="mb-2 inline-flex items-center gap-2 text-2xl font-bold">
                <svg
                  className="hi-mini hi-cube-transparent inline-block size-5 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104z..."
                    clipRule="evenodd"
                  />
                </svg>
                <span>Company</span>
              </h1>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {type === "Login"
                  ? "Welcome, please sign in to your dashboard"
                  : "Create your account to get started"}
              </h2>
            </header>

            {/* Form */}
            <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-xs dark:bg-gray-800 dark:text-gray-100">
              <div className="grow p-5 md:px-16 md:py-12">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {type === "Register" && (
                    <div className="space-y-1">
                      <label
                        htmlFor="username"
                        className="inline-block text-sm font-medium"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="inline-block text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="inline-block text-sm font-medium"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-6 py-3 font-semibold leading-6 text-white hover:border-blue-600 hover:bg-blue-600 focus:ring-3 focus:ring-blue-400/50"
                  >
                    {type === "Login" ? "Sign In" : "Register"}
                  </button>
                </form>
              </div>

              {/* Footer with Link */}
              <div className="grow bg-gray-50 p-5 text-center text-sm md:px-16 dark:bg-gray-700/50">
                {type === "Login" ? (
                  <>
                    Don’t have an account yet?
                    <Link
                      to="/register"
                      className="font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?
                    <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Sign in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Form;
