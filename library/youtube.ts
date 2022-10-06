
import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
const youtubedl = require('@distube/youtube-dl')

export default {
    keys : /youtube|yt/i,
    
    functions: async (sock:WASocket, {currentChats, name, messages, text}:datas) => {
        console.log(text)
        if(text.trim().length != 0) {
        
            try {
                
                
                const res = await youtubedl(text, {
                  dumpSingleJson: true,
                  noWarnings: true,
                  noCallHome: true,
                  noCheckCertificate: true,
                  preferFreeFormats: true,
                  youtubeSkipDashManifest: true,
                  referer: text
                })
                
                const ind = res.formats.findIndex((el:any) => {
                    return el.format.split("-").at(0).trim() == "243"
                })
                await sock.sendMessage(currentChats, {text:"Sedang Mendownload"})
                await sock.sendMessage(currentChats, {video:{url:res.formats[ind].url}})
            
            }catch(err) {
                console.log(err)
                await sock.sendMessage(currentChats, {text:"Gagal Mendownload"})
            }    
            return;
        }
        await sock.sendMessage(currentChats, {text:"Harus mengisikan link"})

    }
}