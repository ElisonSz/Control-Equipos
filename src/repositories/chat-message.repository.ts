import { BaseRepository } from './base.repository';
import { ChatMessage, IChatMessage } from '../models/chat-message.model';

export class ChatMessageRepository extends BaseRepository<IChatMessage> {
  constructor() {
    super(ChatMessage);
  }

  async findBySender(senderId: string): Promise<IChatMessage[]> {
    return this.model.find({ senderId }).populate('senderId').populate('receiverId').sort({ createdAt: -1 });
  }

  async findByReceiver(receiverId: string): Promise<IChatMessage[]> {
    return this.model.find({ receiverId }).populate('senderId').populate('receiverId').sort({ createdAt: -1 });
  }

  async findByRoom(roomId: string): Promise<IChatMessage[]> {
    return this.model.find({ roomId }).populate('senderId').populate('receiverId').sort({ createdAt: -1 });
  }

  async findSupportMessages(): Promise<IChatMessage[]> {
    return this.model.find({ isSupport: true }).populate('senderId').populate('receiverId').sort({ createdAt: -1 });
  }

  async findConversation(senderId: string, receiverId: string): Promise<IChatMessage[]> {
    return this.model.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).populate('senderId').populate('receiverId').sort({ createdAt: 1 });
  }
}


