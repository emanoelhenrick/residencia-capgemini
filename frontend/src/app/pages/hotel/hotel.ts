import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AccommodationsService } from '../../services/accommodationsservice';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Room } from '../room/room';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Room],
  templateUrl: './hotel.html',
  styleUrl: './hotel.css',
})
export class Hotel implements OnInit {
  public hotel: any = null;
  public loading = false;
  public error = false;
  public hotelId: string = '';

  constructor(
    private accommodationsService: AccommodationsService,
    private cdr: ChangeDetectorRef,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    // Se temos o objeto hotel completo, usamos diretamente
    if (this.hotel) {
      console.log('Hotel recebido completo:', this.hotel);
      return;
    }
    
    // Se temos apenas o ID, buscamos os detalhes
    if (this.hotelId) {
      this.fetchHotelDetails(this.hotelId);
    }
  }

  public close(): void {
    this.bsModalRef?.hide();
  }

  fetchHotelDetails(id: string): void {
    this.loading = true;
    this.error = false;

    // Primeiro busca os dados básicos do hotel
    this.accommodationsService.getAccommodationById(id).subscribe({
      next: (data: any) => {
        this.hotel = data || {};
        // Em seguida busca os quartos do hotel e anexa em hotel.rooms
        this.accommodationsService.getAccommodationByRoom(id).subscribe({
          next: (roomsData: any) => {
            // A API pode retornar diretamente um array de quartos
            if (Array.isArray(roomsData)) {
              this.hotel.rooms = roomsData;
            } else if (roomsData && roomsData.rooms) {
              this.hotel.rooms = roomsData.rooms;
            } else {
              // fallback: atribui roomsData diretamente
              this.hotel.rooms = roomsData;
            }

            this.loading = false;
            this.cdr.detectChanges();
          },
          error: (err: any) => {
            console.error('Erro ao buscar quartos do hotel:', err);
            // mesmo se falhar, mostramos os dados do hotel (sem quartos)
            this.loading = false;
            this.error = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: (error: any) => {
        console.error('Erro ao buscar detalhes do hotel:', error);
        this.loading = false;
        this.error = true;
        this.cdr.detectChanges();
      }
    });
  }

  abrirModalRoom(accommodation: any, room?: any): void {
      const initialState: any = {
        id: accommodation?.id,
        accommodation,
        rooms: accommodation?.rooms ?? []
      };
  
      if (room) {
        initialState.room = room; // passa um quarto específico quando solicitado
      }
  
      console.log('Abrindo Room modal com initialState:', initialState);
      this.bsModalRef = this.modalService.show(Room, { initialState });
  
      setTimeout(() => {
        this.cdr.detectChanges();
      });
    }
}