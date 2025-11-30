import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationsService } from '../../services/accommodationsservice';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.html',
  styleUrls: ['./accommodations.css'],
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
})
export class Accommodations implements OnInit {
  public response: any[] = [];

  constructor(
    private accommodationsService: AccommodationsService,
    private cdr: ChangeDetectorRef
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

  quantItens(): number {
    return this.response ? this.response.length : 0;
  }
}
