"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Eye, Search, Filter, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function BankerApplications() {
  // Simulated data - in a real app, this would come from an API
  const [applications] = useState([
    {
      id: 1,
      clientName: "Jean Dupont",
      date: "2023-05-10",
      montant: 15000,
      duree: 36,
      objet: "Automobile",
      status: "en_cours",
      statusLabel: "En attente",
    },
    {
      id: 2,
      clientName: "Marie Martin",
      date: "2023-05-08",
      montant: 5000,
      duree: 12,
      objet: "Consommation",
      status: "en_cours",
      statusLabel: "En attente",
    },
    {
      id: 3,
      clientName: "Pierre Durand",
      date: "2023-05-05",
      montant: 8000,
      duree: 24,
      objet: "Travaux",
      status: "en_cours",
      statusLabel: "En attente",
    },
    {
      id: 4,
      clientName: "Sophie Leroy",
      date: "2023-04-28",
      montant: 25000,
      duree: 48,
      objet: "Immobilier",
      status: "approuve",
      statusLabel: "Approuvé",
    },
    {
      id: 5,
      clientName: "Thomas Bernard",
      date: "2023-04-22",
      montant: 3000,
      duree: 6,
      objet: "Consommation",
      status: "refuse",
      statusLabel: "Refusé",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

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

  const filteredApplications = applications.filter(
    (app) => app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || app.id.toString().includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Demandes de crédit</h1>
        <p className="text-gray-500">Gérez les demandes de crédit des clients</p>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Rechercher par nom ou numéro..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filtres
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="en_cours">En attente</TabsTrigger>
          <TabsTrigger value="approuve">Approuvées</TabsTrigger>
          <TabsTrigger value="refuse">Refusées</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                <Card key={application.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">
                        Demande #{application.id} - {application.clientName}
                      </CardTitle>
                      <Badge className={getStatusColor(application.status)}>{application.statusLabel}</Badge>
                    </div>
                    <CardDescription>Soumise le {new Date(application.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
                      <div>
                        <p className="text-sm font-medium text-gray-500">Client</p>
                        <p>{application.clientName}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link href={`/banker/applications/${application.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Voir détails
                        </Button>
                      </Link>

                      {application.status === "en_cours" && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approuver
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="mr-2 h-4 w-4" />
                            Refuser
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <p className="text-gray-500">Aucune demande trouvée</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="en_cours" className="mt-6">
          <div className="space-y-4">
            {filteredApplications
              .filter((app) => app.status === "en_cours")
              .map((application) => (
                <Card key={application.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">
                        Demande #{application.id} - {application.clientName}
                      </CardTitle>
                      <Badge className={getStatusColor(application.status)}>{application.statusLabel}</Badge>
                    </div>
                    <CardDescription>Soumise le {new Date(application.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
                      <div>
                        <p className="text-sm font-medium text-gray-500">Client</p>
                        <p>{application.clientName}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link href={`/banker/applications/${application.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Voir détails
                        </Button>
                      </Link>

                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approuver
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        Refuser
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="approuve" className="mt-6">
          <div className="space-y-4">
            {filteredApplications
              .filter((app) => app.status === "approuve")
              .map((application) => (
                <Card key={application.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">
                        Demande #{application.id} - {application.clientName}
                      </CardTitle>
                      <Badge className={getStatusColor(application.status)}>{application.statusLabel}</Badge>
                    </div>
                    <CardDescription>Soumise le {new Date(application.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
                      <div>
                        <p className="text-sm font-medium text-gray-500">Client</p>
                        <p>{application.clientName}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link href={`/banker/applications/${application.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Voir détails
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="refuse" className="mt-6">
          <div className="space-y-4">
            {filteredApplications
              .filter((app) => app.status === "refuse")
              .map((application) => (
                <Card key={application.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">
                        Demande #{application.id} - {application.clientName}
                      </CardTitle>
                      <Badge className={getStatusColor(application.status)}>{application.statusLabel}</Badge>
                    </div>
                    <CardDescription>Soumise le {new Date(application.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
                      <div>
                        <p className="text-sm font-medium text-gray-500">Client</p>
                        <p>{application.clientName}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link href={`/banker/applications/${application.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Voir détails
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
