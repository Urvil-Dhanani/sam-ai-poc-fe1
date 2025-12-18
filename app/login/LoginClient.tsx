"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
  Shield,
  Building2,
  Users,
  UserPlus,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SamLogo } from "@/components/sam-logo";
import { initializeDefaultUsers } from "@/lib/auth-db";
import { API_CALL, API_URL } from "@/components/apis/ApiRoutes";
import { ErrorAlert } from "@/components/Alerts/Alert";

type LoginStep =
  | "select-module"
  | "enter-email"
  | "login-password"
  | "verify-otp"
  | "set-password"
  | "enter-password";
type AuthMode = "login" | "register";

const roleOptions = [
  {
    value: "super-admin",
    label: "Super Admin",
    description: "System-wide administration",
    icon: Shield,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    value: "association-admin",
    label: "Association Admin",
    description: "Manage your association",
    icon: Building2,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    value: "member",
    label: "Member Portal",
    description: "Access your benefits",
    icon: Users,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
];

export default function LoginPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [step, setStep] = useState<LoginStep>("select-module");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  // const [generatedOtp, setGeneratedOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      setStep("verify-otp");
    }
  }, [token]);

  useEffect(() => {
    initializeDefaultUsers().then(() => setIsInitialized(true));
  }, []);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setError("");
  };

  const handleContinueToEmail = () => {
    if (!selectedRole) {
      setError("Please select a module to continue");
      return;
    }
    setStep("enter-email");
    setError("");
  };

  const handleCheckEmail = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));

      // const existingUser = await getUserByEmail(email);

      if (authMode === "login") {
        // Login flow - user must exist
        // if (!existingUser) {
        //   setError("No account found with this email. Please register first.")
        //   setIsLoading(false)
        //   return
        // }
        setStep("login-password");
        setUser(email);

        // if (existingUser.role !== selectedRole) {
        //   setError(
        //     `This email is registered as ${existingUser.role.replace("-", " ")}. Please select the correct module.`,
        //   )
        //   setIsLoading(false)
        //   return
        // }

        // if (!existingUser.password || existingUser.isFirstLogin) {
        //   setError("Please complete your registration first.")
        //   setAuthMode("register")
        //   setIsLoading(false)
        //   return
        // }
      }
      //  else {
      //   // Register flow - send OTP
      //   if (
      //     existingUser &&
      //     existingUser.password &&
      //     !existingUser.isFirstLogin
      //   ) {
      //     setError(
      //       "An account already exists with this email. Please login instead."
      //     );
      //     setIsLoading(false);
      //     return;
      //   }

      //   if (existingUser) {
      //     if (existingUser.role !== selectedRole) {
      //       setError(
      //         `This email is registered as ${existingUser.role.replace(
      //           "-",
      //           " "
      //         )}. Please select the correct module.`
      //       );
      //       setIsLoading(false);
      //       return;
      //     }
      //     setUser(existingUser);
      //   } else {
      //     const newUser: User = {
      //       id: `${selectedRole}-${Date.now()}`,
      //       email,
      //       password: "",
      //       role: selectedRole as User["role"],
      //       name: email.split("@")[0],
      //       isFirstLogin: true,
      //       createdAt: Date.now(),
      //     };
      //     setUser(newUser);
      //   }

      //   const newOtp = generateOTP();
      //   setGeneratedOtp(newOtp);
      //
      //   alert(`[DEV MODE] Your OTP is: ${newOtp}`);

      //   setStep("verify-otp");
      // }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectLogin = async () => {
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await API_CALL(
        "post",
        API_URL.AUTH.LOGIN,
        { email, password },
        true
      );

      // Handle both response types: direct token or structured response
      let token = null;
      let userData = null;

      if (response?.data?.status === 1 || response?.data?.access_token) {
        // Response is structured with status and access_token
        token = response.data.access_token;
        userData = response.data.user;
      }

      if (token && typeof window !== "undefined") {
        localStorage.setItem("token", token);
        router.push("/super-admin");
      }
    } catch (err) {
      ErrorAlert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    // if (otp !== generatedOtp) {
    //   setError("Invalid OTP. Please try again.");
    //   return;
    // }

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStep("set-password");
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPassword = async () => {
    if (!password) {
      setError("Please enter a password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // if (user) {
      //   const updatedUser: User = {
      //     ...user,
      //     password,
      //     isFirstLogin: false,
      //   };
      //   await updateUser(updatedUser);
      //   const session = {
      //     id: `session-${Date.now()}`,
      //     userId: updatedUser.id,
      //     email: updatedUser.email,
      //     role: updatedUser.role,
      //     name: updatedUser.name,
      //     associationName: updatedUser.associationName,
      //     createdAt: Date.now(),
      //     expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      //   };
      //   await createSession(session);
      //   localStorage.setItem("sam_session_id", session.id);
      //   localStorage.setItem("sam_user", JSON.stringify(updatedUser));
      //   router.push(getRoleDashboardPath(updatedUser.role));
      // }
    } catch (err) {
      setError("Failed to set password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setError("");
    switch (step) {
      case "enter-email":
        setStep("select-module");
        break;
      case "login-password":
        setStep("enter-email");
        setPassword("");
        break;
      case "verify-otp":
        setStep("enter-email");
        setOtp("");
        break;
      case "set-password":
        setStep("verify-otp");
        setPassword("");
        setConfirmPassword("");
        break;
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
    setError("");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    if (step !== "select-module" && step !== "enter-email") {
      setStep("enter-email");
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <SamLogo size="xl" showText={false} />
          <p className="text-muted-foreground">Initializing...</p>
        </div>
      </div>
    );
  }

  const getStepIndex = () => {
    if (authMode === "login") {
      const steps = ["select-module", "enter-email", "login-password"];
      return steps.indexOf(step);
    } else {
      const steps = [
        "select-module",
        "enter-email",
        "verify-otp",
        "set-password",
      ];
      return steps.indexOf(step);
    }
  };

  const totalSteps = authMode === "login" ? 3 : 4;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-chart-3/15 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Centered glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <SamLogo size="lg" />
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Button
                variant={authMode === "login" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setAuthMode("login");
                  setError("");
                }}
                className={`gap-2 ${
                  authMode === "login" ? "" : "bg-transparent"
                }`}
              >
                <LogIn className="size-4" />
                Login
              </Button>
              {/* <Button
                variant={authMode === "register" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setAuthMode("register");
                  setError("");
                }}
                className={`gap-2 ${
                  authMode === "register" ? "" : "bg-transparent"
                }`}
              >
                <UserPlus className="size-4" />
                Register
              </Button> */}
            </div>

            <CardTitle className="text-2xl">
              {step === "select-module" &&
                (authMode === "login" ? "Welcome Back" : "Create Account")}
              {step === "enter-email" && "Enter Your Email"}
              {step === "login-password" && "Enter Password"}
              {step === "verify-otp" && "Verify OTP"}
              {step === "set-password" && "Set Your Password"}
            </CardTitle>
            <CardDescription>
              {step === "select-module" && "Select your module to continue"}
              {step === "enter-email" &&
                (authMode === "login"
                  ? "Enter your registered email"
                  : "We'll send you a verification code")}
              {step === "login-password" &&
                `Welcome back, ${user?.name || "User"}`}
              {step === "verify-otp" && `Enter the code sent to ${email}`}
              {step === "set-password" &&
                "Create a secure password for your account"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-4">
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i <= getStepIndex() ? "w-8 bg-primary" : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Step: Select Module */}
            {step === "select-module" && (
              <div className="space-y-4">
                <div className="space-y-3">
                  {roleOptions.map((role) => (
                    <button
                      key={role.value}
                      onClick={() => handleRoleSelect(role.value)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        selectedRole === role.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <div
                        className={`size-12 rounded-xl ${role.bgColor} flex items-center justify-center`}
                      >
                        <role.icon className={`size-6 ${role.color}`} />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold">{role.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {role.description}
                        </div>
                      </div>
                      {selectedRole === role.value && (
                        <CheckCircle2 className="size-5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>

                {error && (
                  <p className="text-sm text-destructive text-center">
                    {error}
                  </p>
                )}

                <Button
                  onClick={handleContinueToEmail}
                  className="w-full gap-2"
                  size="lg"
                >
                  Continue
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            )}

            {/* Step: Enter Email */}
            {step === "enter-email" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      onKeyDown={(e) => e.key === "Enter" && handleCheckEmail()}
                    />
                  </div>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="gap-2 bg-transparent"
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleCheckEmail}
                    className="flex-1 gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        {authMode === "login" ? "Checking..." : "Sending..."}
                      </>
                    ) : (
                      <>
                        {authMode === "login" ? "Continue" : "Send OTP"}
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  {/* {authMode === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    onClick={toggleAuthMode}
                    className="text-primary hover:underline font-medium"
                  >
                    {authMode === "login" ? "Register" : "Login"}
                  </button> */}
                </p>
              </div>
            )}

            {step === "login-password" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loginPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input
                      id="loginPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleDirectLogin()
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="gap-2 bg-transparent"
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleDirectLogin}
                    className="flex-1 gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        Login
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Forgot password?{" "}
                  <button
                    onClick={() => {
                      setAuthMode("register");
                      setStep("enter-email");
                    }}
                    className="text-primary hover:underline"
                  >
                    Reset via OTP
                  </button>
                </p>
              </div>
            )}

            {/* Step: Verify OTP */}
            {step === "verify-otp" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      className="pl-10 text-center text-lg tracking-widest"
                      maxLength={6}
                      onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                    />
                  </div>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex gap-3">
                  {/* <Button
                    variant="outline"
                    onClick={handleBack}
                    className="gap-2 bg-transparent"
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </Button> */}
                  <Button
                    onClick={handleVerifyOtp}
                    className="flex-1 gap-2"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  {/* Didn't receive the code?{" "}
                  <button
                    onClick={handleCheckEmail}
                    className="text-primary hover:underline"
                  >
                    Resend
                  </button> */}
                </p>
              </div>
            )}

            {/* Step: Set Password (First Time) */}
            {step === "set-password" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10"
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSetPassword()
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="gap-2 bg-transparent"
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleSetPassword}
                    className="flex-1 gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Setting up...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Demo credentials info */}
            {step === "select-module" && (
              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Demo Credentials:
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Super Admin: admin@sam.ai / admin123</p>
                  <p>Association: assoc@aap.org / assoc123</p>
                  <p>Member: member@email.com / member123</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
