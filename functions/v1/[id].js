export async function onRequest(context) {
  const id = context.params.id;

  const data = await fetch(new URL('../../data/schematics.json', import.meta.url))
    .then(res => res.json());

  const item = data.find(s => s.id === id);

  if (!item) {
    return new Response(JSON.stringify({
      error: {
        code: "NOT_FOUND",
        message: "Schematic not found"
      }
    }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify(item), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "max-age=300"
    }
  });
}
