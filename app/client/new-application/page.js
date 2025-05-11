"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Upload, ArrowLeft, ArrowRight } from "lucide-react"

export default function NewApplication() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Étape 1: Informations personnelles
    nom: "",
    prenom: "",
    dateNaissance: "",
    etatCivil: "",
    cin: "",
    adresse: "",
    tel: "",
    email: "",
    cinFile: null,
    cinVerified: false,

    // Étape 2: Informations professionnelles
    profession: "",
    typeContrat: "",
    employeur: "",
    ancienneteMois: "",
    attestationTravailFile: null,
    fichePayeFile: null,

    // Étape 3: Informations financières
    revenusMensuelsNet: "",
    autresRevenusMensuels: "",
    nbrPersonnesEnCharge: "",
    chargesLoyer: "",
    chargesCreditEnCours: "",
    incidentsRejetsPrelevement: false,
    incidentsDecouvertsNonAutorises: false,
    incidentsRejetCredit: false,
    nomBanque: "",
    releveCompteFile: null,

    // Étape 4: Crédit souhaité
    objetFinancement: "",
    montantSouhaite: "",
    dureeSouhaiteeMois: "",
    apportPersonnel: "",
  })

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target

    if (type === "file" && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }))

      // Simuler la vérification des documents
      if (name === "cinFile") {
        simulateDocumentVerification("cin")
      } else if (name === "releveCompteFile") {
        simulateDocumentVerification("releveCompte")
      }
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const simulateDocumentVerification = (docType) => {
    // Simuler un appel API pour vérifier le document
    setTimeout(() => {
      if (docType === "cin") {
        setFormData((prev) => ({ ...prev, cinVerified: true }))
        toast({
          title: "Document vérifié",
          description: "Votre CIN a été vérifiée avec succès.",
          variant: "success",
        })
      } else if (docType === "releveCompte") {
        toast({
          title: "Relevé de compte analysé",
          description: "Votre relevé de compte a été analysé avec succès.",
          variant: "success",
        })
      }
    }, 1500)
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simuler l'envoi des données à l'API
    toast({
      title: "Demande soumise",
      description: "Votre demande de crédit a été soumise avec succès.",
      variant: "success",
    })

    // Rediriger vers la page des demandes
    setTimeout(() => {
      router.push("/client/applications")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nouvelle demande de crédit</h1>
        <p className="text-gray-500">Remplissez le formulaire en 5 étapes</p>
      </div>

      <Tabs value={`step-${currentStep}`} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="step-1" disabled={currentStep !== 1}>
            1. Infos personnelles
          </TabsTrigger>
          <TabsTrigger value="step-2" disabled={currentStep !== 2}>
            2. Infos professionnelles
          </TabsTrigger>
          <TabsTrigger value="step-3" disabled={currentStep !== 3}>
            3. Infos financières
          </TabsTrigger>
          <TabsTrigger value="step-4" disabled={currentStep !== 4}>
            4. Crédit souhaité
          </TabsTrigger>
          <TabsTrigger value="step-5" disabled={currentStep !== 5}>
            5. Récapitulatif
          </TabsTrigger>
        </TabsList>

        {/* Étape 1: Informations personnelles */}
        <TabsContent value="step-1">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>Veuillez saisir vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dateNaissance">Date de naissance</Label>
                  <Input
                    id="dateNaissance"
                    name="dateNaissance"
                    type="date"
                    value={formData.dateNaissance}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="etatCivil">État civil</Label>
                  <Select onValueChange={(value) => handleSelectChange("etatCivil", value)} value={formData.etatCivil}>
                    <SelectTrigger id="etatCivil">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="celibataire">Célibataire</SelectItem>
                      <SelectItem value="marie">Marié(e)</SelectItem>
                      <SelectItem value="divorce">Divorcé(e)</SelectItem>
                      <SelectItem value="veuf">Veuf/Veuve</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cin">Numéro CIN</Label>
                <Input id="cin" name="cin" value={formData.cin} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Textarea id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tel">Téléphone</Label>
                  <Input id="tel" name="tel" value={formData.tel} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cinFile">Upload CIN</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="cinFile"
                    name="cinFile"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleChange}
                    required
                  />
                  {formData.cinVerified && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      <span className="text-sm">Vérifié</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={nextStep}>
                Suivant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Étape 2: Informations professionnelles */}
        <TabsContent value="step-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations professionnelles</CardTitle>
              <CardDescription>Veuillez saisir vos informations professionnelles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profession">Profession</Label>
                <Input id="profession" name="profession" value={formData.profession} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="typeContrat">Type de contrat</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("typeContrat", value)}
                  value={formData.typeContrat}
                >
                  <SelectTrigger id="typeContrat">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cdi">CDI</SelectItem>
                    <SelectItem value="cdd">CDD</SelectItem>
                    <SelectItem value="interim">Intérim</SelectItem>
                    <SelectItem value="independant">Indépendant</SelectItem>
                    <SelectItem value="fonctionnaire">Fonctionnaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeur">Employeur</Label>
                <Input id="employeur" name="employeur" value={formData.employeur} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ancienneteMois">Ancienneté (en mois)</Label>
                <Input
                  id="ancienneteMois"
                  name="ancienneteMois"
                  type="number"
                  value={formData.ancienneteMois}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attestationTravailFile">Upload Attestation de travail</Label>
                <Input
                  id="attestationTravailFile"
                  name="attestationTravailFile"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fichePayeFile">Upload Fiche de paie</Label>
                <Input
                  id="fichePayeFile"
                  name="fichePayeFile"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>
              <Button onClick={nextStep}>
                Suivant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Étape 3: Informations financières */}
        <TabsContent value="step-3">
          <Card>
            <CardHeader>
              <CardTitle>Informations financières</CardTitle>
              <CardDescription>Veuillez saisir vos informations financières</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="revenusMensuelsNet">Revenus mensuels nets (€)</Label>
                  <Input
                    id="revenusMensuelsNet"
                    name="revenusMensuelsNet"
                    type="number"
                    value={formData.revenusMensuelsNet}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autresRevenusMensuels">Autres revenus mensuels (€)</Label>
                  <Input
                    id="autresRevenusMensuels"
                    name="autresRevenusMensuels"
                    type="number"
                    value={formData.autresRevenusMensuels}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nbrPersonnesEnCharge">Nombre de personnes à charge</Label>
                <Input
                  id="nbrPersonnesEnCharge"
                  name="nbrPersonnesEnCharge"
                  type="number"
                  value={formData.nbrPersonnesEnCharge}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="chargesLoyer">Charges loyer (€/mois)</Label>
                  <Input
                    id="chargesLoyer"
                    name="chargesLoyer"
                    type="number"
                    value={formData.chargesLoyer}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chargesCreditEnCours">Charges crédit en cours (€/mois)</Label>
                  <Input
                    id="chargesCreditEnCours"
                    name="chargesCreditEnCours"
                    type="number"
                    value={formData.chargesCreditEnCours}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Incidents bancaires</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="incidentsRejetsPrelevement"
                      name="incidentsRejetsPrelevement"
                      checked={formData.incidentsRejetsPrelevement}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="incidentsRejetsPrelevement" className="text-sm font-normal">
                      Rejets de prélèvement
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="incidentsDecouvertsNonAutorises"
                      name="incidentsDecouvertsNonAutorises"
                      checked={formData.incidentsDecouvertsNonAutorises}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="incidentsDecouvertsNonAutorises" className="text-sm font-normal">
                      Découverts non autorisés
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="incidentsRejetCredit"
                      name="incidentsRejetCredit"
                      checked={formData.incidentsRejetCredit}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="incidentsRejetCredit" className="text-sm font-normal">
                      Rejet de crédit
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomBanque">Nom de votre banque</Label>
                <Input id="nomBanque" name="nomBanque" value={formData.nomBanque} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="releveCompteFile">Upload Relevé de compte</Label>
                <Input
                  id="releveCompteFile"
                  name="releveCompteFile"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>
              <Button onClick={nextStep}>
                Suivant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Étape 4: Crédit souhaité */}
        <TabsContent value="step-4">
          <Card>
            <CardHeader>
              <CardTitle>Crédit souhaité</CardTitle>
              <CardDescription>Veuillez saisir les informations concernant le crédit souhaité</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="objetFinancement">Objet du financement</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("objetFinancement", value)}
                  value={formData.objetFinancement}
                >
                  <SelectTrigger id="objetFinancement">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immobilier">Immobilier</SelectItem>
                    <SelectItem value="automobile">Automobile</SelectItem>
                    <SelectItem value="travaux">Travaux</SelectItem>
                    <SelectItem value="consommation">Consommation</SelectItem>
                    <SelectItem value="professionnel">Professionnel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="montantSouhaite">Montant souhaité (€)</Label>
                  <Input
                    id="montantSouhaite"
                    name="montantSouhaite"
                    type="number"
                    value={formData.montantSouhaite}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dureeSouhaiteeMois">Durée souhaitée (mois)</Label>
                  <Input
                    id="dureeSouhaiteeMois"
                    name="dureeSouhaiteeMois"
                    type="number"
                    value={formData.dureeSouhaiteeMois}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apportPersonnel">Apport personnel (€)</Label>
                <Input
                  id="apportPersonnel"
                  name="apportPersonnel"
                  type="number"
                  value={formData.apportPersonnel}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>
              <Button onClick={nextStep}>
                Suivant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Étape 5: Récapitulatif */}
        <TabsContent value="step-5">
          <Card>
            <CardHeader>
              <CardTitle>Récapitulatif de votre demande</CardTitle>
              <CardDescription>Veuillez vérifier les informations avant de soumettre votre demande</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Analyse financière</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        Votre demande sera analysée par notre système et un conseiller bancaire. Vous recevrez une
                        réponse dans les plus brefs délais.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informations personnelles</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nom</p>
                    <p>{formData.nom}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Prénom</p>
                    <p>{formData.prenom}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date de naissance</p>
                    <p>{formData.dateNaissance}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">État civil</p>
                    <p>{formData.etatCivil}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informations professionnelles</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Profession</p>
                    <p>{formData.profession}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type de contrat</p>
                    <p>{formData.typeContrat}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Employeur</p>
                    <p>{formData.employeur}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ancienneté (mois)</p>
                    <p>{formData.ancienneteMois}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Crédit souhaité</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Objet du financement</p>
                    <p>{formData.objetFinancement}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Montant souhaité</p>
                    <p>{formData.montantSouhaite} €</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Durée souhaitée</p>
                    <p>{formData.dureeSouhaiteeMois} mois</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Apport personnel</p>
                    <p>{formData.apportPersonnel} €</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Documents vérifiés</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Tous vos documents ont été correctement téléchargés et vérifiés.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                <Upload className="mr-2 h-4 w-4" />
                Soumettre la demande
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
