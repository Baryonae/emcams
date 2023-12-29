export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-background font-sans antialiased max-sm:hidden">
      <div>
        <div className="max-xs:hidden">{children}</div>
      </div>
    </section>
  );
}
