export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 py-2 md:py-2">
      <div className="inline-block ">{children}</div>
    </section>
  );
}
