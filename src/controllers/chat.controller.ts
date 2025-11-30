import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { ChatService } from '../services/chat.service';
import { CreateChatMessageDto } from '../dto/chat.dto';

export class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  createMessage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const data = req.body as CreateChatMessageDto;
      const message = await this.chatService.createMessage(req.user.id, data);
      res.status(201).json(message);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  getMyMessages = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const messages = await this.chatService.getMessagesBySender(req.user.id);
      res.status(200).json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getConversation = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const { receiverId } = req.params;
      const messages = await this.chatService.getConversation(req.user.id, receiverId);
      res.status(200).json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getSupportMessages = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const messages = await this.chatService.getSupportMessages();
      res.status(200).json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getRoomMessages = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { roomId } = req.params;
      const messages = await this.chatService.getMessagesByRoom(roomId);
      res.status(200).json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}


