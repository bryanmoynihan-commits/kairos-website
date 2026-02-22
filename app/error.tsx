"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <p className="text-xs uppercase tracking-widest text-[#999] mb-4">Error</p>
      <h1 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] mb-4">
        Something went wrong.
      </h1>
      <p className="text-[#c0bdb8] text-base mb-8 text-center max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 bg-[#f0ede8] text-[#0a0a0a] text-sm font-semibold px-8 py-4 hover:bg-white transition-colors duration-200"
      >
        Try again
      </button>
    </section>
  );
}
