"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { FileText, Download, CheckCircle } from "lucide-react"

export default function ContractPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const applicationId = params.id
  const [signed, setSigned] = useState(false)

  // Simulated data - in a real app, this would come from an API
  const [application] = useState({
    id: applicationId,
    clientName: "Jean Dupont",
    montant: 15000,
    duree: 36,
    tauxInteret: 5.0,
    mensualite: 450,
    dateDebut: "2023-06-01",
    dateFin: "2026-05-31",
  })

  const handleSign = () => {
    // Simuler la signature du contrat
    toast({
      title: "Contrat signé",
      description: "Le contrat a été signé avec succès.",
      variant: "success",
    })

    setSigned(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contrat de crédit</h1>
        <p className="text-gray-500">
          Demande #{applicationId} - {application.clientName}
        </p>
      </div>

      {!signed ? (
        <Card>
          <CardHeader>
            <CardTitle>Contrat de prêt</CardTitle>
            <CardDescription>Veuillez vérifier les termes du contrat avant de le signer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-md border p-6">
              <h2 className="mb-4 text-center text-xl font-bold">CONTRAT DE PRÊT</h2>

              <div className="mb-6 space-y-2">
                <p className="font-medium">ENTRE LES SOUSSIGNÉS :</p>
                <p>
                  La Banque, société anonyme au capital de 500 000 000 €, immatriculée au RCS de Paris sous le numéro
                  123 456 789, dont le siège social est situé au 1 Avenue des Champs-Élysées, 75008 Paris, représentée
                  par M. Pierre Martin, en sa qualité de Directeur des crédits, ci-après dénommée "le Prêteur",
                </p>
                <p>ET</p>
                <p>
                  {application.clientName}, demeurant à 123 Rue de Paris, 75001 Paris, ci-après dénommé "l'Emprunteur",
                </p>
              </div>

              <div className="mb-6 space-y-2">
                <p className="font-medium">IL A ÉTÉ CONVENU CE QUI SUIT :</p>

                <p className="font-medium">Article 1 - Objet du contrat</p>
                <p>
                  Le Prêteur consent à l'Emprunteur, qui accepte, un prêt d'un montant de {application.montant} €
                  (quinze mille euros) destiné à financer l'achat d'un véhicule automobile.
                </p>

                <p className="font-medium">Article 2 - Durée</p>
                <p>
                  Le prêt est consenti pour une durée de {application.duree} mois à compter de la date de signature du
                  présent contrat.
                </p>

                <p className="font-medium">Article 3 - Taux d'intérêt</p>
                <p>
                  Le taux d'intérêt annuel fixe est de {application.tauxInteret}%. Le Taux Annuel Effectif Global (TAEG)
                  est de {application.tauxInteret + 0.5}%.
                </p>

                <p className="font-medium">Article 4 - Remboursement</p>
                <p>
                  L'Emprunteur s'engage à rembourser le prêt en {application.duree} mensualités constantes de{" "}
                  {application.mensualite} € chacune, comprenant l'amortissement du capital et le paiement des intérêts.
                </p>
                <p>
                  La première échéance interviendra le {new Date(application.dateDebut).toLocaleDateString()} et la
                  dernière le {new Date(application.dateFin).toLocaleDateString()}.
                </p>

                <p className="font-medium">Article 5 - Assurance</p>
                <p>
                  L'Emprunteur déclare avoir souscrit une assurance couvrant les risques de décès, d'invalidité et
                  d'incapacité de travail.
                </p>

                <p className="font-medium">Article 6 - Remboursement anticipé</p>
                <p>
                  L'Emprunteur a la faculté de rembourser par anticipation tout ou partie du prêt. Une indemnité de
                  remboursement anticipé de 3% du capital restant dû sera appliquée.
                </p>
              </div>

              <div className="mb-6 space-y-2">
                <p className="font-medium">Fait à Paris, le {new Date().toLocaleDateString()}</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Le Prêteur :</p>
                    <p>Signature</p>
                  </div>
                  <div>
                    <p className="font-medium">L'Emprunteur :</p>
                    <p>Signature</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push(`/banker/applications/${applicationId}`)}>
              Retour
            </Button>
            <div className="space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSign}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Signer le contrat
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Contrat signé</CardTitle>
            <CardDescription>Le contrat a été signé avec succès</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center rounded-md border border-green-200 bg-green-50 p-8">
              <div className="text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
                <h2 className="mt-4 text-xl font-bold text-green-800">Contrat signé avec succès</h2>
                <p className="mt-2 text-green-700">Le contrat a été signé et envoyé au client pour signature.</p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md border p-4">
              <div className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Contrat de prêt signé</p>
                  <p className="text-sm text-gray-500">PDF, 1.2 MB</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push(`/banker/applications/${applicationId}`)}>
              Retour aux détails
            </Button>
            <Button onClick={() => router.push("/banker/applications")}>Retour à la liste</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
