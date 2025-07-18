export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="max-w-md min-h-screen m-auto flex items-center justify-center p-5">
      {children}
    </main>
  );
}
