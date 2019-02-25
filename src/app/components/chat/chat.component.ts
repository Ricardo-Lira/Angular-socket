import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{
  
  public texto = '';
  public mensajeSubscripcion: Subscription;
  elemento: HTMLElement;

  mensajes:any[] = [];

  constructor(public chatService:ChatService) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');
      this.mensajeSubscripcion = this.chatService.getMessages().subscribe(msg =>{
          
            
      this.mensajes.push(msg);

      setTimeout(()=>{
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50)
    })
  }

  ngOnDestroy(){
    this.mensajeSubscripcion.unsubscribe();
  }

  enviar(){

    if (this.texto.trim().length === 0) {
      return;
    }
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

}