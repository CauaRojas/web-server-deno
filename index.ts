import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'

const removeBaseUrl = (url: string) =>
    url
        .split('/')
        .filter((_, index) => index > 2)
        .join('')

async function handler(req: Request) {
    console.log(removeBaseUrl(req.url))

    return new Response('Hello World!')
}
serve(handler, { port: 5000 })
