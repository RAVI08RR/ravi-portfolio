import StyledComponentsRegistry from "@/lib/registry";

export const metadata = {
  title: 'Sanity Studio',
  description: 'Content management for portfolio website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}