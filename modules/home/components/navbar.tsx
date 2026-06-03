"use client";

import { UserRole } from "@/lib/generated/prisma/enums";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Menu, PanelLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = ({ userRole }: { userRole: UserRole }) => {
  return (
    <nav className="fixed top-4 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 px-3 sm:px-4">
      <div className="rounded-2xl border border-white/20 bg-white/10 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-200 hover:bg-white/15 dark:border-white/10 dark:bg-black/10 dark:shadow-black/20 dark:hover:bg-black/15">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <Image src="/logo.svg" alt="Codesprint" width={42} height={42} />
            <span className="truncate text-base font-bold tracking-widest text-amber-300 sm:text-2xl">Codesprint</span>
          </Link>

          {/* Right Side — ModeToggle + Hamburger (same on all screens) */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[85vw] max-w-sm p-0">
                <div className="flex h-full flex-col">
                  <SheetHeader className="border-b px-5 py-4">
                    <SheetTitle className="flex items-center gap-2">
                      <PanelLeft className="h-4 w-4 text-amber-400" />
                      Menu
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 space-y-6 px-5 py-6">
                    {/* Nav Links */}
                    <div className="space-y-2">
                      <SheetClose asChild>
                        <Link href="/problems" className="block rounded-xl border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted">
                          Problems
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/about" className="block rounded-xl border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted">
                          About
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/profile" className="block rounded-xl border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted">
                          Profile
                        </Link>
                      </SheetClose>
                    </div>

                    {/* Auth Buttons */}
                    <div className="space-y-3 border-t pt-5">
                      <Show when="signed-in">
                        {userRole === UserRole.ADMIN && (
                          <SheetClose asChild>
                            <Link href="/create-problem" className="block">
                              <Button variant="outline" className="w-full justify-center">
                                Create Problem
                              </Button>
                            </Link>
                          </SheetClose>
                        )}
                        <div className="flex items-center justify-between rounded-xl border px-4 py-3">
                          <span className="text-sm text-muted-foreground">Account</span>
                          <UserButton />
                        </div>
                      </Show>

                      <Show when="signed-out">
                        <div className="grid gap-3">
                          <SignInButton>
                            <Button variant="outline" className="w-full justify-center">
                              Sign In
                            </Button>
                          </SignInButton>
                          <SignUpButton>
                            <Button className="w-full bg-amber-400 text-white hover:bg-amber-500">Sign Up</Button>
                          </SignUpButton>
                        </div>
                      </Show>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
