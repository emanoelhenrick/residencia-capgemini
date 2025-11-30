import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AccommodationsService } from '../../services/accommodationsservice';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Hotel } from '../hotel/hotel';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, Hotel],
  templateUrl: './room.html',
  styleUrls: ['./room.css'],
})
export class Room implements OnInit {
  public response: any[] = [];
  public accommodation: any = null; // Mudei o nome para ficar mais claro
  public rooms: any[] = [];
  public room: any = null; // quarto individual passado via initialState
  public selectedRoom: any = null; // room selecionado para ver detalhes
  public id: string = '';
  public loading = false;
  public error = false;

  constructor(
    private accommodationsService: AccommodationsService,
    private cdr: ChangeDetectorRef,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    // debug logs to inspect what initialState was merged
    if (this.room) {
      console.log('Room modal initialized with single room:', this.room);
    }
    if (this.rooms && this.rooms.length > 0) {
      console.log('Room modal initialized with rooms array:', this.rooms);
    }
    
    // ngx-bootstrap merges `initialState` into the component instance before ngOnInit
    // If rooms were passed in initialState, use them directly (no extra fetch)
    if (this.rooms && this.rooms.length > 0) {
      this.accommodation = this.accommodation || {};
      this.accommodation.rooms = this.rooms;
      // Se um quarto específico foi clicado, pré-seleciona ele
      if (this.room) {
        this.selectedRoom = this.room;
      }
      this.cdr.detectChanges();
      return;
    }

    // Se apenas um quarto foi passado (sem o array completo), mostra só ele
    if (this.room) {
      this.selectedRoom = this.room;
      this.accommodation = this.accommodation || {};
      this.accommodation.rooms = [this.room];
      this.cdr.detectChanges();
      return;
    }

    if (this.accommodation && this.accommodation.id) {
      this.fetchRoombyId(this.accommodation.id);
    } else if (this.id) {
      this.fetchRoombyId(this.id);
    }
  }

  public close(): void {
    this.bsModalRef?.hide();
  }
  
  public fetchRoombyId(id: string): void {
    this.loading = true;
    this.error = false;
    console.log('Buscando quartos para o ID:', id);

    this.accommodationsService.getAccommodationByRoom(id).subscribe({
      next: (data: any) => {
        // A API retorna um array, então pegamos o primeiro item
        if (Array.isArray(data) && data.length > 0) {
          this.accommodation = data[0]; // Pega o primeiro objeto do array
          console.log('Acomodação encontrada:', this.accommodation);
          console.log('Quartos encontrados:', this.accommodation?.rooms?.length || 0);
        } else {
          this.accommodation = data;
          console.log('Acomodação encontrada (objeto direto):', this.accommodation);
        }
        
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Erro ao buscar detalhes da acomodação:', error);
        this.loading = false;
        this.error = true;
        this.cdr.detectChanges();
      }
    });
  }

  abrirModalHotel(): void {
  if (!this.accommodation) return;
  
  // Fecha o modal atual de quarto
  this.bsModalRef?.hide();
  
  // Busca todos os quartos do hotel para passar ao modal
  this.accommodationsService.getAccommodationByRoom(this.accommodation.id).subscribe({
    next: (roomsData: any) => {
      const hotelData: any = { hotel: { ...this.accommodation } };
      
      // Anexa todos os quartos ao objeto do hotel
      if (Array.isArray(roomsData)) {
        hotelData.hotel.rooms = roomsData;
      } else if (roomsData && roomsData.rooms) {
        hotelData.hotel.rooms = roomsData.rooms;
      } else {
        hotelData.hotel.rooms = roomsData;
      }
      
      console.log('Abrindo Hotel modal com todos os quartos:', hotelData);
      this.bsModalRef = this.modalService.show(Hotel, {
        initialState: hotelData,
        class: 'modal-lg'
      });
    },
    error: (err: any) => {
      console.error('Erro ao buscar quartos do hotel:', err);
      // Se falhar, abre o modal só com os dados que temos
      const hotelData = { hotel: this.accommodation };
      this.bsModalRef = this.modalService.show(Hotel, {
        initialState: hotelData,
        class: 'modal-lg'
      });
    }
  });
}
}