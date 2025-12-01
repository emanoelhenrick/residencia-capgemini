import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccommodationsService } from '../../services/accommodationsservice';

interface RoomFilter {
  vibe?: string[];
  amenities?: string[];
  initialPrice?: number;
  endPrice?: number;
  Location?: string;
  minimumRating?: number;
}

interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  vibe: string[];
  amenities: string[];
  accommodation: {
    id: string;
    name: string;
    location: string;
    rating: number;
  };
}

@Component({
  selector: 'app-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter implements OnInit {
  filteredRooms: Room[] = [];
  loading = false;
  error: string | null = null;

  // Filtros
  selectedVibes: string[] = [];
  selectedAmenities: string[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;
  location: string = '';
  minRating: number = 0;

  // Opções disponíveis
  vibes: string[] = ['Cozy', 'Luxury', 'Modern', 'Rustic', 'Family-friendly'];
  amenities: string[] = ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Parking', 'AC'];

  constructor(private accommodationsService: AccommodationsService) {}

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    this.loading = true;
    this.error = null;

    const filter: RoomFilter = {
      vibe: this.selectedVibes.length > 0 ? this.selectedVibes : undefined,
      amenities: this.selectedAmenities.length > 0 ? this.selectedAmenities : undefined,
      initialPrice: this.minPrice > 0 ? this.minPrice : 0,
      endPrice: this.maxPrice > 0 ? this.maxPrice : 0,
      Location: this.location && this.location.trim() ? this.location : undefined,
      minimumRating: this.minRating > 0 ? this.minRating : 0,
    };

    // Fazer requisição POST para o endpoint de filtro
    this.accommodationsService.filterRooms(filter).subscribe({
      next: (rooms: Room[]) => {
        this.filteredRooms = rooms;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao filtrar quartos:', error);
        this.error = 'Erro ao filtrar quartos. Tente novamente.';
        this.loading = false;
      },
    });
  }

  toggleVibe(vibe: string) {
    const index = this.selectedVibes.indexOf(vibe);
    if (index > -1) {
      this.selectedVibes.splice(index, 1);
    } else {
      this.selectedVibes.push(vibe);
    }
    this.applyFilters();
  }

  toggleAmenity(amenity: string) {
    const index = this.selectedAmenities.indexOf(amenity);
    if (index > -1) {
      this.selectedAmenities.splice(index, 1);
    } else {
      this.selectedAmenities.push(amenity);
    }
    this.applyFilters();
  }

  onPriceChange() {
    this.applyFilters();
  }

  onLocationChange() {
    this.applyFilters();
  }

  onRatingChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.selectedVibes = [];
    this.selectedAmenities = [];
    this.minPrice = 0;
    this.maxPrice = 0;
    this.location = '';
    this.minRating = 0;
    this.applyFilters();
  }
}
