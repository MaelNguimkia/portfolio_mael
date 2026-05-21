# Portfolio Maël Tchinda — React v2

Portfolio professionnel React.js avec design sombre, animations, WhatsApp, GitHub et modal CV.

---

## 🚀 Installation rapide

```bash
# 1. Créer le projet Vite
npm create vite@latest mon-portfolio -- --template react
cd mon-portfolio

# 2. Remplacer les fichiers
# → src/App.jsx  (remplacer par le fichier téléchargé)
# → src/App.css  (remplacer par le fichier téléchargé)
# → src/index.css → VIDER complètement ce fichier

# 3. Lancer
npm install
npm run dev
```

---

## ⚙️ Personnalisation (en haut de App.jsx)

```js
const CONFIG = {
  name:      "Maël Tchinda",
  initials:  "M.T",
  email:     "ton@email.com",
  whatsapp:  "237699XXXXXX",   // 237 = indicatif Cameroun + ton numéro sans 0
  github:    "https://github.com/ton-username",
  linkedin:  "https://linkedin.com/in/ton-profil",
  cv_url:    "https://drive.google.com/...",  // Lien Google Drive de ton CV
};
```

### Ajouter ta photo
Dans le composant `About`, remplace `<div className="photo-placeholder">` par :
```jsx
<img
  src="/photo.jpg"
  alt="Maël Tchinda"
  style={{ width:'200px', height:'260px', objectFit:'cover', borderRadius:'18px' }}
/>
```
Place `photo.jpg` dans le dossier `public/`.

### Ajouter les liens de tes projets
Dans le tableau `PROJECTS`, chaque projet a un champ `link: ""`.
Mets l'URL de ton projet en ligne. Si vide → affiche "Projet privé".

---

## 🌐 Déploiement (gratuit)

### Vercel — recommandé
```bash
npm run build
npx vercel --prod
```
Ou importer directement depuis GitHub sur https://vercel.com

### Netlify
```bash
npm run build
# Glisse le dossier dist/ sur https://app.netlify.com/drop
```

---

## ✉️ Formulaire de contact fonctionnel

Pour recevoir les messages par email, utilise **EmailJS** (gratuit) :
```bash
npm install @emailjs/browser
```
Puis dans la fonction `handleSubmit` du composant `Contact` :
```js
import emailjs from '@emailjs/browser';
emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY');
```
Crée un compte sur https://emailjs.com pour obtenir les IDs.

---

## 📁 Structure

```
src/
├── App.jsx   ← Tous les composants + données
├── App.css   ← Tous les styles
└── main.jsx  ← Point d'entrée (ne pas modifier)
```