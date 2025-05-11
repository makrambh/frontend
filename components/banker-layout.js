"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText, MessageSquare, Settings, LogOut, Menu, X, Home } from "lucide-react"

export default function BankerLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    // In a real app, you would call your logout API here
    router.push("/")
  }

  const navItems = [
    {
      label: "Tableau de bord",
      href: "/banker/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: "Demandes de crédit",
      href: "/banker/applications",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      label: "Messages",
      href: "/banker/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      label: "Paramètres",
      href: "/banker/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b">
            <h2 className="text-xl font-bold text-gray-800">Espace Banquier</h2>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === item.href ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="border-t p-4">
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
