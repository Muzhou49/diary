export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const target = 'https://gratitude-diary-sooty.vercel.app';

    const proxyUrl = target + url.pathname + url.search;

    const modifiedRequest = new Request(proxyUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      redirect: 'follow',
    });

    try {
      const response = await fetch(modifiedRequest);
      const modifiedResponse = new Response(response.body, response);
      modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
      return modifiedResponse;
    } catch (e) {
      return new Response('Proxy error: ' + e.message, { status: 502 });
    }
  },
};
