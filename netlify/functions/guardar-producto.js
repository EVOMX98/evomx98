import { neon } from "@netlify/neon";

export default async (req) => {
  try {
    const p = await req.json();
    const { sql } = neon();
    await sql`
      INSERT INTO productos (titulo, codigo, genero, tallas, colores, whatsapp, imagen)
      VALUES (${p.titulo}, ${p.codigo}, ${p.genero}, ${p.tallas}, ${p.colores}, ${p.whatsapp}, ${p.imagen});
    `;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500 });
  }
};
