import { Client } from 'pg';

export default async (req, context) => {
  try {
    const body = await req.json();

    const client = new Client({
      connectionString: process.env.PG_DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    const query = `
      INSERT INTO productos (titulo, codigo, genero, tallas, colores, whatsapp, imagen)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [
      body.titulo,
      body.codigo,
      body.genero,
      body.tallas,
      body.colores,
      body.whatsapp,
      body.imagen
    ];

    await client.query(query, values);
    await client.end();

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      ok: false,
      error: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
