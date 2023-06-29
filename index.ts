import { ConnInfo, serve } from 'https://deno.land/std@0.192.0/http/server.ts'
const port = Deno.args[0]
const filesFolder = Deno.args[1]
const isPortInvalid = (port: string) => isNaN(port as unknown as number)
const doesFolderExist = (folderPath: string) => {
    try {
        Deno.readDirSync(folderPath)
    } catch {
        return true
    }
    return false
}
const errorExit = () => {
    console.log(
        'Usage: ./web-server-dino PORT FILE_FOLDER_NAME\nExemple: ./web-server-dino 5000 web'
    )
    Deno.exit(2)
}

if (!port) {
    console.log('Please specify a valid port number')
    errorExit()
}
if (!filesFolder) {
    console.log('Please specify a file folder')
    errorExit()
}
if (isPortInvalid(port)) {
    console.log('Please enter a valid integer number as the port')
    errorExit()
}
if (doesFolderExist(filesFolder)) {
    console.log('Please enter an existing folder path')
    errorExit()
}
const removeBaseUrl = (url: string) =>
    url
        .split('/')
        .filter((_, index) => index > 2)
        .join('/')
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
    const requestUrl = removeBaseUrl(req.url)
    logAccess((conn.remoteAddr as Deno.NetAddr).hostname)
    return new Response('Hello World!')
}
serve(handler, { port: parseInt(port) })
