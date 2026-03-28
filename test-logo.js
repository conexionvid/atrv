async function test() {
  const res = await fetch('https://conexionvid.github.io/atoyac-radio-veracruz/logo.png');
  console.log(res.status);
}
test();
