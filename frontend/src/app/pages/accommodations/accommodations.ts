import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationsService } from '../../services/accommodationsservice';
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
  bsModalRef?: BsModalRef;

  constructor(
    private accommodationsService: AccommodationsService,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.fetchAccommodations();
  }

  public fetchAccommodations(): void {
    this.accommodationsService.getAccommodations().subscribe(
      (data) => {
        this.response = data; 
        console.log('Array de acomodações:', this.response);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erro ao buscar acomodações:', error);
      }
    );
  }

  abrirModalRoom(accommodation: any): void {
    const initialState = {
      id: accommodation.id // Extrai apenas o ID do objeto accommodation
   };
  
    this.bsModalRef = this.modalService.show(Room, { initialState });

      setTimeout(() => {
    this.cdr.detectChanges();
  });
  }

  quantItens(): number {
    return this.response ? this.response.length : 0;
  }
}
