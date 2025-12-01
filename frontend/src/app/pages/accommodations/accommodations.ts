import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationsService } from '../../services/accommodationsservice';
import { FilteredRoomsService } from '../../services/filteredrooms.service';
import { LucideAngularModule } from 'lucide-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Room } from '../room/room';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.html',
  styleUrls: ['./accommodations.css'],
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Room],
})
export class Accommodations implements OnInit {
  public response: any[] = [];
  public roomsList: any[] = [];
  public displayedRooms: any[] = [];
  bsModalRef?: BsModalRef;

  constructor(
    private accommodationsService: AccommodationsService,
    private filteredRoomsService: FilteredRoomsService,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.fetchAccommodations();
    
    // Escutar mudanças nos quartos filtrados
    this.filteredRoomsService.filteredRooms$.subscribe((filteredRooms) => {
      if (filteredRooms && filteredRooms.length > 0) {
        this.displayedRooms = filteredRooms;
      } else {
        this.displayedRooms = this.roomsList;
      }
      this.cdr.detectChanges();
    });
  }

  public fetchAccommodations(): void {
    this.accommodationsService.getAccommodations().subscribe(
      (data) => {
        this.response = data;
        // achatar lista de quartos incluindo referência à acomodação
        this.roomsList = [];
        for (const acc of this.response) {
          const rooms = acc.rooms ?? [];
          for (const r of rooms) {
            // anexa referência à acomodação para cada quarto
            this.roomsList.push({ ...r, accommodation: acc });
          }
        }
        // Inicializar com todos os quartos
        this.displayedRooms = this.roomsList;
        console.log('Array de acomodações:', this.response);
        console.log('Lista de quartos (achatada):', this.roomsList);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erro ao buscar acomodações:', error);
      }
    );
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

  quantItens(): number {
    return this.roomsList ? this.roomsList.length : 0;
  }
}
