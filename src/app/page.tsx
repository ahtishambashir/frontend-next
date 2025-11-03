import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-500">
      <h1 className="text-4xl font-bold text-white">
        Tailwind CSS is working! 🎉
      </h1>
    </div>
  );
}
