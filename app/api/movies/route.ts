import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const movies = await prisma.movie.findMany(); // получаем все фильмы

    if (!movies || movies.length === 0) {
      return NextResponse.json({ message: "No movies found" }, { status: 404 });
    }

    return NextResponse.json(movies); // возвращаем весь массив
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}