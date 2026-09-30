
import { useState } from "react";
import { Link } from "react-router-dom";
function Register({ onLogin }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // Required field validation
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("All fields are required");
            return;
        }

        // Password validation
        if (formData.password.length < 6) {
            setError("Password must contain at least 6 characters");
            return;
        }

        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            // Check whether email already exists
            const response = await fetch(
                `http://localhost:3000/users?email=${formData.email}`
            );

            const users = await response.json();

            if (users.length > 0) {
                setError("Email already registered");
                return;
            }

            // Create user
            const registerResponse = await fetch(
                "http://localhost:3000/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                    }),
                }
            );

            if (!registerResponse.ok) {
                throw new Error("Registration failed");
            }

            setSuccess("Registration successful! Please login.");

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full bg-white rounded-2xl shadow-lg p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Register your account
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200
                                        text-red-600 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Success */}
                    {success && (
                        <div className="bg-green-50 border border-green-200
                                        text-green-600 px-4 py-3 rounded-lg">
                            {success}
                        </div>
                    )}

                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium
                                       text-gray-700 mb-2"
                        >
                            Full Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 border border-gray-300
                                       rounded-lg focus:outline-none
                                       focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium
                                       text-gray-700 mb-2"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-gray-300
                                       rounded-lg focus:outline-none
                                       focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium
                                       text-gray-700 mb-2"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="w-full px-4 py-3 border border-gray-300
                                       rounded-lg focus:outline-none
                                       focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium
                                       text-gray-700 mb-2"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            className="w-full px-4 py-3 border border-gray-300
                                       rounded-lg focus:outline-none
                                       focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500"
                        />
                    </div>

                    {/* Register */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3
                                   rounded-lg font-semibold
                                   hover:bg-blue-700
                                   active:scale-[0.98]
                                   transition"
                    >
                        Register
                    </button>

                </form>

                {/* Login */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}

                    <Link className="text-center text-sm text-green-500 mt-6" to={'/'}>Login</Link>
                </p>

            </div>
        </div>
    );
}

export default Register;
