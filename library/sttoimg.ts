import { datas } from '../util/replayMessage';
import { WASocket, downloadMediaMessage } from '@adiwajshing/baileys';
import * as fs from "fs";
import {exec} from "child_process"
import path from "path"
export default {
    keys : /stimage/i,
    
    functions: async (sock:WASocket, {currentChats, quoted}:datas) => {
        if(quoted?.quotedMessage?.stickerMessage != null) {
           
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
            
            const name = message.key.id+"."+quoted.quotedMessage.stickerMessage.mimetype?.split("/").at(1)
            fs.writeFileSync(path.join(__dirname,"../image",name||""), buf)
            
            
            await sock.sendMessage(currentChats, 
                {
                    image:{
                        url:path.join(__dirname,"../image",name)||""
                    }
                }
            )
            fs.unlinkSync(path.join(__dirname,"../image",name)||"")
            

            return
        }
        await sock.sendMessage(currentChats, {
            text: "Harus menquoted pesan yang memiliki sticker"
        })
    }
}