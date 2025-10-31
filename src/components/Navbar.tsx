"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme/ThemeToggle";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="max-w-7xl mx-auto mt-2 p-5 bg-background/10 shadow-md border border-border rounded-xl">
      <nav>
        <ul className="flex items-center justify-between">
          <Link href={"/tickets"} className="flex items-center gap-2 md:gap-3">
            <Image
              className="rounded-full md:size-10 size-7"
              src={"/support.png"}
              alt="logo"
              width={40}
              height={40}
            />
            <h3 className="text-foreground text-sm md:text-base font-normal">
              پروژه تیکت پشتیبانی
            </h3>
          </Link>

          <div className="flex items-center gap-2">
            {status === "loading" ? (
              <Skeleton className="h-4 w-10 rounded-md" />
            ) : (
              <span className="md:text-sm text-sm">{session?.user?.name}</span>
            )}

            <Avatar className="size-8">
              <AvatarImage src="/user-placeholder.jpg" />
              <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2 hover:bg-background hover:text-foreground"
            >
              <span className="md:block hidden">خروج</span>
              <LogOut size={14} />
            </Button>
            <ThemeToggle />
          </div>
        </ul>
      </nav>
    </header>
  );
}
