import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-700">Gestion des Crédits</CardTitle>
            <CardDescription>Connectez-vous pour accéder à votre espace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/login?role=client" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Espace Client
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login?role=banker" className="w-full">
                <Button className="w-full bg-gray-700 hover:bg-gray-800">
                  Espace Banquier
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
