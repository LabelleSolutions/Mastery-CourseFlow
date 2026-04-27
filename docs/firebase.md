# Firebase Setup Guide

This document describes how to configure Firebase for the Mastery-CourseFlow project.

## 1. Create a Firebase Project

1. Open [Firebase Console](https://console.firebase.google.com/) and click **Add project**.
2. Name it (e.g. `mastery-platform`) and follow the prompts.
3. Once created, go to **Project settings** → **Your apps** → click **Add app** → choose **Web**.
4. Register the app (e.g. `courseflow-web`). You will receive a config object.

## 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in the values from the Firebase config object:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_FIREBASE_API_KEY=<your apiKey>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your authDomain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your projectId>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your storageBucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your messagingSenderId>
NEXT_PUBLIC_FIREBASE_APP_ID=<your appId>
```

> **Note:** `.env.local` is already listed in `.gitignore`. Never commit real credentials.

## 3. Enable Authentication Providers

1. In Firebase Console, go to **Build → Authentication** and click **Get started**.
2. Under the **Sign-in method** tab, enable:
   - **Google** – click Google → toggle **Enable** → add a support email → **Save**.
   - **Email/Password** – click Email/Password → toggle **Enable** → **Save**.

## 4. Create Firestore Database

1. Go to **Build → Firestore Database** → **Create database**.
2. Choose **Start in test mode** for development (remember to add proper security rules before going to production).
3. Select a Cloud Firestore location closest to your users (e.g. `asia-southeast1` for Vietnam).

## 5. Enable Cloud Storage

1. Go to **Build → Storage** → **Get started**.
2. Accept the default security rules for now (tighten them before production).
3. Note the storage bucket URL — it should already be in your `.env.local` as `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`.

## 6. Using the Firebase Client Module

The client is initialised in `src/lib/firebase/client.ts`. Import from there:

```ts
import { auth, googleProvider, db, storage } from "@/lib/firebase/client";
```

### Sign in with Google (client component)

```tsx
"use client";

import { auth, googleProvider } from "@/lib/firebase/client";
import { signInWithPopup } from "firebase/auth";

export function SignInButton() {
  const handleSignIn = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  return <button onClick={handleSignIn}>Sign in with Google</button>;
}
```

### Sign in with Email/Password

```tsx
"use client";

import { auth } from "@/lib/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
```

### Read/Write Firestore

```ts
import { db } from "@/lib/firebase/client";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Write
await setDoc(doc(db, "users", uid), { displayName: "Alice" });

// Read
const snap = await getDoc(doc(db, "users", uid));
```

### Upload to Storage

```ts
import { storage } from "@/lib/firebase/client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storageRef = ref(storage, `users/${uid}/avatar.jpg`);
await uploadBytes(storageRef, file);
const url = await getDownloadURL(storageRef);
```

## 7. Recommended Environments

| Environment | Firebase project        |
|-------------|-------------------------|
| Development | `mastery-dev`           |
| Staging     | `mastery-staging`       |
| Production  | `mastery-prod`          |

Use separate `.env.local` files per environment (or CI/CD secrets) to point each deployment at the correct Firebase project.
