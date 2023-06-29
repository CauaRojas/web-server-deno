import { ConnInfo, serve } from 'https://deno.land/std@0.192.0/http/server.ts'

const removeBaseUrl = (url: string) =>
    url
        .split('/')
        .filter((_, index) => index > 2)
        .join('')
const logAccess = async (ip: string) => {
    const logPath = './log.txt'
    const logFile = await Deno.open(logPath, {
        create: true,
        write: true,
    })
    const fileContent = await Deno.readFile(logPath)

    const saveInfo = ip + ' - ' + new Date().toISOString()

    const encoder = new TextEncoder()
    const ipEncoded = encoder.encode(
        // if has content append a \n before saveInfo
        fileContent.length > 1 ? '\n' + saveInfo : saveInfo
    )

    const data = new Uint8Array(fileContent.length + ipEncoded.length)
    data.set(fileContent)
    data.set(ipEncoded, fileContent.length)
    await logFile.write(data)
    logFile.close()
}

async function handler(req: Request, conn: ConnInfo) {
    console.log(removeBaseUrl(req.url))
    logAccess((conn.remoteAddr as Deno.NetAddr).hostname)
    return new Response(
        'Hello World! ' + (conn.remoteAddr as Deno.NetAddr).hostname
    )
}
serve(handler, { port: 5000 })
