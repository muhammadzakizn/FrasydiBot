import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
export default {
    keys : /delete|hapus/i,
    
    functions: async (sock:WASocket, {currentChats, name, messages,quoted }:datas) => {
       
        if(quoted?.quotedMessage != null) {
            const message = {
                key: {
                    remoteJid: currentChats, 
                    id: quoted.stanzaId,
                    participant:quoted.participant
                }
                
            }
            await sock.sendMessage(currentChats, {delete:message.key})
            await sock.sendMessage(currentChats, {text:"Berhasil Hapus"})
        }
    }
}