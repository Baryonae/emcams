export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <section className="py-8 md:py-10">
        <div className="">{children}</div>
      </section>
    </div>
    //sample commit
    //another commit
  );
}
