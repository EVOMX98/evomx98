export default async () => {
  try {
    return new Response("✅ La función se ejecutó correctamente", {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (error) {
    return new Response("❌ Error: " + error.message, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
