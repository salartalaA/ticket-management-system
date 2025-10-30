import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme/ThemeToggle";

export default function Navbar() {
  const user = true;

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

          {user ? (
            <div className="flex items-center gap-2">
              <span className="md:text-sm text-sm">Salina</span>
              <Avatar className="size-10">
                <AvatarImage src="/user-placeholder.jpg" />
                <AvatarFallback>profile</AvatarFallback>
              </Avatar>
              <Button className="flex items-center gap-2 dark:hover:bg-primary dark:bg-background dark:text-foreground dark:hover:text-secondary hover:bg-background hover:text-foreground">
                <span className="md:block hidden">خروج</span>
                <LogOut size={14} />
              </Button>
              <ThemeToggle />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button className="flex items-center gap-2 bg-background text-foreground hover:bg-accent-foreground hover:text-background">
                <span className="md:block hidden">ورود</span>
                <LogIn size={14} />
              </Button>
              <Button className="flex items-center gap-2 hover:bg-background hover:text-foreground">
                <span className="md:block hidden">ثبت نام</span>
                <UserPlus size={14} />
              </Button>
              <ThemeToggle />
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}
