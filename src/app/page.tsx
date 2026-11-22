import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

export default async function HomePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const name = session.user.name ?? session.user.email ?? "ユーザー";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">{name}さんこんにちは</h1>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button
          type="submit"
          className="rounded-md border border-gray-400 px-4 py-2 hover:bg-gray-100"
        >
          ログアウト
        </button>
      </form>
    </main>
  );
}
