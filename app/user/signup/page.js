"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import SignupLayout from "../SignupLayout";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/router";

const page = () => {
	// const route = useRouter();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data);
		const rawResponse = await fetch("/api/users/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		console.log(`${rawResponse}`);
		const content = await rawResponse.json();

		if (content.errors) {
			// if (content.errors.username === "") {
			setError("email", {
				message: content.errors.email,
			});
			// } else {
			// setError("username", {
			// message: content.errors.username,
			// });
			// }
		} else if (content.newUserAndToken) {
			// localStorage.setItem("token", content.newUserAndToken.token);
			// localStorage.setItem("username", content.newUserAndToken.username);
			// document.cookie = `token=${content.newUserAndToken.token}; path=/`;
			// route.refresh();
			// route.push("/api/auth/signin");
			window.location.href = "/api/auth/signin";
		}

		console.log(content);
	};

	return (
		<div>
			<section className="bg-gray-50 dark:bg-gray-900 mt-0 pt-0">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 pt-0 mt-0">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Create an Account
							</h1>
							<form
								className="space-y-4 md:space-y-6"
								onSubmit={handleSubmit(onSubmit)}
							>

								{/* for full name */}
								<div>
									<label
										for="name"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Enter full name
									</label>
									<input
										type="text"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="John Doe"
										{...register("name", {
											required: {
												value: true,
												message: "Name is required",
											},
										})}
									/>
								</div>

								{/* for username */}
								{/* <div>
									<label
										for="username"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Enter new username
									</label>
									<input
										type="text"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="johndoe"
										{...register("username", {
											required: {
												value: true,
												message: "Username is required",
											},
											minLength: {
												value: 8,
												message: "Username must be atleast of 8 characters",
											},
											maxLength: {
												value: 15,
												message: "Username must be atmost of 15 characters",
											},
										})}
									/>
									{errors.username && (
										<p className="text-red-600 text-sm mt-1">
											{errors.username.message}
										</p>
									)}
									{setError.username && (
										<p className="text-red-600 text-sm mt-1">
											{setError.username.message}
										</p>
									)}
								</div> */}

								{/* for email */}
								<div>
									<label
										for="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Your email
									</label>
									<input
										type="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@gmail.com"
										{...register("email", {
											required: {
												value: true,
												message: "Email is required",
											},
											pattern: {
												value:
													/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
												message: "Please enter a valid email",
											},
										})}
									/>
									{errors.email && (
										<p className="text-red-600 text-sm mt-1">
											{errors.email.message}
										</p>
									)}
									{setError.email && (
										<p className="text-red-600 text-sm mt-1">
											{setError.email.message}
										</p>
									)}
								</div>

								{/* for password */}
								<div>
									<label
										for="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Password
									</label>
									<input
										type="password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										{...register("password", {
											required: {
												value: true,
												message: "Password is required",
											},
											minLength: {
												value: 10,
												message: "Password must be atleast of 10 characters",
											},
											maxLength: {
												value: 20,
												message: "Password must be atmost of 20 characters",
											},
										})}
									/>
									{errors.password && (
										<p className="text-red-600 text-sm mt-1">
											{errors.password.message}
										</p>
									)}
								</div>


								<button
									type="submit"
									className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${isSubmitting ? "disabled bg-gray-600 transition-all" : ""
										}`}
								>
									Create an account
								</button>

								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account?{" "}
									<Link
										href="/api/auth/signin"
										className="font-medium text-primary-600 hover:underline dark:text-primary-500"
									>
										Login here
									</Link>
								</p>

								{/* or wali line */}
								<div
									class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
									<p
										class="mx-4 mb-0 text-center font-semibold dark:text-white">
										Or
									</p>
								</div>

								{/* github login button */}
								<a
									className="bg-gray-800 text-gray-300 mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"

									href="/api/auth/signin/github"
									role="button"
								>
									<span
										className="bg-gray-800 text-gray-300 me-2 fill-white [&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
										<svg className="h-10 w-10 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
									</span>
									<p>Continue with Github</p>
								</a>

								{/* google login button */}
								<a
									className="bg-cyan-50 text-zinc-900 mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"

									href="/api/auth/signin/google"
									role="button"
								>
									<span
										className="me-2 fill-white [&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
										<svg className="h-10 w-10 text-red-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M17.788 5.108A9 9 0 1021 12h-8" /></svg>
									</span>
									<p>Continue with Google</p>
								</a>

							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default page;
