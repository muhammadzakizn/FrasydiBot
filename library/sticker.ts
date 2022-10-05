import { datas } from '../util/replayMessage';
import { WASocket, downloadMediaMessage } from '@adiwajshing/baileys';
import * as fs from "fs";
import path from "path"
export default {
    keys : /sticker/i,
    
    functions: async (sock:WASocket, {currentChats, quoted}:datas) => {
        if(quoted?.quotedMessage?.imageMessage != null) {
           
            const message = {
                key: {
                    remoteJid: currentChats, 
                    id: quoted.stanzaId,
                    participant:quoted.participant
                },
                message: {
                    ...quoted?.quotedMessage

                }
            }
            const buf:any = await downloadMediaMessage(message, "buffer", {})
            const name = message.key.id+"."+quoted.quotedMessage.imageMessage.mimetype?.split("/").at(1)
            fs.writeFileSync(path.join(__dirname,"../image",name||""), buf)
            
            await sock.sendMessage(currentChats, 
                {
                    sticker:{
                        url:path.join(__dirname,"../image",name)||""
                    }
                }
            )
            fs.unlinkSync(path.join(__dirname,"../image",name)||"")
            

            return
        } else if(quoted?.quotedMessage?.videoMessage != null) {
           
            const message = {
                key: {
                    remoteJid: currentChats, 
                    id: quoted.stanzaId,
                    participant:quoted.participant
                },
                message: {
                    ...quoted?.quotedMessage

                }
            }
            const buf:any = await downloadMediaMessage(message, "buffer", {})
            const name = message.key.id+"."+quoted.quotedMessage.videoMessage.mimetype?.split("/").at(1)
            fs.writeFileSync(path.join(__dirname,"../image",name||""), buf)
            
            await sock.sendMessage(currentChats, 
                {
                    sticker:{
                        url:path.join(__dirname,"../image",name)||""
                    }
                }
            )
            fs.unlinkSync(path.join(__dirname,"../image",name)||"")
            

            return
        }
        await sock.sendMessage(currentChats, {
            text: "Harus menquoted pesan yang memiliki gambar/video"
        })
    }
}