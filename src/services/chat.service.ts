import mongoose from 'mongoose';
import { ChatMessageRepository } from '../repositories/chat-message.repository';
import { CreateChatMessageDto } from '../dto/chat.dto';
import { IChatMessage } from '../models/chat-message.model';

export class ChatService {
  private chatMessageRepository: ChatMessageRepository;

  constructor() {
    this.chatMessageRepository = new ChatMessageRepository();
  }

  async createMessage(senderId: string, data: CreateChatMessageDto): Promise<IChatMessage> {
    return this.chatMessageRepository.create({
      senderId: new mongoose.Types.ObjectId(senderId),
      receiverId: data.receiverId ? new mongoose.Types.ObjectId(data.receiverId) : undefined,
      message: data.message,
      isSupport: data.isSupport || false,
      roomId: data.roomId
    } as Partial<IChatMessage>);
  }

  async getMessagesBySender(senderId: string): Promise<IChatMessage[]> {
    return this.chatMessageRepository.findBySender(senderId);
  }

  async getMessagesByReceiver(receiverId: string): Promise<IChatMessage[]> {
    return this.chatMessageRepository.findByReceiver(receiverId);
  }

  async getConversation(senderId: string, receiverId: string): Promise<IChatMessage[]> {
    return this.chatMessageRepository.findConversation(senderId, receiverId);
  }

  async getSupportMessages(): Promise<IChatMessage[]> {
    return this.chatMessageRepository.findSupportMessages();
  }

  async getMessagesByRoom(roomId: string): Promise<IChatMessage[]> {
    return this.chatMessageRepository.findByRoom(roomId);
  }
}


