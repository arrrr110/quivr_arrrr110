"use client";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import PageHeading from "@/app/components/ui/PageHeading";
import { useSupabase } from "@/app/supabase-provider";
import { useToast } from "@/lib/hooks/useToast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Logout() {
  const { supabase } = useSupabase();
  const [isPending, setIsPending] = useState(false);

  const { publish } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    setIsPending(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
      publish({
        variant: "danger",
        text: `Error logging out: ${error.message}`,
      });
    } else {
      publish({
        variant: "success",
        text: "Logged out successfully",
      });
      router.replace("/");
    }
    setIsPending(false);
  };

  return (
    <main>
      <section className="w-full min-h-screen h-full outline-none flex flex-col gap-5 items-center justify-center p-6">
        <PageHeading title="注销" subtitle="下次见" />
        <Card className="max-w-md w-full p-5 sm:p-10 text-center flex flex-col items-center gap-5">
          <h2 className="text-lg">你确定想要注销吗?</h2>
          <div className="flex gap-5 items-center justify-center">
            <Link href={"/"}>
              <Button variant={"primary"}>返回</Button>
            </Link>
            <Button
              isLoading={isPending}
              variant={"danger"}
              onClick={() => handleLogout()}
            >
              注销
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}
