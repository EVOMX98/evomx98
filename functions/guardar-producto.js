import { Client } from 'pg';

export default async (req) => {
  try {
    const data = await req.json();

    const client = new Client({
      connectionString: process.env.PG_DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    await client.query(
      `INSERT INTO productos (titulo, codigo, genero, tallas, colores, whatsapp, imagen)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        data.titulo,
        data.codigo,
        data.genero,
        data.tallas,
        data.colores,
        data.whatsapp,
        data.imagen,
      ]
    );

    await client.end();

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
