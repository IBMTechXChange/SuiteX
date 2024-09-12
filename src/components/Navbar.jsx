"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlertWidget from "./AlertWidget";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="max-w-7xl mx-auto fixed top-4 left-4 right-4 bg-white/80 backdrop-blur-md shadow-lg rounded-3xl z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex flex-shrink-0 space-x-2">
              <Image src='/logo.png' alt='SuiteX Logo' width={32} height={32} />
              <span className="text-2xl font-bold">SuiteX</span>
            </Link>
          </div>

          {/* Desktop Links and Dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Desktop Links */}
            <Link href="/link1" className="text-sm font-medium hover:text-gray-700">
              Link 1
            </Link>
            <AlertWidget />

            {/* Profile Button with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2 ml-3 gap-2 flex items-center">
                  <UserInfo />
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="border">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Mobile navigation links */}
            <Link href="/link1" className="block text-sm font-medium hover:text-gray-700">
              Link 1
            </Link>
            <Link href="/link2" className="block text-sm font-medium hover:text-gray-700">
              Link 2
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex justify-between px-4">
              <UserInfo />
              <Button>
                <LogOut className="w-4 h-4 mr-1" /> Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// UserInfo Component
function UserInfo() {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span> John Doe </span>
    </div>
  );
}
