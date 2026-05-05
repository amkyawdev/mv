# MovieRecap – AI-Powered Movie Subtitle Editor

A modern, premium SaaS-style platform for editing movie subtitles with professional styling and cloud rendering. Upload videos, customize subtitles, and render final output with AI-assisted styling.

![MovieRecap Banner](https://img.shields.io/badge/MovieRecap-v1.0.0-neon?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square)
![FFmpeg](https://img.shields.io/badge/FFmpeg-Processing-red?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Container-blue?style=flat-square)

## Features

✨ **Premium UI** – Dark theme with neon blue/gold accents inspired by Stripe, Vercel, OpenAI
📱 **Mobile-First** – Responsive design optimized for all devices
🎬 **Video Upload** – Drag-and-drop support for all major video formats
📝 **Subtitle Editing** – Edit SRT files with real-time preview
🎨 **Full Customization** – Font, size, color, position, shadow, stroke effects
☁️ **Cloud Processing** – Docker + FFmpeg for reliable video rendering
⚡ **Production-Ready** – Deployable on Vercel with serverless processing

## Tech Stack

**Frontend:**
- Next.js 14 with React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

**Backend:**
- Next.js API Routes
- Node.js
- Express (optional)
- Axios for HTTP

**Processing:**
- Docker
- FFmpeg
- Python Flask
- CORS handling

**Deployment:**
- Vercel (Frontend)
- Docker Hub (Processing Service)
- GitHub Actions (CI/CD)

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- FFmpeg (automatic via Docker)
- Git

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/amkyawdev/mv.git
   cd mv
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local if needed (defaults work for local development)
   ```

4. **Start Docker services**
   ```bash
   docker-compose up -d
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## Project Structure

```
mv/
├── app/
│   ├── api/
│   │   ├── upload/route.ts         # Video upload handler
│   │   ├── parse-srt/route.ts      # SRT parsing
│   │   └── render/route.ts         # Video processing request
│   ├── (pages)/
│   │   ├── page.tsx                # Home/Get Started
│   │   ├── upload/page.tsx         # Upload page
│   │   ├── editor/page.tsx         # Core editing interface
│   │   ├── docs/page.tsx           # Documentation
│   │   └── about/page.tsx          # About page
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── components/
│   └── Navigation.tsx              # Navigation component
├── public/
│   ├── uploads/                    # Uploaded videos (created at runtime)
│   └── downloads/                  # Processed videos (created at runtime)
├── docker/
│   └── processor/
│       ├── Dockerfile
│       ├── app.py                  # Flask processing service
│       └── requirements.txt
├── package.json
├── tailwind.config.js
├── next.config.js
└── docker-compose.yml

```

## Development

### Running Locally

```bash
# Terminal 1: Start Docker
docker-compose up

# Terminal 2: Start Next.js dev server
npm run dev
```

Both services will be available:
- Frontend: http://localhost:3000
- Processing API: http://localhost:5000

### Building for Production

```bash
npm run build
npm start
```

### Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f processor

# Stop services
docker-compose down

# Clean up volumes
docker-compose down -v
```

## API Endpoints

### File Upload
```
POST /api/upload
Content-Type: multipart/form-data

Response:
{
  "success": true,
  "fileId": "uuid",
  "filename": "video.mp4",
  "originalName": "My Movie.mp4",
  "size": 1024000,
  "uploadedAt": "2024-01-15T10:30:00Z"
}
```

### SRT Parsing
```
POST /api/parse-srt
Content-Type: multipart/form-data

Response:
{
  "success": true,
  "count": 42,
  "subtitles": [
    {
      "index": 1,
      "startTime": "00:00:01,000",
      "endTime": "00:00:05,000",
      "text": "Subtitle text"
    }
  ]
}
```

### Render Video
```
POST /api/render
Content-Type: application/json

Request:
{
  "videoId": "file-uuid",
  "subtitles": [
    {
      "startTime": "00:00:01,000",
      "endTime": "00:00:05,000",
      "text": "Subtitle"
    }
  ],
  "style": {
    "fontFamily": "Arial",
    "fontSize": 24,
    "fontColor": "#ffffff",
    "backgroundColor": "#000000",
    "backgroundOpacity": 0.7,
    "position": "bottom",
    "alignment": "center",
    "padding": 12,
    "lineSpacing": 1.5,
    "shadowEnabled": true,
    "shadowBlur": 4,
    "shadowColor": "#000000",
    "strokeEnabled": false,
    "strokeWidth": 1,
    "strokeColor": "#000000"
  }
}

Response (202):
{
  "success": true,
  "jobId": "job-uuid",
  "status": "queued"
}
```

### Check Job Status
```
GET /api/render?jobId=job-uuid

Response:
{
  "success": true,
  "jobId": "job-uuid",
  "status": "completed|processing|failed",
  "progress": 75,
  "downloadUrl": "/downloads/output.mp4",
  "error": null
}
```

## Deployment

### Deploy to Vercel (Frontend)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Import your repository
   - Configure environment variables
   - Deploy

### Deploy Processing Service

Option A: **Docker Hub + Cloud Run (Google)**
```bash
# Build and push image
docker build -t yourusername/movie-recap-processor ./docker/processor
docker push yourusername/movie-recap-processor

# Deploy to Cloud Run
gcloud run deploy movie-recap-processor \
  --image yourusername/movie-recap-processor \
  --platform managed \
  --memory 2Gi \
  --timeout 3600
```

Option B: **Heroku**
```bash
heroku container:push web --app your-app-name
heroku container:release web --app your-app-name
```

Option C: **AWS Lambda + ECS**
- Use AWS Batch or ECS for video processing
- Set `PROCESSING_API_URL` to your service endpoint

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
PROCESSING_API_URL=https://processor.your-domain.com
```

## Configuration

### Subtitle Style Options

```typescript
{
  fontFamily: string;      // Arial, Helvetica, Times New Roman, etc.
  fontSize: number;        // 12-72px
  fontColor: string;       // Hex color (#ffffff)
  backgroundColor: string; // Hex color (#000000)
  backgroundOpacity: number; // 0-1
  position: 'top' | 'center' | 'bottom';
  alignment: 'left' | 'center' | 'right';
  padding: number;         // 0-50px
  lineSpacing: number;     // 0.8-2.5x
  shadowEnabled: boolean;
  shadowBlur: number;      // 0-20px
  shadowColor: string;     // Hex color
  strokeEnabled: boolean;
  strokeWidth: number;     // 0-10px
  strokeColor: string;     // Hex color
}
```

## Performance Tips

1. **Optimize Video Size** – Compress videos before upload
2. **Use SRT Format** – Most compatible subtitle format
3. **Test Locally First** – Always preview before rendering
4. **Monitor Rendering** – Check job status via API
5. **Scale Processing** – Use multiple Docker containers for production

## Troubleshooting

### FFmpeg not found
```bash
# Install FFmpeg locally (for testing)
# macOS
brew install ffmpeg

# Ubuntu
sudo apt-get install ffmpeg

# Windows
choco install ffmpeg
```

### Docker connection refused
```bash
# Ensure Docker is running
docker ps

# Check Docker Compose
docker-compose ps

# Rebuild
docker-compose down
docker-compose up --build
```

### Video upload fails
- Check file size (max 2GB)
- Verify video format is supported
- Check disk space in `/public/uploads`

### Processing times out
- Increase timeout in docker-compose.yml
- Use lower resolution for testing
- Check FFmpeg logs: `docker-compose logs processor`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Apache License 2.0 – see the LICENSE file for details.

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the docs page in the app

## Roadmap

- [ ] Real-time collaboration
- [ ] Advanced SRT editor with timeline
- [ ] Subtitle auto-generation with AI
- [ ] Batch processing
- [ ] Custom fonts upload
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] WebRTC preview synchronization

## Credits

Built with ❤️ for creators and filmmakers.

Inspired by modern SaaS platforms: Stripe, Vercel, OpenAI

---

**MovieRecap** – Professional subtitle editing, beautifully designed. 🎬✨
