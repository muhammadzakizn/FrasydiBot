import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
export default {
    keys : /delete|hapus/i,
    
    functions: async (sock:WASocket, {currentChats, name, messages,quoted }:datas) => {

        if(quoted?.quotedMessage != null) {
           
            await sock.sendMessage(currentChats, {delete:quoted})
        }
    }
}