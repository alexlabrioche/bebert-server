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
