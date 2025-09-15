import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const movies = await prisma.movie.findMany();

    if (!movies || movies.length === 0) {
      return NextResponse.json({ message: "No movies found" }, { status: 404 });
    }

    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];

    return NextResponse.json(randomMovie);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
