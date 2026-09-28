import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const userCount = await prisma.user.count();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-4 px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          arflora
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Database terhubung — {userCount} user di tabel{" "}
          <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
            User
          </code>
          .
        </p>
      </main>
    </div>
  );
}
