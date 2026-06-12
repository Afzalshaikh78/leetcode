<<<<<<< HEAD
# LeetCode Clone

A modern LeetCode-style coding platform built with Next.js, Prisma, Clerk, and PostgreSQL. Users can browse problems, solve them in the built-in editor, track submissions, organize playlists, and view profile analytics like streaks and activity history.


Codesprint<img width="1885" height="856" alt="Screenshot 2026-06-03 224823" src="https://github.com/user-attachments/assets/72e0c044-5481-463f-ab86-396a45b010f7" />

Live preview:https://codesprint-1w2pp7pn4-afzals-projects-c2524272.vercel.app/

A modern LeetCode-style coding platform built with Next.js, Prisma, Clerk, and PostgreSQL. Users can browse problems, solve them in the built-in editor, track submissions, organize playlists, and view profile analytics like streaks and activity history.

>>>>>>> f92fd3f2d8bf2a8de56f8fa84ad822ac81911e28
## Features

- Authenticated user flows with Clerk
- Problem browsing, filtering, and pagination
- In-browser code editor and code execution
- Submission history and solved-problem tracking
- Playlist creation and problem organization
- Profile page with coding streak analytics
- Admin-only problem creation flow
- Responsive UI with mobile navigation

## Tech Stack

- [Next.js 16](https://nextjs.org)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Prisma](https://www.prisma.io)
- [PostgreSQL](https://www.postgresql.org)
- [Clerk](https://clerk.com)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Judge0](https://judge0.com) for code execution

## Prerequisites

Before running the app, make sure you have:

- Node.js 20 or later
- A PostgreSQL database
- Clerk credentials
- Judge0 credentials or a configured Judge0 endpoint

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root and add the required environment variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# Add any Judge0 env vars used by lib/judge0.ts
# Example:
# JUDGE0_API_URL="https://your-judge0-instance.com"
# JUDGE0_API_KEY="your_api_key"
```

3. Generate the Prisma client:

```bash
npm run build
```

The build script already runs `prisma generate` before `next build`, so this is the easiest way to ensure your generated client is ready.

4. Start the development server:

```bash
npm run dev
```

5. Open the app:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - start the local development server
- `npm run build` - generate Prisma client and build the app
- `npm run start` - start the production server
- `npm run lint` - run ESLint

## Project Structure

- `app/` - Next.js app router pages, layouts, and API routes
- `components/` - shared UI and design-system components
- `lib/` - database, utility, and Judge0 integration helpers
- `modules/` - feature-based application logic and UI
- `prisma/` - schema and migrations

## Database

This project uses Prisma with PostgreSQL.

If you change the Prisma schema, run:

```bash
npx prisma generate
```

If you use migrations, deploy them with:

```bash
npx prisma migrate deploy
```

## Deployment on Vercel

This project is ready for Vercel deployment.

### Required environment variables

Add these in the Vercel project settings:

- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- any Judge0-related variables used by the app

### Build behavior

The repository is configured so Vercel will:

- run `prisma generate` during install/build
- build the Next.js app with the correct Prisma client available
- render auth-dependent routes dynamically instead of forcing static generation

### Deployment steps

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the repo into Vercel.
3. Add the required environment variables.
4. Deploy.
5. Verify the production app by logging in, opening the problems page, submitting code, and checking the profile page.

## Notes

- The app uses Clerk-protected routes, so make sure your Vercel domain is added to your Clerk allowed domains.
- If you change image hosts or use external avatars, update `next.config.ts` as needed.
- Keep your production database reachable from Vercel.

## License

<<<<<<< HEAD
No license has been specified yet.
=======
No license has been specified yet. 
>>>>>>> f92fd3f2d8bf2a8de56f8fa84ad822ac81911e28
