"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, FileText, Download } from "lucide-react"
import Link from "next/link"

export default function ClientApplications() {
  // Simulated data - in a real app, this would come from an API
  const [applications] = useState([
    {
      id: 1,
      date: "2023-05-10",
      montant: 15000,
      duree: 36,
      objet: "Automobile",
      status: "en_cours",
      statusLabel: "En cours d'analyse",
    },
    {
      id: 2,
      date: "2023-04-22",
      montant: 5000,
      duree: 12,
      objet: "Consommation",
      status: "approuve",
      statusLabel: "Approuvé",
      contrat: true,
    },
    {
      id: 3,
      date: "2023-03-15",
      montant: 8000,
      duree: 24,
      objet: "Travaux",
      status: "refuse",
      statusLabel: "Refusé",
      motif: "Capacité de remboursement insuffisante",
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case "en_cours":
        return "bg-yellow-100 text-yellow-800"
      case "approuve":
        return "bg-green-100 text-green-800"
      case "refuse":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mes demandes de crédit</h1>
        <p className="text-gray-500">Suivez l'état de vos demandes de crédit</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="en_cours">En cours</TabsTrigger>
          <TabsTrigger value="approuve">Approuvées</TabsTrigger>
          <TabsTrigger value="refuse">Refusées</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">Demande #{application.id}</CardTitle>
                    <Badge className={getStatusColor(application.status)}>{application.statusLabel}</Badge>
                  </div>
                  <CardDescription>Soumise le {new Date(application.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Montant</p>
                      <p className="font-medium">{application.montant} €</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Durée</p>
                      <p>{application.duree} mois</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Objet</p>
                      <p>{application.objet}</p>
                    </div>
                  </div>

                  {application.status === "refuse" && (
                    <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
                      <p className="font-medium">Motif du refus:</p>
                      <p>{application.motif}</p>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Détails
                    </Button>

                    {application.status === "approuve" && application.contrat && (
                      <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                        <FileText className="mr-2 h-4 w-4" />
                        Voir le contrat
                      </Button>
                    )}

                    {application.status === "approuve" && application.contrat && (
                      <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="en_cours" className="mt-6">
          <div className="space-y-4">
            {applications
              .filter((app) => app.status === "en_cours")
              .map((application) => (
                <Card key={application.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">Demande #{application.id}</CardTitle>
                      <Badge className={getStatusColor(application.status)}>{application.statusLabel}</Badge>
                    </div>
                    <CardDescription>Soumise le {new Date(application.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Montant</p>
                        <p className="font-medium">{application.montant} €</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Durée</p>
                        <p>{application.duree} mois</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Objet</p>
                        <p>{application.objet}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="approuve" className="mt-6">
          <div className="space-y-4">
            {applications
              .filter((app) => app.status === "approuve")
              .map((application) => (
                <Card key={application.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">Demande #{application.id}</CardTitle>
                      <Badge className={getStatusColor(application.status)}>{application.statusLabel}</Badge>
                    </div>
                    <CardDescription>Soumise le {new Date(application.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Montant</p>
                        <p className="font-medium">{application.montant} €</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Durée</p>
                        <p>{application.duree} mois</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Objet</p>
                        <p>{application.objet}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Détails
                      </Button>

                      {application.contrat && (
                        <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                          <FileText className="mr-2 h-4 w-4" />
                          Voir le contrat
                        </Button>
                      )}

                      {application.contrat && (
                        <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="refuse" className="mt-6">
          <div className="space-y-4">
            {applications
              .filter((app) => app.status === "refuse")
              .map((application) => (
                <Card key={application.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">Demande #{application.id}</CardTitle>
                      <Badge className={getStatusColor(application.status)}>{application.statusLabel}</Badge>
                    </div>
                    <CardDescription>Soumise le {new Date(application.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Montant</p>
                        <p className="font-medium">{application.montant} €</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Durée</p>
                        <p>{application.duree} mois</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Objet</p>
                        <p>{application.objet}</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
                      <p className="font-medium">Motif du refus:</p>
                      <p>{application.motif}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Link href="/client/new-application">
          <Button className="bg-blue-600 hover:bg-blue-700">Nouvelle demande de crédit</Button>
        </Link>
      </div>
    </div>
  )
}
