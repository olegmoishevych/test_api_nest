# 🧾 Log Analyzer API (NestJS + PostgreSQL + Docker)

A simple and scalable web server log analyzer built with NestJS and PostgreSQL.  
This service supports:

- 📥 Receiving JSON logs in bulk
- 📊 Generating request statistics
- ⚡️ Fast SQL-based aggregations
- 🧼 Request validation with class-validator
- 📈 API documentation using Swagger
- 🐳 Containerized setup using Docker

---

## 🚀 Quick Start (with Docker)

### 1. Clone the repository

```bash
1 - git clone https://github.com/olegmoishevych/test_api
2 - cd test_api

Start the project -> 🐳 
docker-compose up --build

✅ This will start:
•	NestJS app on http://localhost:3000
•	PostgreSQL database on localhost:5432

📚 Swagger API Docs
http://localhost:3000/api
