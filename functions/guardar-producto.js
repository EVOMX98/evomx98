import { Client } from 'pg';

export default async (req) => {
  try {
    const data = await req.json();

    const client = new Client({
      connectionString: process.env.PG_DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    const query = `
      INSERT INTO productos (titulo, codigo, genero, tallas, colores, whatsapp, imagen)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const values = [
      data.titulo,
      data.codigo,
      data.genero,
      data.tallas,
      data.colores,
      data.whatsapp,
      data.imagen,
    ];

    await client.query(query, values);
    await client.end();

    return new Response("✅ Producto guardado con éxito", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });

  } catch (error) {
    return new Response("🚫 Error detallado: " + error.message, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
};
