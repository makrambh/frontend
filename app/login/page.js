"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "client"
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simulate authentication
    if (formData.email && formData.password) {
      // In a real app, you would call your authentication API here

      // Redirect based on role
      if (role === "client") {
        router.push("/client/dashboard")
      } else {
        router.push("/banker/dashboard")
      }

      // Show success toast
      toast({
        title: "Connexion réussie",
        description: `Bienvenue dans votre espace ${role === "client" ? "client" : "banquier"}`,
      })
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-700">
              {role === "client" ? "Espace Client" : "Espace Banquier"}
            </CardTitle>
            <CardDescription>Connectez-vous pour accéder à votre compte</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Se connecter
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
