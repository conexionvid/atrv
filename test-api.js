async function test() {
  const res = await fetch('http://localhost:3000/api/news');
  const json = await res.json();
  console.log(json.articles.length);
}
test();
