## Audio File Hosting Web Application

**Architecture**

- Frontend: React 18.3  
- Backend: Node.js 22 with Express.js 4.19  
- API: RESTful design  
- Data Storage: SQLite3 with Sequelize 6.37

**API Endpoints**

| POST /user/login | Authenticate the user |
| :---- | :---- |
| GET /user | Get all users’ information |
| POST /user | Create a new user |
| PUT /user | Update an existing user |
| DELETE /user | Delete a user |
| POST /file | Create a new file (record) |
| POST /file/listing | Get all files’ information (metadata only) |
| GET /file/{id} | Get a file’s information |

**Key Data Flow Paths**

1. Login → POST /user/login  
2. Displaying users → GET /user  
   1. Create User → POST /user → GET /user  
   2. Update User → PUT /user → GET /user  
   3. Delete User → DELETE /user → GET /user  
3. Displaying audio files → POST /file/listing  
   1. Create audio file → POST /file → POST /file/listing  
   2. Play audio file → GET /file/{id}

**Key Technical Decisions**

* Frontend State Management  
  * Redux manages global state across components, while React Hooks handles local state within components. This dual approach balances centralised control with component-level efficiency.  
* Backend Design  
  * Implemented a stateless backend architecture to facilitate horizontal scaling, allowing for easy expansion as demand grows.

* Database Choice  
  * SQLite3 with Sequelize ORM was selected for rapid development. The setup is designed for an easy transition to more robust databases as the application scales, ensuring future flexibility without major code changes.

**Future Roadmap**

Technical Enhancements

* API Security Enhancement  
    - Implement JWT (JSON Web Tokens) authentication for the RESTful API.  
    - Utilise JWT payload for user identification instead of request body to mitigate unauthorised data manipulation.  
* File Management Optimization  
    - Implement persistent storage solutions for audio files to improve performance.  
    - Introduce file streaming for audio content to optimise server memory usage.  
* Database Performance Upgrade  
    - Evaluate migration to MSSQL or MySQL to support higher concurrent operations and improve scalability.  
    - Implement data pagination to enhance query efficiency and overall system performance.

Functional Enhancements

* User Experience Enhancement  
    - Strengthen input validation processes for all user-submitted data, including file types and required fields.  
    - Integrate sorting and searching functionalities within table views to improve data accessibility.  
* User Role Management  
    - Introduce role-based access control to differentiate between administrative and standard user capabilities  
* Data Integrity Assurance  
    - Implement automatic deletion of orphaned audio files upon user account removal.

These enhancements aim to bolster the application's security, performance, maintainability and usability while establishing a solid foundation for future feature development and scaling.

**Running The Project**

1. Run \`docker compose up\` in the root directory of the project after unzipping the files.  
2. Open [http://localhost:3000](http://localhost:3000) in your browser and log in using the default account. The username is 'username' and the password is 'password'.