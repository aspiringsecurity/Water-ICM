const sendMessage = async function (senderID,message) {
    try {
        await client.messages.create({
            to: senderID,
            body: message,
            from: `whatsapp:+14155238886`
        });
    } catch (error) {
        console.log(`Error at sendMessage --> ${error}`);
    }
};
const ReadMessage = async function (message) {
    var senderID=''
    
    return senderID;
    
};

module.exports = {
    sendMessage
}