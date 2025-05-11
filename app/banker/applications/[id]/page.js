"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, FileText, Download, Send } from "lucide-react"

export default function ApplicationDetail({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const applicationId = params.id

  // Simulated data - in a real app, this would come from an API
  const [application] = useState({
    id: applicationId,
    clientName: "Jean Dupont",
    date: "2023-05-10",
    montant: 15000,
    duree: 36,
    objet: "Automobile",
    status: "en_cours",
    statusLabel: "En attente",

    // Informations personnelles
    nom: "Dupont",
    prenom: "Jean",
    dateNaissance: "1985-06-15",
    etatCivil: "Marié",
    cin: "AB123456",
    adresse: "123 Rue de Paris, 75001 Paris",
    tel: "0612345678",
    email: "jean.dupont@example.com",

    // Informations professionnelles
    profession: "Ingénieur",
    typeContrat: "CDI",
    employeur: "Tech Solutions",
    ancienneteMois: 48,

    // Informations financières
    revenusMensuelsNet: 3500,
    autresRevenusMensuels: 0,
    nbrPersonnesEnCharge: 2,
    chargesLoyer: 800,
    chargesCreditEnCours: 200,
    incidentsRejetsPrelevement: false,
    incidentsDecouvertsNonAutorises: false,
    incidentsRejetCredit: false,
    nomBanque: "Banque Nationale",

    // Analyse financière
    analyseFinanciere: {
      tauxEndettement: 28.57,
      capaciteRemboursementMensuel: 833,
      scoreCredit: 720,
      risque: "Faible",
    },

    // Échéancier proposé
    echeancier: [
      { mois: 1, capital: 416.67, interet: 62.5, total: 479.17, capitalRestant: 14583.33 },
      { mois: 2, capital: 416.67, interet: 60.76, total: 477.43, capitalRestant: 14166.66 },
      { mois: 3, capital: 416.67, interet: 59.03, total: 475.7, capitalRestant: 13749.99 },
      // ... autres mois
    ],
  })

  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: "Demande de crédit reçue et en cours d'analyse.",
      timestamp: new Date("2023-05-10T10:30:00"),
    },
  ])

  const handleApprove = () => {
    toast({
      title: "Demande approuvée",
      description: "La demande a été approuvée avec succès.",
      variant: "success",
    })

    // Rediriger vers la page de contrat
    router.push(`/banker/applications/${applicationId}/contract`)
  }

  const handleReject = () => {
    toast({
      title: "Demande refusée",
      description: "La demande a été refusée avec succès.",
      variant: "destructive",
    })

    // Rediriger vers la liste des demandes
    router.push("/banker/applications")
  }

  const handleSendMessage = () => {
    if (!messageText.trim()) return

    const newMessage = {
      id: messages.length + 1,
      sender: "banker",
      text: messageText,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setMessageText("")

    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé au client.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Demande #{applicationId}</h1>
          <p className="text-gray-500">Client: {application.clientName}</p>
        </div>
        <Badge className="bg-yellow-100 text-yellow-800">{application.statusLabel}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Montant demandé</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{application.montant} €</p>
            <p className="text-sm text-gray-500">sur {application.duree} mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Objet du financement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{application.objet}</p>
            <p className="text-sm text-gray-500">
              Demande soumise le {new Date(application.date).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Taux d'endettement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{application.analyseFinanciere.tauxEndettement}%</p>
            <p className="text-sm text-gray-500">
              Capacité de remboursement: {application.analyseFinanciere.capaciteRemboursementMensuel} €/mois
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Détails client</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="analyse">Analyse financière</TabsTrigger>
          <TabsTrigger value="chat">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nom</p>
                  <p>{application.nom}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Prénom</p>
                  <p>{application.prenom}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date de naissance</p>
                  <p>{new Date(application.dateNaissance).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">État civil</p>
                  <p>{application.etatCivil}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">CIN</p>
                  <p>{application.cin}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Téléphone</p>
                  <p>{application.tel}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{application.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Adresse</p>
                  <p>{application.adresse}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informations professionnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Profession</p>
                  <p>{application.profession}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Type de contrat</p>
                  <p>{application.typeContrat}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Employeur</p>
                  <p>{application.employeur}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Ancienneté</p>
                  <p>{application.ancienneteMois} mois</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informations financières</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Revenus mensuels nets</p>
                  <p>{application.revenusMensuelsNet} €</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Autres revenus mensuels</p>
                  <p>{application.autresRevenusMensuels} €</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Personnes à charge</p>
                  <p>{application.nbrPersonnesEnCharge}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Charges loyer</p>
                  <p>{application.chargesLoyer} €</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Charges crédit en cours</p>
                  <p>{application.chargesCreditEnCours} €</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Banque actuelle</p>
                  <p>{application.nomBanque}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Incidents bancaires</p>
                  <p>
                    {application.incidentsRejetsPrelevement ||
                    application.incidentsDecouvertsNonAutorises ||
                    application.incidentsRejetCredit
                      ? "Oui"
                      : "Non"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents du client</CardTitle>
              <CardDescription>Consultez les documents fournis par le client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Carte d'identité</p>
                      <p className="text-sm text-gray-500">PDF, 2.3 MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Attestation de travail</p>
                      <p className="text-sm text-gray-500">PDF, 1.1 MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Fiche de paie</p>
                      <p className="text-sm text-gray-500">PDF, 0.8 MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Relevé de compte</p>
                      <p className="text-sm text-gray-500">PDF, 3.5 MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analyse" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Analyse financière</CardTitle>
              <CardDescription>Résultats de l'analyse financière automatique</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-md bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-500">Taux d'endettement</p>
                    <p className="text-2xl font-bold">{application.analyseFinanciere.tauxEndettement}%</p>
                    <p className="text-xs text-gray-500">Maximum recommandé: 33%</p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-500">Capacité de remboursement</p>
                    <p className="text-2xl font-bold">{application.analyseFinanciere.capaciteRemboursementMensuel} €</p>
                    <p className="text-xs text-gray-500">Par mois</p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-500">Score de crédit</p>
                    <p className="text-2xl font-bold">{application.analyseFinanciere.scoreCredit}</p>
                    <p className="text-xs text-gray-500">Sur 850</p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-500">Niveau de risque</p>
                    <p className="text-2xl font-bold">{application.analyseFinanciere.risque}</p>
                    <p className="text-xs text-gray-500">Évaluation globale</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium">Échéancier proposé</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left">Mois</th>
                          <th className="px-4 py-2 text-left">Capital</th>
                          <th className="px-4 py-2 text-left">Intérêt</th>
                          <th className="px-4 py-2 text-left">Total</th>
                          <th className="px-4 py-2 text-left">Capital restant</th>
                        </tr>
                      </thead>
                      <tbody>
                        {application.echeancier.map((echeance) => (
                          <tr key={echeance.mois} className="border-b">
                            <td className="px-4 py-2">{echeance.mois}</td>
                            <td className="px-4 py-2">{echeance.capital.toFixed(2)} €</td>
                            <td className="px-4 py-2">{echeance.interet.toFixed(2)} €</td>
                            <td className="px-4 py-2 font-medium">{echeance.total.toFixed(2)} €</td>
                            <td className="px-4 py-2">{echeance.capitalRestant.toFixed(2)} €</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-md bg-green-50 p-4 text-green-800">
                  <h3 className="mb-2 font-medium">Recommandation du système</h3>
                  <p>
                    Basé sur l'analyse financière, le système recommande l'approbation de cette demande de crédit. Le
                    client présente un bon profil financier avec un taux d'endettement acceptable et une capacité de
                    remboursement suffisante.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Communiquez avec le client concernant sa demande</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 space-y-4 overflow-y-auto rounded-md border p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "banker" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "banker"
                          ? "bg-blue-600 text-white"
                          : message.sender === "client"
                            ? "bg-gray-200 text-gray-800"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className="mt-1 text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center space-x-2">
                <Textarea
                  placeholder="Écrivez votre message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button onClick={handleSendMessage} className="h-full">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex items-center justify-end space-x-4">
        <Button variant="outline" onClick={() => router.push("/banker/applications")}>
          Retour à la liste
        </Button>
        <Button variant="destructive" onClick={handleReject}>
          <XCircle className="mr-2 h-4 w-4" />
          Refuser la demande
        </Button>
        <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove}>
          <CheckCircle className="mr-2 h-4 w-4" />
          Approuver la demande
        </Button>
      </div>
    </div>
  )
}
