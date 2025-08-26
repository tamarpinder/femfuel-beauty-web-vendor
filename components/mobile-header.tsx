"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { VendorUserMenu } from "@/components/vendor-user-menu"
import { useAuth } from "@/contexts/auth-context"

export function MobileHeader() {
  const { user } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white border-b border-gray-100">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/femfuel-logo.png" 
              alt="FemFuel Beauty"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <div>
              <span className="text-lg font-bold text-femfuel-black">FemFuel</span>
              <p className="text-xs text-gray-600">Proveedores</p>
            </div>
          </Link>
          
          {user ? (
            <VendorUserMenu />
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}