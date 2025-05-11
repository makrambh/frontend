import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react"

export default function BankerDashboard() {
  // Simulated data - in a real app, this would come from an API
  const stats = {
    pending: 12,
    approved: 45,
    rejected: 8,
    total: 65,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500">Bienvenue dans votre espace banquier</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Demandes en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold">{stats.pending}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Demandes approuvées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{stats.approved}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Demandes rejetées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <XCircle className="mr-2 h-5 w-5 text-red-500" />
              <span className="text-2xl font-bold">{stats.rejected}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total des demandes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{stats.total}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Demandes récentes</CardTitle>
            <CardDescription>Dernières demandes de crédit reçues</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/banker/applications">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Voir toutes les demandes
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Messages</CardTitle>
            <CardDescription>Consulter vos messages</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/banker/messages">
              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Voir les messages
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
