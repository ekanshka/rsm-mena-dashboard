import Link from "next/link";
import {
  BarChart3,
  Settings,
  Bell,
  Search,
  HelpCircle,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function MainNav() {
  return (
    <div className="border-b shadow-sm bg-white sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link
          href="/"
          className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent flex items-center gap-2"
        >
          <div>
            <Image
              src="https://res.cloudinary.com/rsmglobal/image/fetch/t_default/f_auto/q_auto/https://www.rsm.global/profiles/rsm_global_platform/themes/rsm_global_platform_2022/images/logo@2x.png"
              alt="Leads Management"
              width={100}
              height={100}
            />
          </div>
        </Link>

        <div className="hidden md:flex mx-6 items-center space-x-1 lg:space-x-2 flex-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-medium transition-colors hover:text-blue-600 flex items-center gap-1.5"
          >
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-medium transition-colors hover:text-blue-600 flex items-center gap-1.5"
          >
            Leads
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-medium transition-colors hover:text-blue-600 flex items-center gap-1.5"
          >
            Meetings
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-medium transition-colors hover:text-blue-600 flex items-center gap-1.5"
          >
            Reports
          </Button>
        </div>

        <div className="hidden md:flex mx-auto max-w-sm flex-1">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 rounded-lg border-gray-200 focus-visible:ring-blue-500 bg-gray-50"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-500 hover:text-blue-600"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-500 hover:text-blue-600"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-blue-600"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src="/diverse-avatars.png" />
              <AvatarFallback className="bg-white text-blue-600 text-xs font-bold">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-500 hover:text-blue-600"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
