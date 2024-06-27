# Générateur de Formulaires Avancé

Ce projet est une application Next.js permettant de créer, modifier et gérer des formulaires dynamiques. Il utilise `react-beautiful-dnd` pour le glisser-déposer des champs de formulaire.

## Fonctionnalités Principales

- **Création de Formulaires** : Ajoutez des champs de différents types (texte, email, nombre, date, etc.) à vos formulaires.
- **Modification de Formulaires** : Modifiez les champs existants et réorganisez-les par glisser-déposer.
- **Gestion des Réponses** : Enregistrez et affichez les réponses soumises pour chaque formulaire.
- **Stockage Local** : Les formulaires et les réponses sont stockés dans le `localStorage` du navigateur.

## Structure des Fichiers

### `components`

- **Header.tsx** : Composant d'en-tête affichant le titre de l'application.
- **FieldChoice.tsx** : Composant permettant de choisir et configurer les champs à ajouter au formulaire.
- **GeneratedForm.tsx** : Composant affichant le formulaire généré avec les champs ajoutés.
- **GeneratedField.tsx** : Composant représentant un champ individuel dans le formulaire généré.
- **FormList.tsx** : Composant affichant la liste des formulaires créés.
- **AnswereList.tsx** : Composant affichant la liste des réponses soumises pour un formulaire.
- **PrewievBox.tsx** : Composant permettant de prévisualiser le formulaire en cours de création ou de modification.

### `app/page.tsx`

Ce fichier contient le composant principal de la page d'accueil. Il gère l'état de l'application, y compris la vue actuelle (prévisualisation, liste des formulaires, liste des réponses), et rend les composants appropriés en fonction de cette vue.

### `lib`

- **utils.ts** : Contient des fonctions utilitaires et des types utilisés dans l'application, comme `generateUniqueId`, `initializeField`, et `validateField`.

## Démarrage

Pour démarrer le serveur de développement :

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

# Advanced Form Generator

This project is a Next.js application that allows you to create, modify, and manage dynamic forms. It uses `react-beautiful-dnd` for drag-and-drop form fields.

## Main Features

- **Form Creation**: Add fields of various types (text, email, number, date, etc.) to your forms.
- **Form Modification**: Modify existing fields and rearrange them via drag-and-drop.
- **Response Management**: Save and display submitted responses for each form.
- **Local Storage**: Forms and responses are stored in the browser's `localStorage`.

## File Structure

### `components`

- **Header.tsx**: Header component displaying the application title.
- **FieldChoice.tsx**: Component for choosing and configuring fields to add to the form.
- **GeneratedForm.tsx**: Component displaying the generated form with added fields.
- **GeneratedField.tsx**: Component representing an individual field in the generated form.
- **FormList.tsx**: Component displaying the list of created forms.
- **AnswereList.tsx**: Component displaying the list of submitted responses for a form.
- **PrewievBox.tsx**: Component for previewing the form being created or modified.

### `app/page.tsx`

This file contains the main component of the homepage. It manages the application's state, including the current view (preview, form list, response list), and renders the appropriate components based on this view.

### `lib`

- **utils.ts**: Contains utility functions and types used in the application, such as `generateUniqueId`, `initializeField`, and `validateField`.

## Getting Started

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
