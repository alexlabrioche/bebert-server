# Bebert Server

## Features

##### public Resolvers

- [x] Sign Up / Sign In avec Facebook
- [x] Sign In avec Email
- [x] Commencer la vérification de mon numéro de téléphone
- [x] Valider la vérification de mon numéro de téléphone
- [x] Sign Up avec Email

##### authentification

- [x] Generate token
- [x] Verify token

##### private Resolvers

- [x] Vérifier l'email
- [x] Voir mon profil
- [x] Mettre à jour mon profil
- [ ] Activer mode Conducteur
- [ ] Report Location/Orientation
- [ ] Ajouter une Place
- [ ] Modifer une Place
- [ ] Supprimer une Place
- [ ] Voir les Drivers proches
- [ ] Souscrire au Drivers proche (GQL Subscribe)
- [ ] Soumettre une course
- [ ] Voir les demandes de courses proches
- [ ] Souscrire aux demandes de courses proches
- [ ] Souscrire aux statut d'une course
- [ ] Acceder a la Chat Room
- [ ] Souscrire au Messages du Chat
- [ ] Envoyer des Messages sur le Chat

##### Challenges

- [ ] Voir l'historique des courses
- [ ] Voir le détails des courses

## Step by Step

### Part 1

- création du serveur graphQL Yoga
- ajout des fichiers de config et lint pour typescript
- ajout de scripts pour generer les schemas et resolvers (voir package.json => pretypes, types)

### Part 2

- configuration base de données postgres
- ajout des modèles GraphQL de User, Ride, Place, et Verification
- ajout des modèles pour la messagerie en temps réel Message et Chat et configuration des relations
  OneToMany et ManyToOne
- ajout des générateurs d'entités pour les tables postgres

##### Tableau des relations

| USER                   | PLACE | RIDE                      | CHAT               | MESSAGE        | VERIFICATION   |
| ---------------------- | ----- | ------------------------- | ------------------ | -------------- | -------------- |
| oneToMany rideAs...    |       | manyToOne passenger(User) | oneToMany users    | manyToOne chat | manyToOne user |
| oneToMany messages     |       | manyToOne driver(User)    | oneToMany messages | manyToOne User |                |
| oneToMany verification |       |                           |                    |                |                |
| manyToOne chat         |       |                           |                    |                |                |
