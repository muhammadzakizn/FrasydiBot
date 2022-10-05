import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
export default {
    keys : /help|bantuan/i,
    
    functions: async (sock:WASocket, {currentChats, name, messages }:datas) => {
      
        const sections = [
            {
            title: "Command Utama",
            rows: [
                {title: "Hello", rowId: "hello"},
                {title: "Promote", rowId: "promote", description: "Mempromosikan orang || promote|promosi"},
                {title: "Demote", rowId: "demote", description: "Mendemotasikan orang ||demote "},
                {title: "Kick", rowId: "kick", description: "Mendemotasikan orang ||demote "},

            ]
            },
          
        ]
        
        const listMessage = {
          text: "Help",
          footer: "Fumu BOT",
          title: "FUMU BOT",
          buttonText: "Buka List",
          sections
        }
        
         await sock.sendMessage(currentChats, listMessage)


    }
}