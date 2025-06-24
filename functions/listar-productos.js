import { Client } from 'pg';

export default async () => {
  try {
    const client = new Client({
      connectionString: process.env.PG_DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    const res = await client.query("SELECT * FROM productos ORDER BY id DESC");
    await client.end();

    return new Response(JSON.stringify(res.rows), {
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
