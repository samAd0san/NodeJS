# Configuration of verce.json
- "version": 2: Specifies the Vercel configuration file version.
- "builds": [...]: Defines the builds, which specify how your project should be built and deployed.
- "src": "routes.js": Specifies the source file for the serverless function.
- "use": "@vercel/node": Specifies the runtime environment for the serverless function as Node.js.
- "routes": [...]: Defines the routes, which specify how incoming requests should be handled.
- "src": "/(.*)": Specifies a regular expression for incoming request paths.
- "dest": "/": Specifies the destination for incoming requests, mapping them to the root directory.