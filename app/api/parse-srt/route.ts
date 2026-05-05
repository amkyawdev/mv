import { NextRequest, NextResponse } from 'next/server';

interface Subtitle {
  index: number;
  startTime: string;
  endTime: string;
  text: string;
}

function parseSRT(content: string): Subtitle[] {
  const blocks = content.split('\n\n').filter(block => block.trim());
  const subtitles: Subtitle[] = [];

  blocks.forEach((block) => {
    const lines = block.trim().split('\n');
    
    if (lines.length >= 3) {
      const indexLine = lines[0];
      const timeLine = lines[1];
      const textLines = lines.slice(2);

      const [startTime, endTime] = timeLine.split('-->').map(t => t.trim());

      if (startTime && endTime) {
        subtitles.push({
          index: parseInt(indexLine),
          startTime,
          endTime,
          text: textLines.join('\n'),
        });
      }
    }
  });

  return subtitles;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.name.endsWith('.srt')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only .srt files are allowed.' },
        { status: 400 }
      );
    }

    // Read and parse file
    const content = await file.text();
    const subtitles = parseSRT(content);

    if (subtitles.length === 0) {
      return NextResponse.json(
        { error: 'No valid subtitles found in file' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        count: subtitles.length,
        subtitles,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('SRT parsing error:', error);
    return NextResponse.json(
      { error: 'Failed to parse SRT file' },
      { status: 500 }
    );
  }
}
