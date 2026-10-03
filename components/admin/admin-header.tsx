// components/admin/admin-header.tsx
"use client";

import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "./logout";

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
  } | undefined;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter();

  return (
    <header className="border-b border-border bg-surface py-3 pl-14 pr-4 md:py-4 md:pl-6 md:pr-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground sm:text-2xl">
            Admin Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || "A"}
                </div>
                <span className="hidden md:inline">{user?.name || "Admin"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 max-w-[calc(100vw-2rem)]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push("/admin/change-password")}
              >
                Change Password
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive"
                onClick={() => logout()}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}