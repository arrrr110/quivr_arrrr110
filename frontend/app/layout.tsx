import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { cookies, headers } from "next/headers";
import { BrainConfigProvider } from "../lib/context/BrainConfigProvider/brain-config-provider";
import NavBar from "./components/NavBar";
import { ToastProvider } from "./components/ui/Toast";
import "./globals.css";
import SupabaseProvider from "./supabase-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "专业数据库 - 使用生成式 AI 获得第二个大脑",
  description:
    "专业数据库是您在线的第二个大脑，旨在轻松存储和检索非结构化信息。",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body
        className={`bg-white text-black dark:bg-black dark:text-white min-h-screen w-full ${inter.className}`}
      >
        <ToastProvider>
          <SupabaseProvider session={session}>
            <BrainConfigProvider>
              <NavBar />
              {children}
              {/* <Footer /> */}
            </BrainConfigProvider>
          </SupabaseProvider>
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}
