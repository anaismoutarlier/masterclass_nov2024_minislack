### Minislack

This is a Next.js project that integrates _Firebase_ for user authentification and instant messaging and _React Context_ for state management.

To get started with this project,

1. Go to [firebase.google.com](https://firebase.google.com) and create a new project.

2. Within your project, create an application using the _Web App_ option (**</>**).

3. Copy the configuration for your application into the `.env.local.example` file.

4. Enable the _Authentication_ module for the project and select the Google provider. (Optional: Add the Facebook provider and configure your Facebook account in the [Meta developer's console](https://developers.facebook.com/)).

**Note:** If your deploy this project, make sure to add the domain name of your production application to the list of _Authorized Domains_ for Firebase Authentication.

5. Enable the _Cloud Firestore_ module for the project.

6. Run the application from the terminal using one of the following commands:

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
