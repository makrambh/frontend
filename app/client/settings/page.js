"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { User, Lock, Bell, Shield } from "lucide-react"

export default function ClientSettings() {
  const { toast } = useToast()

  const [personalInfo, setPersonalInfo] = useState({
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@example.com",
    tel: "0612345678",
    adresse: "123 Rue de Paris, 75001 Paris",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    nouvelleDemande: true,
    miseAJourDemande: true,
    offresSpeciales: false,
  })

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name, checked) => {
    setNotifications((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSavePersonalInfo = (e) => {
    e.preventDefault()
    toast({
      title: "Informations mises à jour",
      description: "Vos informations personnelles ont été mises à jour avec succès.",
    })
  }

  const handleSavePassword = (e) => {
    e.preventDefault()
    toast({
      title: "Mot de passe mis à jour",
      description: "Votre mot de passe a été mis à jour avec succès.",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Préférences mises à jour",
      description: "Vos préférences de notification ont été mises à jour avec succès.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-500">Gérez vos informations personnelles et vos préférences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informations personnelles
              </CardTitle>
              <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
            </CardHeader>
            <form onSubmit={handleSavePersonalInfo}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input id="nom" name="nom" value={personalInfo.nom} onChange={handlePersonalInfoChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input
                      id="prenom"
                      name="prenom"
                      value={personalInfo.prenom}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tel">Téléphone</Label>
                  <Input id="tel" name="tel" value={personalInfo.tel} onChange={handlePersonalInfoChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adresse">Adresse</Label>
                  <Input
                    id="adresse"
                    name="adresse"
                    value={personalInfo.adresse}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Enregistrer les modifications
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Sécurité
              </CardTitle>
              <CardDescription>Mettez à jour votre mot de passe</CardDescription>
            </CardHeader>
            <form onSubmit={handleSavePassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input id="currentPassword" type="password" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input id="newPassword" type="password" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                  <Input id="confirmPassword" type="password" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Mettre à jour le mot de passe
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Authentification à deux facteurs
              </CardTitle>
              <CardDescription>Renforcez la sécurité de votre compte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Authentification par SMS</p>
                  <p className="text-sm text-gray-500">Recevez un code de vérification par SMS lors de la connexion</p>
                </div>
                <Switch id="2fa-sms" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Authentification par email</p>
                  <p className="text-sm text-gray-500">
                    Recevez un code de vérification par email lors de la connexion
                  </p>
                </div>
                <Switch id="2fa-email" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Préférences de notification
              </CardTitle>
              <CardDescription>Gérez vos préférences de notification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Canaux de notification</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications par email</p>
                    <p className="text-sm text-gray-500">Recevez des notifications par email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications par SMS</p>
                    <p className="text-sm text-gray-500">Recevez des notifications par SMS</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Types de notification</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Nouvelle demande</p>
                    <p className="text-sm text-gray-500">Notifications concernant les nouvelles demandes</p>
                  </div>
                  <Switch
                    id="new-application-notifications"
                    checked={notifications.nouvelleDemande}
                    onCheckedChange={(checked) => handleNotificationChange("nouvelleDemande", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mise à jour de demande</p>
                    <p className="text-sm text-gray-500">Notifications concernant les mises à jour de vos demandes</p>
                  </div>
                  <Switch
                    id="application-update-notifications"
                    checked={notifications.miseAJourDemande}
                    onCheckedChange={(checked) => handleNotificationChange("miseAJourDemande", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Offres spéciales</p>
                    <p className="text-sm text-gray-500">Notifications concernant les offres spéciales</p>
                  </div>
                  <Switch
                    id="special-offers-notifications"
                    checked={notifications.offresSpeciales}
                    onCheckedChange={(checked) => handleNotificationChange("offresSpeciales", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications} className="bg-blue-600 hover:bg-blue-700">
                Enregistrer les préférences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
