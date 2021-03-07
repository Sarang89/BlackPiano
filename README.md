# BlackPiano
1. Architectural Considerations: 
1.1. The domain layer is not dependant on the database technology or the front-end technology, so it can be reused with minimal or no changes. 
1.2. The presentation layer is used for making changes for the ever changing UI so the logic remains mainly unaffected.  

2. Setup:
2.1. Have provided a back-door to create the user initally. Credentials (email: admin@blackpiano.com, password: bLACKpIANO).A mongo script would be better.
2.2. .env file is needed. 

3. ".env" file should have the following keys
HTTP_PORT=NUMBER
DB_URL=mongodb://127.0.0.1/DATABASE_NAME
JWT_SECRET=SECRET  
