// functions/listar-productos.js
import { neon } from '@netlify/neon';

export default async () => {
  try {
    const { sql } = neon();                // Usa NETLIFY_DATABASE_URL internamente
    const productos = await sql`SELECT * FROM productos ORDER BY id DESC`;
    return new Response(JSON.stringify(productos), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500 });
  }
};
