// Worker do Cloudflare: serve o site estático e o login do Decap CMS com GitHub.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/oauth/auth') return startAuth(url, env);
    if (url.pathname === '/oauth/callback') return finishAuth(request, url, env);
    return env.ASSETS.fetch(request);
  },
};

function startAuth(url, env) {
  const state = crypto.randomUUID();
  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: `${url.origin}/oauth/callback`,
    scope: 'repo,user',
    state,
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params}`,
      'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/oauth; Max-Age=600`,
    },
  });
}

async function finishAuth(request, url, env) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = request.headers.get('Cookie') || '';
  const savedState = /(?:^|;\s*)oauth_state=([^;]+)/.exec(cookie)?.[1];

  let message;
  if (!code || !state || state !== savedState) {
    message = `authorization:github:error:${JSON.stringify({ message: 'Estado de login inválido. Tente novamente.' })}`;
  } else {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${url.origin}/oauth/callback`,
      }),
    });
    const data = await res.json();
    message = data.access_token
      ? `authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}`
      : `authorization:github:error:${JSON.stringify(data)}`;
  }

  const html = `<!doctype html><html><body><script>
(function () {
  var message = ${JSON.stringify(message)};
  function receive(e) {
    window.opener.postMessage(message, e.origin);
    window.removeEventListener('message', receive, false);
  }
  window.addEventListener('message', receive, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Set-Cookie': 'oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/oauth; Max-Age=0',
    },
  });
}
