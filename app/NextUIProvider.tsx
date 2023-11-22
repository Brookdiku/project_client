"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export default function UIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextUIProvider>
    <NextThemesProvider
    attribute="class"
    defaultTheme="dark"
    themes={['light','dark']}
    >
    {children}
    </NextThemesProvider>
    </NextUIProvider>;
}
