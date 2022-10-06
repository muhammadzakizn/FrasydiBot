import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
export default {
    keys : /apakah/i,
    
    functions: async (sock:WASocket, {currentChats, name, text }:datas) => {
       if(text.trim().length == 0) {
            return;
       }
       const randomizer = Math.floor(Math.random()*100+1)
       let answer = "";
       if(randomizer >= 90) {
         answer = "Iya"
       } else if(randomizer >= 50) {
        answer = "Mungkin"
       } else if(randomizer >= 1) {
        answer = "Tidak"
       }
       return await sock.sendMessage(currentChats, {
            text:`
            Pertanyaan : Apakah ${text}\nJawaban : ${answer}
            `.trim()
       })
    }
}