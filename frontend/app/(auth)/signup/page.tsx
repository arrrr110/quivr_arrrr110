"use client";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Field from "@/app/components/ui/Field";
import PageHeading from "@/app/components/ui/PageHeading";
import { useSupabase } from "@/app/supabase-provider";
import { useToast } from "@/lib/hooks/useToast";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { publish } = useToast();
  const handleSignUp = async () => {
    setIsPending(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
      publish({
        variant: "danger",
        text: `Error signing up: ${error.message}`,
      });
    } else if (data) {
      publish({
        variant: "success",
        text: "Confirmation Email sent, please check your email",
      });
    }
    setIsPending(false);
  };

  return (
    <main>
      <section className="w-full min-h-screen h-full outline-none flex flex-col gap-5 items-center justify-center p-6">
        <PageHeading title="注册" subtitle="创建你的账户" />
        <Card className="max-w-md w-full p-5 sm:p-10 text-left">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
            className="flex flex-col gap-2"
          >
            <Field
              name="email"
              required
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Field
              name="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div className="flex flex-col items-center justify-center mt-2 gap-2">
              <Button isLoading={isPending}>注册</Button>
              <Link href="/login">已经注册? 登录</Link>
            </div>
          </form>
        </Card>
      </section>
    </main>
  );
}
