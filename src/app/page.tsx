import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center justify-center p-8">
      <section className="surface w-full rounded-2xl p-10 shadow-2xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-violet">Realtime Platform</p>
        <h1 className="text-4xl font-bold">Communication Platform</h1>
        <p className="mt-4 max-w-2xl text-slate-400">
          Text chat, presence, direct media ingestion, and hybrid WebRTC calling.
        </p>
        <div className="mt-8 flex gap-3">
          <Link className="rounded-lg bg-indigo px-5 py-3 font-semibold" href="/chat/demo">Open chat</Link>
          <Link className="rounded-lg border border-slate-600 px-5 py-3" href="/call/demo">Open call</Link>
        </div>
      </section>
    </main>
  );
}
