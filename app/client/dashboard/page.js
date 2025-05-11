import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, PlusCircle, MessageSquare, AlertCircle } from "lucide-react"

export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500">Bienvenue dans votre espace client</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Nouvelle demande</CardTitle>
            <CardDescription>Déposer une nouvelle demande de crédit</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/client/new-application">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Commencer
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Mes demandes</CardTitle>
            <CardDescription>Suivre l'état de vos demandes</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/client/applications">
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Voir les demandes
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Messages</CardTitle>
            <CardDescription>Consulter vos messages</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/client/messages">
              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Voir les messages
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Informations importantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4 rounded-md bg-blue-50 p-4 text-blue-800">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Préparez vos documents</h4>
              <p className="text-sm text-blue-700">
                Pour une demande de crédit, vous aurez besoin de votre CIN, attestation de travail, fiche de paie et
                relevé de compte bancaire.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
