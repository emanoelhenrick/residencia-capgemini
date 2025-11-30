import { Component, ChangeDetectorRef } from '@angular/core';
import { AccommodationsService } from '../../services/accommodationsservice';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-room',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class Room  {
  public id: string = '';
  public response: any[] = [];
  public accommodation: any = null; // Mudei o nome para ficar mais claro
  public loading = false;
  public error = false;
  bsModalRef?: BsModalRef;

  constructor( 
    private accommodationsService: AccommodationsService,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService
  ) {
    const modalServiceAny = this.modalService as any;
    const initialState = modalServiceAny?._config?.initialState || 
                        modalServiceAny?.config?.initialState;
    
    if (initialState && initialState.id) {
      this.id = String(initialState.id);
      console.log('ID definido:', this.id);
      this.fetchRoombyId(this.id);
    }
  }
  
  public fetchRoombyId(id: string): void {
    this.loading = true;
    this.error = false;
    
    console.log('Buscando quartos para o ID:', id);
    
    this.accommodationsService.getAccommodationById(id).subscribe({
      next: (data) => {
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
      error: (error) => {
        console.error('Erro ao buscar detalhes da acomodação:', error);
        this.loading = false;
        this.error = true;
        this.cdr.detectChanges();
      }
    });
  }
}