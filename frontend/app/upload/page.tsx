"use client";
import Link from "next/link";
import Button from "../components/ui/Button";
import PageHeading from "../components/ui/PageHeading";
import { FileUploader } from "./components/FileUploader";

export default function UploadPage() {
  return (
    <main className="pt-24">
      <PageHeading
        title="上传知识"
        subtitle="支持txt, csv, doc, ppt, 音频和视频文件格式"
      />
      <FileUploader />
      {/* <Divider text="or" className="m-5" />
      <Crawler /> */}
      <div className="flex flex-col items-center justify-center gap-5 mt-5">
        <Link href={"/chat"}>
          <Button variant={"secondary"} className="py-3">
            对话
          </Button>
        </Link>
      </div>
    </main>
  );
}
