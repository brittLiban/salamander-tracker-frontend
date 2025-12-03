# Centroid Tracker Frontend

This is a simple React-based frontend application for visualizing and tuning centroid detection on a given image. It is built to work alongside a backend that performs the actual image processing.

---

## Features

* Upload and preview thumbnails of videos or images.
* Use a color picker to select a target color from the preview.
* Adjust a threshold slider to fine-tune detection sensitivity.
* See live binarized results of the selected color and threshold.
* Start a job to process the full video.
* Download a CSV file tracking object movements over time.

---

## Prerequisites

* Node.js
* NPM

---

## Getting Started

### 1. Set Up the Backend First

Before running the frontend, ensure the backend is up and running. Clone and run the backend from this link:

**[Centroid Finder Backend -- Click Here](https://github.com/brittLiban/centroid-finder/tree/dockerRunner)**

Example command to run the backend (default backend port is `3000`):

```bash
docker run -p 3000:3000 \
  -v "//c/Users/your/video/library:/videos" \
  -v "//c/Users/your/DesiredResults/library:/results" \
  centroid-backend
```

Keep the backend running in the background.

### 2. Clone the Frontend Repository

```bash
git clone https://github.com/yourusername/centroid-tracker-frontend.git
cd centroid-tracker-frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory to set the backend API URL:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Note:** If your backend runs on a different port or domain, update `NEXT_PUBLIC_API_URL` accordingly. This is the single source of truth for all API endpoints.

### 5. Start the Development Server

```bash
npm run dev
```

This frontend will run on **[http://localhost:3001](http://localhost:3001)**.

---

## Configuration

### Environment Variables

All API endpoints use the `NEXT_PUBLIC_API_URL` environment variable defined in `.env.local`:

* **`NEXT_PUBLIC_API_URL`**: Base URL for the backend API (default: `http://localhost:3000`)

To change the backend URL:
1. Edit `.env.local`
2. Restart the dev server

### Port Configuration

* **Frontend**: Runs on port `3001` (configured in `package.json`)
* **Backend**: Runs on port `3000` (or as specified in `NEXT_PUBLIC_API_URL`)

Make sure these ports are available or adjust as needed. Always start the backend (via Docker) before the frontend.

---




## Docker Deployment

### Building the Docker Image

To build the Docker image for the frontend:

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:3001 \
  -t salamander-tracker-frontend .
```

**Note:** Replace `http://localhost:3001` with your backend URL. This must be set at build time.

### Running the Docker Container

```bash
docker run -p 3000:3000 salamander-tracker-frontend
```

The frontend will be accessible at `http://localhost:3000`.

### Using with Docker Compose (Recommended)

For easier orchestration of both frontend and backend, create a `docker-compose.yml` in a parent directory that contains both repositories:

```yaml
version: '3.8'

services:
  backend:
    image: centroid-backend
    ports:
      - "3001:3000"
    volumes:
      - ./videos:/videos
      - ./results:/results

  frontend:
    build:
      context: ./salamander-tracker-frontend
      args:
        NEXT_PUBLIC_API_URL: http://localhost:3001
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

Then run:

```bash
docker-compose up
```

---


