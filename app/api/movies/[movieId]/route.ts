import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    movieId: string;
  }>;
}

export async function GET(req: Request, { params }: Params) {
  // 👇 обязательно await
  const { movieId } = await params;

  try {
    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    console.error("Error fetching movie:", error);
    return NextResponse.json({ message: "Error fetching movie" }, { status: 500 });
  }
}