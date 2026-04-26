import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  message: Partial<Message> = {};
  allMessages: Message[] = [];
  notReadCount: number = 0;
  messageSent: boolean = false;
  isAdmin = localStorage.getItem('portfolio_admin') === 'admin123';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    if (this.isAdmin) {
      this.getAllMessages();
      this.countNotRead();
    }
  }

  getAllMessages() {
    this.messageService.getAllMessages().subscribe({
      next: (messages) => this.allMessages = messages,
      error: (err) => console.error('Erreur chargement messages', err)
    });
  }

  sendMessage() {
    this.messageService.sendMessage(this.message as Message).subscribe({
      next: () => {
        this.message = {};
        this.messageSent = true;
        setTimeout(() => this.messageSent = false, 4000);
        if (this.isAdmin) this.getAllMessages();
      },
      error: (err) => console.error('Erreur envoi', err)
    });
  }

  countNotRead() {
    this.messageService.countNotRead().subscribe({
      next: (count) => this.notReadCount = count,
      error: (err) => console.error(err)
    });
  }

  markedRead(id: number) {
    this.messageService.markedRead(id).subscribe({
      next: () => {
        this.getAllMessages();
        this.countNotRead();
      },
      error: (err) => console.error(err)
    });
  }
}