// HMAC-SHA256 signed tokens — no external library needed in Workers

export async function createToken(
  payload: Record<string, unknown>,
  secret: string
): Promise<string> {
  const encoded = btoa(JSON.stringify(payload))
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(encoded))
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
  return `${encoded}.${sigB64}`
}

export async function verifyToken(
  token: string,
  secret: string
): Promise<Record<string, unknown> | null> {
  const lastDot = token.lastIndexOf('.')
  if (lastDot === -1) return null
  const encoded = token.slice(0, lastDot)
  const sig = token.slice(lastDot + 1)
  try {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    const sigBytes = Uint8Array.from(atob(sig), (c) => c.charCodeAt(0))
    const valid = await crypto.subtle.verify(
      'HMAC', key, sigBytes, new TextEncoder().encode(encoded)
    )
    if (!valid) return null
    const payload = JSON.parse(atob(encoded)) as Record<string, unknown>
    const exp = payload.exp as number | undefined
    if (exp !== undefined && exp < Date.now()) return null
    return payload
  } catch {
    return null
  }
}
