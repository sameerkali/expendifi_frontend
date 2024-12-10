# Project Structure

This repository follows a scalable Next.js App Router structure, suitable for a partner-side application  that includes public signup/login, protected dashboards, profile management, and ad management. It is designed with SEO and performance in mind, using components, hooks, and libraries that ensure clean code organization and maintainability.

```text
project/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ metadata.ts
│  ├─ (public-routes)/
│  │  ├─ signup/
│  │  │  ├─ page.tsx
│  │  │  ├─ SignUpForm.tsx
│  │  ├─ login/
│  │  │  ├─ page.tsx
│  │  │  ├─ LoginForm.tsx
│  ├─ (protected)/
│  │  ├─ dashboard/
│  │  │  ├─ page.tsx               // Landing after login
│  │  │  ├─ AddPostForm.tsx
│  │  ├─ profile/
│  │  │  ├─ page.tsx               // View profile
│  │  │  ├─ EditProfileForm.tsx
│  │  │  ├─ ProfileDetails.tsx
│  │  ├─ ads/
│  │  │  ├─ page.tsx               // List of ads created
│  │  │  ├─ [adId]/
│  │  │  │  ├─ page.tsx            // View specific ad
│  │  │  │  ├─ EditAdForm.tsx
│  ├─ (auth)/
│  │  ├─ callback/
│  │  │  ├─ page.tsx               // Auth callback if needed
│  │  ├─ ...                        // Additional auth routes as required
│
├─ components/
│  ├─ ui/
│  │  ├─ Button.tsx
│  │  ├─ Input.tsx
│  │  ├─ Card.tsx
│  │  ├─ Modal.tsx
│  │  ├─ LoadingSpinner.tsx
│  ├─ forms/
│  │  ├─ FormWrapper.tsx            // Generic form wrapper for styling and validation
│  │  ├─ FormField.tsx              // Generic input with label, error display
│  ├─ layout/
│  │  ├─ Header.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Sidebar.tsx                // If a sidebar is needed after login
│
├─ lib/
│  ├─ auth.ts                       // Next-Auth (or Auth.js) config and providers
│  ├─ seo.ts                        // Default SEO configs with next-seo
│  ├─ validations/                  // Zod schemas for validation
│  │  ├─ userSchema.ts
│  │  ├─ postSchema.ts
│  │  ├─ profileSchema.ts
│  ├─ api/                          // API helpers (e.g. axios instances, fetch wrappers)
│  │  ├─ authAPI.ts                 // Auth-related API calls
│  │  ├─ userAPI.ts                 // User/profile-related API calls
│  │  ├─ adsAPI.ts                  // Ad-related API calls
│
├─ hooks/
│  ├─ useAuth.ts                    // Hook to get auth user
│  ├─ useProtectedRoute.ts          // Hook to redirect if not logged in
│
├─ styles/
│  ├─ globals.css                   // Tailwind/reset and global styles
│  ├─ variables.css                 // CSS variables if needed
│
├─ public/                           // Public assets (images, icons)
│
├─ next-env.d.ts
├─ next.config.js
├─ package.json
└─ tsconfig.json
```
