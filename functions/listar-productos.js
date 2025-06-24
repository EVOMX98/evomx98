import { neon } from '@netlify/neon';

export default async () => {
  const { sql } = neon();
  const productos = await sql`SELECT * FROM productos ORDER BY id DESC`;
  return new Response(JSON.stringify(productos), { status: 200 });
};
