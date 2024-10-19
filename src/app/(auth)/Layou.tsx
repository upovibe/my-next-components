// app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>
          <main className="min-h-screen flex items-center justify-center bg-gray-100">
            {children}
          </main>
        </body>
      </html>
    );
  }
  