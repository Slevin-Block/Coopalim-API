# **Gestion de tâches - COOPALIM**

## **Présentation**

L'objectif est de réaliser en deux parties, un système de gestion de tâches pour administrer les inscriptions aux différentes tâches qui rythment l'activité de [Coopalim](https://www.coopalimstrasbourg.com/ "site de Coopalim"). 

A défaut d'avoir un outil de gestion plus efficace, les coordinateurs de la structure gèrent actuellement sur un fichier tableur partagé l'ensemble des inscriptions de leurs membres à chaque *créneau de tâche*, tel que :

* Préparation vente 1h30
* Vente 3h
* Livraisons 1h30
* Aide vente-livraison 3h
* ...

Ils ont donc *besoin* d'un outil leur permettant de :
1. Pouvoir administrer simplement les tâches et les membres (CRUD)
2. Pouvoir inscrire ou désinscrire les membres
3. Pouvoir suivre facilement les différents créneaux

Pour cela ils *souhaiteraient* :
1. Une même plateforme pour l'administration et l'utilisation de la plateforme
2. Une version facilement maintenable et améliorable de la plateforme
3. Une version accessible sur mobile (surtout pour les membres, lors de l'inscription libre)
4. Interdire la possibilité aux membres de se créer un compte sur la plateforme
5. Interdire la possibilité aux membres de se désinscrire d'un créneau (ces derniers doivent passer par eux pour la désinscription d'un créneau)

---
## **Proposition**

Afin de répondre à l'ensemble des besoins, et en lien avec le référent numérique de la structure, j'ai développé :
1. Un backend sans dashbord, `API` type `REST`, développée en `JS Node` 
2. Une base de données `MongoDB` dont l'API gère la connexion
3. Un `site front React` avec une `partie administration` complète pour les coordinateurs (CRUD complet users / task / rule / attributions) et une `partie membre` uniquement pour consulter et s'inscrire aux tâches.
4. Une `gestion de l'authentification` avec `Access Token, Refresh Token avec rotation` (comme conseiller sur le [site auth0](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/ "Access & Refresh Token Rotation"))

---
## Suite du projet
Le projet est dans sa première version mais nécessite encore des améliorations pour pouvoir être pleinement utiliser :
1. La conception du manifest pour transformer le site en PWA
2. L'ajout des autres fonctionnalités du user-story
3. Les tests

Ces parties seront réalisées par la suite par l'équipe numérique de la structure.

---
## **L'API**
L'API a été réalisée sous node v18.12.0 et est organisée comme suit :
* un fichier `.env` est nécéssaire et contient les informations suivantes :

        MODE_ENV = 

        # SERVER PARAMS
        MYHOSTNAME = 
        PORT = 

        # SECRETS TO GENERATE AND VERIFY AUTH JWT AND REFRESH JWT
        ACCESS_TOKEN_SECRET = 
        ACCESS_TOKEN_DURATION =  # DURATION IN HOURS
        REFRESH_TOKEN_SECRET = 
        REFRESH_TOKEN_DURATION =  # DURATION IN DAY

        # BDD PARAMS
        DBURL = 
        MYSECRET=
        DBNAME = 

* un répertoire `config` assurant la `connection à la DB`
* un répertoire `controllers` contenants l'ensemble des controllers CRUD
* un répertoire `middlewares` assurant la gestion des authentifications
    * valid user
    * token accepted
    * isAdmin
* un répertoire `models` contenant les différents modèles de la base de données
* un répetoire `routes` contenant l'ensemble des routes vers les endpoints, séparées par endpoints avec Nested Routes
* un répertoire `utils` contenants des fonctions génériques pour :
    * la transformation d'objets
    * la création/traitement des JWT d'authentification

Elle se lance avec la commande **`npm run server`**

---
## **Dépendances**
Voici la liste des dépendances de l'API :
* bcrypt: 5.1.0
* cors: 2.8.5
* dotenv: 16.0.3
* express: 4.18.2
* jsonwebtoken: 9.0.0
* mongoose: 6.8.1
* nodemon: 2.0.20

---
## **Documentation**

Dans le répertoire _Readme se trouve les principaux éléments de base de travail :
- Les endpoints de l'API
- Le système d'Authentification mise en place
- Le modèle de Base de Données



