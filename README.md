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

EXAMPLE OF A COMMAND TO run the backend on port 3000:

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

### 4. Start the Development Server

```bash
npm run dev
```

This frontend will run on **[http://localhost:3001](http://localhost:3001)**.

---

## Notes

* Frontend runs on **port 3001**
* Backend runs on **port 3000**
* Make sure to start the backend (via Docker) before the frontend
* Keep these ports in mind if integrating into other systems

---

