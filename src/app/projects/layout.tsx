import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Ravi Belpade",
  description: "Portfolio of web development projects by Ravi Belpade, showcasing work in React, Next.js, and more.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}