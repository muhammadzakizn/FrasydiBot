import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
export default {
    keys : /pp/i,
    
    functions: async (sock:WASocket, {currentChats, name, messages,textArr}:datas) => {
      if(textArr[0] != null && textArr.length == 1) {
        try {
            const ppUrl = await sock.profilePictureUrl(textArr[0].trim().split("@").join("")+"@s.whatsapp.net", "image")
            await sock.sendMessage(currentChats, {image:{ url:ppUrl||""}, caption:"Berhasil mengirimkan pp dari "+textArr, mentions:[textArr[0].split("@").join("")+"@s.whatsapp.net"]})
        }catch(err) {
            console.log(err)
            await sock.sendMessage(currentChats, {text:"Ada error"})
        }
        return
      }
      await sock.sendMessage(currentChats, {text:"Harus mention orang"})
    }
}