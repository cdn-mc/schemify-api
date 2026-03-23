export async function onRequest(context) {
  const data = await fetch(new URL('../../data/schematics.json', import.meta.url))
    .then(res => res.json());

  const url = new URL(context.request.url);

  const page = parseInt(url.searchParams.get("page") || "1");
  const pageSize = parseInt(url.searchParams.get("page_size") || "10");
  const search = url.searchParams.get("search")?.toLowerCase() || "";
  const category = url.searchParams.get("category");

  let filtered = data;
  if (search) {
    filtered = filtered.filter(s =>
      s.name.toLowerCase().includes(search) ||
      s.author.toLowerCase().includes(search) ||
      s.tags?.some(t => t.toLowerCase().includes(search))
    );
  }

  // 🏷 filtro categoría
  if (category) {
    filtered = filtered.filter(s =>
      s.categories?.includes(category)
    );
  }
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return new Response(JSON.stringify({
    page,
    page_size: pageSize,
    total_pages: totalPages,
    total_items: totalItems,
    items
  }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "max-age=300"
    }
  });
}
