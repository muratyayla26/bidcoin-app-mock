export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-0">
      <div className="inline-block max-w-lg text-center justify-center w-full min-w-full">
        {children}
      </div>
    </section>
  );
}
