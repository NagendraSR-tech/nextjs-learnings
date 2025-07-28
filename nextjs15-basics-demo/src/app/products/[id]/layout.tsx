export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <div>
        <h2>Featured Product Heading</h2>
      </div>
    </div>
  );
}
