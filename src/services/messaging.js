import http from "../http-common";

class MessagingDataService {
    sendMessage({message, phoneNumber}) {
        return http.post("/sendmessage", {message, phoneNumber})
    }
}

export default new MessagingDataService();