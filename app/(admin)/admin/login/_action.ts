"use server"
import { signIn } from "@/auth";

export async function login(data: { email: string; password: string }) {
  const { email, password } = data;
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/admin",
    });
    return result;
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An error occurred during login" };
  }
}
