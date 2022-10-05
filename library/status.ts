import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
export default {
    keys : /status/i,
    
    functions: async (sock:WASocket, {currentChats, name, textArr, quoted, messages}:datas) => {
        if(quoted.mentionedJid != null && textArr.length == 1) {
            
            const status = await sock.fetchStatus(quoted.mentionedJid?.at(0)||"")
            await sock.sendMessage(currentChats, {text:"Status dari "+textArr[0]+" adalah "+status?.status, mentions:quoted.mentionedJid } )
        }
    }
}