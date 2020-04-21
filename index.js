addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
class Request {
  element(element) {
    const attribute = element.getAttribute('href');
    element.setAttribute(
      'href',
      attribute.replace('cloudflare.com', 'cyberxploits.com/2019/08/16/csrf-token/')
    );
    element.setInnerContent('Divyansh CSRF Token Blog!');
  }
} 
 
const htmlRewriter = new HTMLRewriter().on('a#url', new Request()); 


async function handleRequest(request) {
  const url = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
  const variants = await url.json();
  const urls = variants['variants'];
  const value = Math.floor(Math.random() * 2);
  const variantResponse = await fetch(urls[value]);
  return htmlRewriter.transform(variantResponse);
}
