import type { Metadata } from "next";
import "./globals.css";

import { ApolloProviderWrapper } from "@/lib/apolloClient";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
        >
        <ApolloProviderWrapper>

        {children}
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
