# AI Scribe Backend API

This is a [NestJS](https://nestjs.com/) backend API for the AI Scribe application, providing endpoints for managing patients and clinical notes with AI-powered transcription and summarization.

## Prerequisites

- Node.js 20+ and npm
- PostgreSQL 15+ (for local development)
- Docker and Docker Compose (for Docker setup)
- OpenAI API key
- AWS account with S3 bucket (for audio file storage)

## Setup Instructions

### Option 1: Running with Docker (Recommended)

This is the easiest way to run the application with all dependencies configured.

#### 1. Create Environment File

Create a `.env.production` file in the `backend` directory:

```env
PORT=8080
NODE_ENV=production

TYPEORM_CONNECTION=postgres
TYPEORM_HOST=postgres
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=postgres
TYPEORM_DATABASE=ai-scribe
TYPEORM_PORT=5432

OPENAI_API_KEY=your-openai-api-key-here
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_S3_BUCKET_NAME=your-s3-bucket-name
```

#### 2. Build and Run

```bash
# Build and start all services (PostgreSQL + API)
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

The API will be available at `http://localhost:8080`
<br>
Documentation available at `http://localhost:8080/api/docs`

#### 3. Stop Services

```bash
# Stop services
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v
```

**Note:** On first run, the Docker container will automatically:
- Run database migrations
- Seed the database with sample data
- Start the API server

### Option 2: Running Locally

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Setup PostgreSQL Database

Make sure PostgreSQL is running locally and create a database:

```sql
CREATE DATABASE "ai-scribe";
```

#### 3. Create Environment File

Create a `.env` file in the `backend` directory:

```env
PORT=8080
NODE_ENV=local

TYPEORM_CONNECTION=postgres
TYPEORM_HOST=localhost
TYPEORM_USERNAME=your-postgres-username
TYPEORM_PASSWORD=your-postgres-password
TYPEORM_DATABASE=ai-scribe
TYPEORM_PORT=5432

OPENAI_API_KEY=your-openai-api-key-here
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_S3_BUCKET_NAME=your-s3-bucket-name
```

#### 4. Run Database Migrations

```bash
npm run migration:run
```

#### 5. Seed the Database (Optional)

```bash
npm run seed
```

#### 6. Start the Development Server

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:8080`
<br>
Documentation available at `http://localhost:8080/api/docs`


## Assumptions and Shortcuts

1. **Expanded Patient Seeding**: The specification called for 2-3 fake patients, but 12 patients with complete data (name, DOB, gender, phone, email) were seeded to provide better testing and demonstration capabilities.

2. **Full CRUD Operations**: Beyond the basic "create and view notes" requirement, full CRUD operations were implemented for both patients and notes (create, read, update, delete), providing a more complete application experience.

3. **Pagination and Search**: The specification mentioned a simple note list, but pagination (10 items per page) and search functionality by patient name were added for better scalability and usability.

4. **Additional Pages and Navigation**: 
   - Separate patient listing page
   - Patient detail page showing associated notes
   - Dedicated notes listing page
   - Sidebar navigation for better UX
   - These weren't in the original spec but improve navigation and organization

5. **Enhanced Stack**: Instead of a simple Express setup, the project uses:
   - **NestJS** for modular architecture and better code organization
   - **Next.js with App Router** for the frontend (more robust than plain React)
   - **TypeORM with migrations** for better database management
   - **Swagger/OpenAPI** for API documentation

6. **Additional Patient Fields**: Beyond the required fields (name, DOB, ID), additional fields were added:
   - Gender (enum: MALE, FEMALE, OTHER)
   - Phone number (optional)
   - Email (optional)
   - These provide more realistic patient data

7. **Custom SOAP Formatting**: A sophisticated SOAP formatting service was implemented with normalization and parsing logic to ensure consistent format output, going beyond basic AI summarization.

8. **UX Enhancements**: Multiple UX improvements were added:
   - Toast notifications for user feedback
   - Confirmation modals for destructive actions
   - Debounced search input
   - Loading states
   - Responsive design
   - Tooltips for better accessibility

9. **AWS S3 Integration**: Full S3 integration was implemented (mentioned as a bonus in the spec):
   - Audio file upload to S3
   - Automatic MP3 conversion
   - File management and cleanup

10. **Validation and Error Handling**: Comprehensive validation and error handling:
    - Backend validation using class-validator
    - Proper error handling throughout the application
    - User-friendly error messages in the frontend

### Technical Assumptions

1. **Database Setup**: The Docker setup automatically creates the database and runs migrations/seeds on container startup. For local development, you need to create the database manually.

2. **Environment Variables**: The application uses `.env.production` for Docker and `.env` for local development. Make sure to never commit these files.

3. **CORS**: Currently configured to allow all origins (`*`). In production, this should be restricted to specific domains.

4. **OpenAI Model**: Uses `gpt-3.5-turbo` for both transcription formatting and SOAP summarization. The temperature is set to 0.3 for more consistent outputs.

5. **File Naming**: Audio files are named using the pattern: `{timestamp}-{patientFirstName}-{timestamp}.mp3` for uniqueness and organization.

6. **Note Types**: Notes support two input types (TEXT and AUDIO) with different processing pipelines, but both result in SOAP-formatted content.

7. **Modular Architecture**: The backend follows NestJS module pattern with clear separation of concerns (patient, note, openai, aws modules), making it more maintainable than a simple Express setup.