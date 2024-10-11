## Voting Application: A Secure and Organized Voting System

This is a backend implementation for a voting system where users can vote for candidates. It provides functionalities for user authentication, candidate management, and voting.

### Functionality

**User Roles:**

* **Registration & Login:** Users register and log in securely using their Aadhar Card number and password.
* **Password Management:** Users can update their passwords for enhanced security.
* **Candidate Information:** Access a comprehensive list of available candidates.
* **Casting Votes:** Users can only cast a single vote.
* **Live Vote Count:** View a list of candidates with real-time vote counts.
* **User Verification:** Aadhar Card verification guarantees user authenticity.

**Admin Roles:**

* **Candidate Management:** Add, edit, or remove candidates from the system.
* **Impartiality:** Admins are barred from voting, maintaining a neutral environment.

### Technology Stack

* **Node.js:** JavaScript runtime environment for server-side operations.
* **Express.js:** Web framework for building a clean and efficient application structure.
* **MongoDB:** NoSQL database for flexible storage of user and candidate data.
* **JSON Web Tokens (JWT):** Enables secure user authentication and authorization.

### Installation Guide

1. **Clone the Repository:**

```bash
git clone https://github.com/jinx-vi-0/voting_app.git
```

2. **Navigate to Project Directory:**

```bash
cd voting_app
```

3. **Install Dependencies:**

```bash
npm install
```

4. **Configure Environment Variables:**

Create a `.env` file and add the following, replacing placeholders with your details:

```
PORT=3000
MONGO_URL=mongodb://localhost:27017/Voting_App
JWT_SECRET=your_secret_key_here
```

**Note:**  Keep the JWT secret key private and secure.

5. **Start the Server:**

```bash
npm start
```

### API Endpoints

**User Authentication:**

* **Sign Up (POST /signup):** Creates a new user account.
* **Login (POST /login):** Authenticates user with Aadhar Card number and password.

**Candidates:**

* **Get Candidates (GET /candidate):** Retrieves the list of candidates.
* **Add Candidate (POST /candidate) (Admin Only):** Creates a new candidate entry.
* **Update Candidate (PUT /candidate/:id) (Admin Only):** Modifies existing candidate details.
* **Delete Candidate (DELETE /candidate/:id) (Admin Only):** Removes a candidate from the list.

**Voting:**

* **Get Vote Count (GET /candidate/vote/count):** Retrieves a list of candidates sorted by vote counts.
* **Vote for Candidate (POST /candidate/vote/:id) (User Only):** Casts a vote for a specific candidate.

**User Profile:**

* **Get Profile (GET /user/profile):** Retrieves user profile information.
* **Change Password (PUT /user/profile/password):** Allows users to update their passwords.

### Conclusion

This application prioritizes a secure and verifiable voting experience. User data is protected, and features like unique identification and real-time vote counts ensure fair elections.
