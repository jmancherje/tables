import fs from "fs/promises";
import path from "path";

export async function GET() {
  const data = await fs.readFile("./data/people.json");

  try {
    const parsed = JSON.parse(data.toString());
    return Response.json({ data: parsed });
  } catch (error) {
    console.error("Error parsing people.json", error);
    return Response.error();
  }
}
