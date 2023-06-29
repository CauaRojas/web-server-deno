import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'

async function handler(_req: Request) {
    return new Response('Hello World!')
}
serve(handler, { port: 5000 })
