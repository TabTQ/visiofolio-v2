
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import type { PortfolioData } from '@/types/portfolio-data';

// Define the path to the JSON file relative to the project root
const portfolioDataPath = path.join(process.cwd(), 'src', 'config', 'portfolio-data.json');

export async function GET() {
  try {
    // Read the JSON file from the filesystem
    const jsonData = await fs.readFile(portfolioDataPath, 'utf-8');
    // Parse the JSON data
    const data: PortfolioData = JSON.parse(jsonData);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to read or parse portfolio data:", error);
    // Return an error response
    return NextResponse.json({ error: 'Failed to load portfolio data' }, { status: 500 });
  }
}
