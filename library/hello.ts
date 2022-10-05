import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
export default {
    keys : /hello|halo/i,
    
    functions: async (sock:WASocket, {currentChats, name, messages }:datas) => {
        return sock.sendMessage(currentChats, {text:"Halo @"+messages.key.participant?.split("@").at(0), mentions:[messages.key.participant||""]}, {quoted:messages})
    }
}