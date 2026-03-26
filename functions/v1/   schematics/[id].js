export async function onRequest(context) {
  const data = await fetch(new URL('/data/schematics.json', context.request.url))
    .then(res => res.json());

  const id = context.params.id;

  const schematic = data.find(s => s.id === id);

  if (!schematic) {
    return new Response(JSON.stringify({
      error: "Schematic not found"
    }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify(schematic), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
