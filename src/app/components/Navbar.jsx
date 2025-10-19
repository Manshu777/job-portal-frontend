"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import {
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { baseurl } from "./common";
import { FaCoins } from "react-icons/fa6";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loginType, setLoginType] = useState("");
  const [modalMode, setModalMode] = useState("login"); // login, forgotPassword, verifyOtp, resetPassword
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [error, setError] = useState("");
  const [useOtpLogin, setUseOtpLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const [usercred, setusercred] = useState();
  const [showCredits, setShowCredits] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const employerToken = localStorage.getItem("employerToken");
      const candidateToken = localStorage.getItem("port_tok");

      if (!employerToken && !candidateToken) {
        setIsLoggedIn(false);
        setUserType(null);
        if (pathname !== "/") {
          // router.push("/");
        }
        return;
      }

      try {
        let res;
        if (employerToken) {
          res = await axios.get(`${baseurl}/employer/profile`, {
            headers: {
              Authorization: `Bearer ${employerToken}`,
            },
          });
          setUserType("Employer");
          setusercred(res?.data?.data || null);
        } else if (candidateToken) {
          res = await axios.get(`${baseurl}/candidateprofile`, {
            headers: {
              Authorization: `Bearer ${candidateToken}`,
            },
          });
          setUserType("Candidate");
        }

        if (res.data && (res.data.success || res.data.doneprofile === 1)) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUserType(null);
          // localStorage.removeItem("employerToken");
          // localStorage.removeItem("port_tok");
          if (pathname !== "/") {
            // router.push("/");
          }
        }
      } catch (err) {
        console.error("Not logged in or invalid token", err);
        setIsLoggedIn(false);
        setUserType(null);
        // localStorage.removeItem("employerToken");
        // localStorage.removeItem("port_tok");
        if (pathname !== "/") {
          // router.push("/");
        }
      }
    };

    checkLogin();
  }, [router, pathname]);

  const handleOtp = async () => {
    setLoading(true);
    setError("");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      const endpoint =
        loginType === "Employer" ? "employer/send-otp" : "send-otp";
      const payload =
        loginType === "Employer" ? { contact_email: email } : { email };
      localStorage.setItem("emp-email", email);
      const response = await axios.post(`${baseurl}/${endpoint}`, payload);
      console.log(response.data);
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please try again.");
    }
    setLoading(false);
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      setLoading(false);
      return;
    }

    try {
      const endpoint =
        loginType === "Employer" ? "employer/verify-otp" : "verify-otp";
      const payload =
        loginType === "Employer"
          ? { contact_email: email, otp }
          : { email, otp };
      const response = await axios.post(`${baseurl}/${endpoint}`, payload);

      console.log("response", response);
      if (response.data.success) {
        if (loginType === "Employer") {
          const sessionToken = response.data.session_token;
          if (sessionToken) {
            localStorage.setItem("employerToken", sessionToken);
            setOtpSent(false);
            setShowModal(false);
            window.location.href = "/employer/dashboard";
          } else {
            setOtpSent(false);
            setShowModal(false);
            router.push("/employer/onboarding");
          }
        } else {
          const sessionToken = response.data.token;
          console.log("Session Token:", response.data);
          localStorage.setItem("port_tok", sessionToken);
          setShowModal(false);
          setOtpSent(false);
          const redirectPath =
            response.data.user.doneprofile === 1
              ? "/candidate/dashboard"
              : "/candidate/candidate-login";
          router.push(redirectPath);
        }
      } else {
        if (
          loginType === "Employer" &&
          response.data.message === "No employer found with this email"
        ) {
          setOtpSent(false);
          setShowModal(false);
          router.push("/employer/onboarding");
        } else {
          setError("Invalid OTP. Please try again.");
        }
      }
    } catch (error) {
      setOtpSent(false);
      setShowModal(false);
      router.push("/employer/onboarding");
      setError("Failed to verify OTP. Please try again.");
    }
    setLoading(false);
  };

  const handleEmployerLogin = async () => {
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseurl}/employer/login`, {
        contact_email: email,
        password,
      });

      if (response.data.success) {
        const token = response.data.session_token;
        localStorage.setItem("employerToken", token);
        setShowModal(false);
        window.location.href = "/employer/dashboard";
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login. Please check your credentials.");
    }
    setLoading(false);
  };

  const handleCandidateLogin = async () => {
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseurl}/candidate/login`, {
        email,
        password,
      });
      const responseData = await response.data;
      console.log(responseData.token);
      if (responseData.success) {
        localStorage.setItem("port_tok", responseData?.token);
        setShowModal(false);
        setLoginType("");
        router.push("/candidate/candidate-login");
      } else {
        setError(
          responseData.message || "Invalid credentials. Please try again."
        );
      }
    } catch (error) {
      console.error("Candidate login error:", error);
      setError("Failed to login. Please check your credentials.");
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setError("");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      const endpoint =
        loginType === "Employer" ? "employer/forgot-password" : "forgot-password";
      const payload =
        loginType === "Employer" ? { contact_email: email } : { email };
      const response = await axios.post(`${baseurl}/${endpoint}`, payload);
      if (response.data.success) {
        setOtpSent(true);
        setModalMode("verifyOtp");
      } else {
        setError(response.data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending forgot password OTP:", error);
      setError("Failed to send OTP. Please try again.");
    }
    setLoading(false);
  };

  const handleVerifyResetOtp = async () => {
    setLoading(true);
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      setLoading(false);
      return;
    }

    try {
      const endpoint =
        loginType === "Employer"
          ? "employer/verify-password-reset-otp"
          : "verify-password-reset-otp";
      const payload =
        loginType === "Employer"
          ? { contact_email: email, otp }
          : { email, otp };
      const response = await axios.post(`${baseurl}/${endpoint}`, payload);
      if (response.data.success) {
        setResetToken(response.data.reset_token);
        setModalMode("resetPassword");
      } else {
        setError(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Failed to verify OTP. Please try again.");
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setError("");

    if (!password || !confirmPassword) {
      setError("Both password and confirm password are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      const endpoint =
        loginType === "Employer" ? "employer/reset-password" : "reset-password";
      const payload =
        loginType === "Employer"
          ? { contact_email: email, reset_token: resetToken, password, password_confirmation: confirmPassword }
          : { email, reset_token: resetToken, password, password_confirmation: confirmPassword };
      const response = await axios.post(`${baseurl}/${endpoint}`, payload);
      if (response.data.success) {
        setShowModal(false);
        setModalMode("login");
        setOtpSent(false);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setOtp("");
        setResetToken("");
        setError("");
        alert("Password reset successfully. Please login with your new password.");
      } else {
        setError(response.data.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Failed to reset password. Please try again.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("employerToken");
    localStorage.removeItem("port_tok");
    setIsLoggedIn(false);
    setUserType(null);
    router.push("/");
  };

  const handleCreditsClick = () => {
    setShowCredits(!showCredits);
    setTimeout(() => setShowCredits(false), 3000);
  };

  const handleCloseTooltip = () => {
    setShowCredits(false);
  };

  const resetModalState = () => {
    setShowModal(false);
    setOtpSent(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    setResetToken("");
    setError("");
    setUseOtpLogin(false);
    setModalMode("login");
  };

  return (
    <>
      <nav className="bg-white p-4 shadow-md sticky top-0 z-50 px-[8%]">
        <div className="mx-auto flex justify-between items-center">
          <div className="text-black text-2xl font-bold">
            <Link
              className={`flex items-center ${isLoggedIn ? "" : " "}`}
              href={isLoggedIn ? (userType === "Employer" ? "/employer/dashboard" : "/candidate/dashboard") : "/"}
            >
              <img className="h-[80px]" src="/img/logo-rm-boat.png" />
              <span className="text-2xl ml-2 uppercase leading-1">
                Hiring Boat
              </span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            {!isLoggedIn ? (
              <>
                <Link href="/" className="text-black hover:text-gray-600">
                  Home
                </Link>
                <Link href="/about" className="text-black hover:text-gray-600">
                  About
                </Link>
                <Link href="/job" className="text-black hover:text-gray-600">
                  Jobs
                </Link>
                <Link href="/contact" className="text-black hover:text-gray-600">
                  Contact
                </Link>
                <button
                  onClick={() => {
                    setLoginType("Employer");
                    setShowModal(true);
                  }}
                  className="text-black font-semibold border-2 border-[#02325a] px-4 py-2 rounded-lg hover:bg-green-50 transition"
                >
                  Employer Login
                </button>
                <button
                  onClick={() => {
                    setLoginType("Candidate");
                    setShowModal(true);
                  }}
                  className="text-white font-semibold bg-[#02325a] px-4 py-2 rounded-lg hover:bg-[#00223f] transition"
                >
                  Candidate Login
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {userType === "Candidate" && (
                  <>
                    <Link href="/job" className="text-black hover:text-gray-600">
                      All Jobs
                    </Link>
                    <Link href="/resume-builder" className="text-black hover:text-gray-600">
                      Resume Builder
                    </Link>
                  </>
                )}
                {userType === "Employer" && (
                  <div className="relative">
                    <button
                      onClick={handleCreditsClick}
                      className="flex items-center gap-2 text-blue-950 font-semibold bg-slate-200 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <FaCoins />
                      <span>Available Credits</span>
                    </button>
                    {showCredits && (
                      <div className="absolute right-0 mt-3 w-72 bg-gradient-to-br from-white via-gray-50 to-gray-100 text-black rounded-2xl shadow-2xl p-6 border border-gray-200 animate-[fadeIn_0.3s_ease-in-out]">
                        <div className="flex items-center gap-3 mb-4">
                          <FaCoins className="text-4xl text-yellow-500" />
                          <h3 className="text-xl font-bold text-gray-800">
                            Your Credits
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-md transition">
                            <span className="text-2xl font-bold text-green-600">
                              {usercred?.job_post_credits ?? 0}
                            </span>
                            <span className="text-sm font-medium text-gray-600">
                              Job Posts
                            </span>
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-md transition">
                            <span className="text-2xl font-bold text-blue-600">
                              {usercred?.database_credits ?? 0}
                            </span>
                            <span className="text-sm font-medium text-gray-600">
                              Database
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <Link
                  href={userType === "Employer" ? "/employer/profile" : "/candidate/dashboard"}
                  className="flex items-center"
                >
                  <FaUserCircle className="text-2xl text-[#00223f] hover:text-[#004080] transition-colors duration-200" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4">
            <Link href="/" className="text-black hover:text-gray-600">
              Home
            </Link>
            <Link href="/about" className="text-black hover:text-gray-600">
              About
            </Link>
            <Link href="/job" className="text-black hover:text-gray-600">
              Jobs
            </Link>
            <Link href="/contact" className="text-black hover:text-gray-600">
              Contact
            </Link>
            {isLoggedIn && userType === "Candidate" && (
              <>
                <Link href="/jobs" className="text-black hover:text-gray-600">
                  All Jobs
                </Link>
                <Link href="/resume-builder" className="text-black hover:text-gray-600">
                  Resume Builder
                </Link>
              </>
            )}
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    setLoginType("Employer");
                    setShowModal(true);
                  }}
                  className="text-black font-semibold border-2 border-[#02325a] px-4 py-2 rounded-lg"
                >
                  Employer Login
                </button>
                <button
                  onClick={() => {
                    setLoginType("Candidate");
                    setShowModal(true);
                  }}
                  className="text-white bg-[#02325a] px-4 py-2 rounded-lg"
                >
                  Candidate Login
                </button>
              </>
            ) : (
              <>
                <Link
                  href={userType === "Employer" ? "/employer/dashboard" : "/candidate/dashboard"}
                  className="text-black hover:text-gray-600"
                >
                  Dashboard
                </Link>
                {userType === "Employer" && (
                  <button
                    onClick={handleCreditsClick}
                    className="text-black font-semibold border-2 border-[#02325a] px-4 py-2 rounded-lg"
                  >
                    Available Credits: {usercred}
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {showModal && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full relative transform transition-all duration-300 scale-100">
            <button
              onClick={resetModalState}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              aria-label="Close modal"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <h2 className="text-2xl mb-6 font-bold text-gray-800">
              {modalMode === "login"
                ? `${loginType} Login`
                : modalMode === "forgotPassword"
                ? "Forgot Password"
                : modalMode === "verifyOtp"
                ? "Verify OTP"
                : "Reset Password"}
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={otpSent || modalMode === "verifyOtp" || modalMode === "resetPassword"}
                />
              </div>

              {modalMode === "login" && !otpSent && !useOtpLogin && (
                <div className="relative">
                  <RiLockPasswordFill className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}

              {modalMode === "login" && !otpSent && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useOtpLogin}
                    onChange={() => setUseOtpLogin(!useOtpLogin)}
                    className="mr-2"
                  />
                  <label className="text-gray-600">Login with OTP</label>
                </div>
              )}

              {(modalMode === "verifyOtp" || (modalMode === "login" && otpSent)) && (
                <div className="relative">
                  <FaLock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    value={otp}
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                </div>
              )}

              {modalMode === "resetPassword" && (
                <>
                  <div className="relative">
                    <RiLockPasswordFill className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      placeholder="Enter new password"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <RiLockPasswordFill className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      placeholder="Confirm new password"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </>
              )}

              {modalMode === "login" && !otpSent && (
                <div className="text-right">
                  <button
                    onClick={() => setModalMode("forgotPassword")}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <p className="text-gray-500 text-sm">
                By continuing, you agree to our{" "}
                <a href="/terms" className="text-blue-500 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-500 hover:underline">
                  Privacy Policy
                </a>.
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={resetModalState}
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  className="flex items-center bg-[#02325a] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  onClick={
                    modalMode === "forgotPassword"
                      ? handleForgotPassword
                      : modalMode === "verifyOtp"
                      ? handleVerifyResetOtp
                      : modalMode === "resetPassword"
                      ? handleResetPassword
                      : otpSent
                      ? handleSendOtp
                      : useOtpLogin
                      ? handleOtp
                      : loginType === "Employer"
                      ? handleEmployerLogin
                      : handleCandidateLogin
                  }
                  disabled={loading}
                >
                  {loading && <FaSpinner className="animate-spin mr-2" />}
                  {loading
                    ? "Processing..."
                    : modalMode === "forgotPassword"
                    ? "Send OTP"
                    : modalMode === "verifyOtp"
                    ? "Verify OTP"
                    : modalMode === "resetPassword"
                    ? "Reset Password"
                    : otpSent
                    ? "Verify OTP"
                    : useOtpLogin
                    ? "Send OTP"
                    : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}