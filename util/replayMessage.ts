import { WAMessage, WASocket,AnyMessageContent, proto } from "@adiwajshing/baileys"
import readDir from "./libraryReader"

const lib:Array<{key:string, functions:any}> = readDir()
export interface datas {
    currentChats : string,
    name : string,
    text : string,
    textArr :Array<string> ,
    allPesan : string,
    messages: WAMessage,
    quoted: proto.IContextInfo,
    isGroup:boolean,
    isAdmin : boolean
}


async function replayMessage(messages:WAMessage, sock:WASocket) {
    console.log(messages)
    console.log(messages.message?.extendedTextMessage?.contextInfo)
    const rawPesan = messages.message?.conversation || messages.message?.extendedTextMessage?.text
    const pesan:Array<string> = rawPesan?.trim().split(" ") || [""] 
    const isGroup = !(messages.key.participant == null)
    let isAdmin = false
    if(isGroup) {
        const gb = await sock.groupMetadata(messages.key.remoteJid||"")
        const participant = gb.participants
        console.log(participant)
        isAdmin = (participant.findIndex(el => {
            console.log(el.id)
           return el.id == messages.key.participant && (el.isSuperAdmin || el.isAdmin)
        })) > -1
    }
    const data = {
        currentChats:messages.key.remoteJid,
        name : messages.pushName,
        text : pesan.slice(1,pesan.length).join(" "),
        textArr : pesan.slice(1, pesan.length),
        messages :messages,
        quoted : messages.message?.extendedTextMessage?.contextInfo,
        isGroup : isGroup,
        isAdmin : isAdmin
    }
    console.log(pesan)
    const library = lib.findIndex((el:any) => {
        try {
            return pesan[0].match(el.keys)
        }catch(err) {
            console.log("Terdapat error ")
            return false
        }
    })
    
    
    if(library != -1 && pesan[0].at(0) == process.env.PREFIX) {
        console.log(lib[library])
        await lib[library].functions(sock, data)
        
    }
   
}

export default replayMessage