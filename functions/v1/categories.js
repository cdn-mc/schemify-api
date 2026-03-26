export async function onRequest(context) {
  const data = await fetch(new URL('/data/categories.json', context.request.url))
    .then(res => res.json());

  return new Response(JSON.stringify({
    categories: data
  }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "max-age=600"
    }
  });
}
