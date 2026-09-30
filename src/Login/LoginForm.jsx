import { useState } from "react";
import { Link } from "react-router-dom";
function Login({onRegister}) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Please enter email and password");
            return;
        }

        setError("");

        console.log("Login Data:", formData);

        // API call can be added here
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className=" bg-white rounded-2xl shadow-lg p-8 w-100">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Sign into your account
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                                       focus:outline-none focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                                       focus:outline-none focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500 transition"
                        />
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between">

                        <label className="flex items-center gap-2 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300
                                           text-blue-600 focus:ring-blue-500"
                            />

                            Remember me
                        </label>

                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Forgot password?
                        </button>

                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg
                                   font-semibold hover:bg-blue-700
                                   active:scale-[0.98] transition"
                    >
                        Login
                    </button>

                </form>

                {/* Register */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <Link className="text-center text-sm text-blue-500 mt-6" to={'/signup'}>Register</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;
