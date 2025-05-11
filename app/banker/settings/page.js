"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { User, Lock, Bell, Settings, Shield } from "lucide-react"

export default function BankerSettings() {
  const { toast } = useToast()

  const [personalInfo, setPersonalInfo] = useState({
    nom: "Martin",
    prenom: "Jean",
    email: "jean.martin@banque.com",
    tel: "0612345678",
    poste: "Conseiller crédit",
    agence: "Paris Centre",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    nouvelleDemande: true,
    messageClient: true,
    rappelTache: true,
  })

  const [preferences, setPreferences] = useState({
    theme: "light",
    langue: "fr",
    nombreResultatsParPage: "10",
  })

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name, checked) => {
    setNotifications((prev) => ({ ...prev, [name]: checked }))
  }

  const handlePreferenceChange = (name, value) => {
    setPreferences((prev) => ({ ...prev, [name]: value }))
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

  const handleSavePreferences = () => {
    toast({
      title: "Préférences mises à jour",
      description: "Vos préférences d'affichage ont été mises à jour avec succès.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-500">Gérez vos informations personnelles et vos préférences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
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

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="poste">Poste</Label>
                    <Input
                      id="poste"
                      name="poste"
                      value={personalInfo.poste}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agence">Agence</Label>
                    <Input
                      id="agence"
                      name="agence"
                      value={personalInfo.agence}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Enregistrer les modifications</Button>
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
                <Button type="submit">Mettre à jour le mot de passe</Button>
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
                <Switch id="2fa-sms" defaultChecked />
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
                    <p className="font-medium">Nouvelles demandes</p>
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
                    <p className="font-medium">Messages clients</p>
                    <p className="text-sm text-gray-500">Notifications concernant les messages des clients</p>
                  </div>
                  <Switch
                    id="client-message-notifications"
                    checked={notifications.messageClient}
                    onCheckedChange={(checked) => handleNotificationChange("messageClient", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Rappels de tâches</p>
                    <p className="text-sm text-gray-500">Notifications concernant les tâches à effectuer</p>
                  </div>
                  <Switch
                    id="task-reminder-notifications"
                    checked={notifications.rappelTache}
                    onCheckedChange={(checked) => handleNotificationChange("rappelTache", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>Enregistrer les préférences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Préférences d'affichage
              </CardTitle>
              <CardDescription>Personnalisez votre expérience utilisateur</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Thème</Label>
                  <Select value={preferences.theme} onValueChange={(value) => handlePreferenceChange("theme", value)}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Sélectionner un thème" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="langue">Langue</Label>
                  <Select value={preferences.langue} onValueChange={(value) => handlePreferenceChange("langue", value)}>
                    <SelectTrigger id="langue">
                      <SelectValue placeholder="Sélectionner une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">Anglais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nombreResultatsParPage">Nombre de résultats par page</Label>
                  <Select
                    value={preferences.nombreResultatsParPage}
                    onValueChange={(value) => handlePreferenceChange("nombreResultatsParPage", value)}
                  >
                    <SelectTrigger id="nombreResultatsParPage">
                      <SelectValue placeholder="Sélectionner un nombre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePreferences}>Enregistrer les préférences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
