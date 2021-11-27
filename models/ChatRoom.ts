class ChatRoom {
    
    // public get chatRoomName(): string {
    //     return this.chatRoomName;
    // }
    // public set chatRoomName(name: string) {
        //if (name != '') {
//            this.chatRoomName = name;
        //} else {

        //}
    //}

    returnSomething() : number {
        return 12;
    }

    constructor(private chatRoomId: string, public imageUrl: any, 
        private chatRoomName: string, public messages: any[]) {
        
            this.chatRoomId = chatRoomId;
        this.imageUrl = imageUrl;
        this.chatRoomName = chatRoomName;
        this.messages = messages;
    }
}

export default ChatRoom;