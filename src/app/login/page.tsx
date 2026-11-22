import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";

type Props = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

function safeRedirectPath(url?: string) {
  return url && url.startsWith("/") && !url.startsWith("//") ? url : "/";
}

export default async function LoginPage({ searchParams }: Props) {
  const { callbackUrl } = await searchParams;
  const redirectTo = safeRedirectPath(callbackUrl);

  const session = await auth();
  if (session) {
    redirect(redirectTo);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo }, { prompt: "select_account" });
        }}
      >
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Googleでログイン
        </button>
      </form>
    </main>
  );
}