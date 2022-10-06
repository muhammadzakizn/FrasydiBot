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
    anggotaGroup : Array<string>

}


async function replayMessage(messages:WAMessage, sock:WASocket) {
    console.log("\x1b[33m%s\x1b[0m",JSON.stringify(messages, null, 2))
  
    const rawPesan = messages.message?.conversation || messages.message?.extendedTextMessage?.text
    const pesan:Array<string> = []
    rawPesan?.trim().split(" ").forEach(el => {
        if(el.trim().length != 0 ) {
            pesan.push(el)
        }
    })
    const isGroup = !(messages.key.participant == null)
    let group:Array<string> = []
    let isAdmin = false
    if(isGroup) {
        const gb = await sock.groupMetadata(messages.key.remoteJid||"")
        const participant = gb.participants
        participant.forEach((el:any) => {
            group.push(el.id)
        })
        isAdmin = (participant.findIndex(el => {
            return el.id == messages.key.participant && el.admin != null
        })) > -1
    }
    console.log(isAdmin)
    const data = {
        currentChats:messages.key.remoteJid,
        name : messages.pushName,
        text : pesan.slice(1,pesan.length).join(" "),
        textArr : pesan.slice(1, pesan.length),
        messages :messages,
        quoted : messages.message?.extendedTextMessage?.contextInfo,
        isGroup : isGroup,
        isAdmin : isAdmin,
        anggotaGroup : group

    }
   
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