"use client";
import Link from "next/link";
import { MdMic, MdMicOff, MdSettings } from "react-icons/md";
import "../chat/btn.css";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageHeading from "../components/ui/PageHeading";
import ChatMessages from "./components/ChatMessages";
import { useQuestion } from "./hooks/useQuestion";
import { useSpeech } from "./hooks/useSpeech";


export default function ChatPage() {
  const { history, isPending, question, askQuestion, setQuestion } =
    useQuestion();
  const { isListening, speechSupported, startListening } = useSpeech();

  return (
    <main className="min-h-screen w-full flex flex-col pt-32">
      <section className="flex flex-col justify-center items-center flex-1 gap-5 h-full">
        <PageHeading
          title="与知识库对话"
          subtitle="和语言模型针对已上传的资料开展沟通"
        />
        {/* Chat */}
        <Card className="p-5 max-w-3xl w-full min-h-full flex-1 mb-24">
          <ChatMessages history={history} />
          <Card className="fixed left-1/2 w-full max-w-3xl bg-gray-100 dark:bg-gray-800 rounded-b-none -translate-x-1/2 bottom-0 px-5 py-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!isPending) askQuestion();
              }}
              className="w-full flex items-center justify-center gap-2"
            >
              <input
                autoFocus
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-500 outline-none rounded dark:bg-gray-800"
                placeholder="在这里开始对话..."
              />
              <Button type="submit" isLoading={isPending} className="wider-button">
                {isPending ? "思考..." : "发送"}
              </Button>
              {/* Mic Button */}
              <Button
                className="px-3"
                variant={"tertiary"}
                type="button"
                onClick={startListening}
                disabled={!speechSupported}
              >
                {isListening ? (
                  <MdMicOff className="text-2xl" />
                ) : (
                  <MdMic className="text-2xl" />
                )}
              </Button>
              <Link href={"/config"}>
                <Button className="px-3" variant={"tertiary"}>
                  <MdSettings className="text-2xl" />
                </Button>
              </Link>
            </form>
          </Card>
        </Card>
      </section>
    </main>
  );
}
