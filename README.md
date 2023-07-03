// Server-side rendering (SSR) allows you to pre-render your 
// pages with data fetched from external 
// sources or APIs, providing better performance and SEO optimization.

// This pre-rendering process allows the server to generate the HTML 
// content of the pages and include the necessary data before sending them to the clients.

 ------------------------ VS ------------------------

// Client-Side Rendering (CSR), the client's device or browser needs to download 
// the JavaScript bundle and execute it to render the page.

npx create-next-app@latest ./

1. Create Home, layout, Navbar, Footer.
2. Create grafbase config and connect to grafbase. 
3. Create env file with API endpoint and Key.
4. Create AuthProviders, lib file and session.ts file, [...nextauth] router file.
5. Inside session, connect to github auth.
6. Create the getCurrentUser function inside seesion file and call it in Navbar with SSR approach.
7. Inside lib folder, create action.ts file.
8. Separate production and localhost api call.
9. While creating getUser function, create graphql folder to write queries.
10. Once create getUser function, use it in the sesstion.ts file. Call the functions you created in the session file.
11. Inside grafbase.config.ts file, create jwt NEXTAUTH_SECRET.
12. Create create-project page, Modal, ProjectForm. Clicking outside to close the modal in create-project page.
13. Create ProjectForm
