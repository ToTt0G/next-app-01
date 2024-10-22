"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import { ModeToggle } from "./modeToggle";

export function Nav({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center w-screen bg-primary text-primary-foreground">
      <nav className="relative flex justify-center items-center container mx-4 mt-2">
        {children}
        <div className="absolute right-0 mt-1 place-self-start">
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <>
      <Link
        {...props}
        className={cn(
          "px-4 pb-3 pt-3 rounded-t-xl hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
          pathname === props.href &&
            "bg-background-2 text-foreground-2 font-semibold"
        )}
      />
    </>
  );
}
