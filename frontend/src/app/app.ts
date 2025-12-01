import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('Projeto2');

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
     // Verificar autenticação ao inicializar o app
    if (this.authService.isAuthenticated()) {
      console.log('Usuário já está logado ao inicializar app');
    }
  }
}
