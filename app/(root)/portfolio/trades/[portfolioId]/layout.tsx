import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trades",
};

export default function TradesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
