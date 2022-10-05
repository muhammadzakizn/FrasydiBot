import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
export default {
    keys : /grupprofil|gp/i,
    
    functions: async (sock:WASocket, {currentChats, name, messages,textArr}:datas) => {
      
        const ppUrl = await sock.profilePictureUrl(currentChats, "image")
        await sock.sendMessage(currentChats, {image:{ url:ppUrl||""}, caption:"Berhasil mengirimkan pp grup"})
       
    }
}