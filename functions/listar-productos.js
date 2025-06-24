import { Client } from 'pg';

export default async () => {
  try {
    const client = new Client({
      connectionString: process.env.PG_DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    const result = await client.query("SELECT * FROM productos ORDER BY id DESC");
    await client.end();

    return new Response(JSON.stringify(result.rows || []), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      ok: false,
      error: error.message || "Error inesperado en listar-productos"
    }), {
      status: 200, // Para que el frontend pueda leer el error sin fallar
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
