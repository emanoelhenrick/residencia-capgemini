// home.ts - CORREÇÃO DO LOGOUT
import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Auth } from '../auth/auth';
import { Accommodations } from '../accommodations/accommodations';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [Auth, Accommodations, CommonModule, LucideAngularModule],
})
export class Home {
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, public authService: AuthService) {}

  abrirModalAuth(mode: 'login' | 'signup'): void {
    this.bsModalRef = this.modalService.show(Auth, {
      initialState: { mode } as any,
    });
  }

  logout(): void {
    console.log('🚪 Iniciando logout...');
    
    this.authService.logout().subscribe({
      next: () => {
        console.log('✅ Logout realizado com sucesso!');
        // Recarrega a página para atualizar o estado
        setTimeout(() => {
          window.location.reload();
        }, 100);
      },
      error: (err) => {
        console.error('Erro no logout:', err);
        // Mesmo com erro, recarregue para limpar o estado
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    });
  }

  verificarStatus(): void {
    console.log('🔐 Status atual:', this.authService.isAuthenticated() ? 'LOGADO' : 'DESLOGADO');
    console.log('👤 Usuário:', this.authService.getCurrentUser());
  }
}