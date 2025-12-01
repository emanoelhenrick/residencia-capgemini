import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs/operators'; // ✅ Importe de 'rxjs/operators'
import { Observable, Subject,  throwError } from 'rxjs'; // ✅ Adicione estes imports

interface Usuario {
  name: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'],
})
export class Auth implements OnInit, OnDestroy {
  form!: FormGroup;
  private destroy$ = new Subject<void>();
  
  @Input() mode: 'login' | 'signup' = 'login';
  
  IsLoginMode = true;
  isLoading = false;
  initialized = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public bsModalRef: BsModalRef,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Inicialização síncrona
    this.IsLoginMode = this.mode === 'login';
    this.setupForm();
    this.initialized = true;
    
    // Força detecção de mudanças após um tick
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupForm(): void {
    if (this.IsLoginMode) {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['HOST']
      });
    }
  }

  fecharModal(): void {
    this.bsModalRef.hide();
  }

  toggleMode(): void {
    this.IsLoginMode = !this.IsLoginMode;
    
    // Reconfigura o formulário
    this.setupForm();
    
    // Força detecção de mudanças
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  onSubmit(): void {
    console.log("Form enviado");

    if (this.form.invalid) {
      // Marca todos os campos como tocados para mostrar erros
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    
    const formValue = this.form.value;

    if (this.IsLoginMode) {
      const { email, password } = formValue;
      
      this.auth.login(email, password)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (success: boolean) => {
            this.isLoading = false;
            if (success) {
              console.log('✅ Login bem-sucedido!');
              // Fecha o modal
              this.bsModalRef.hide();
              // Recarrega a página para atualizar estado
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }
          },
          error: (err: any) => { // ✅ TIPO EXPLÍCITO
            this.isLoading = false;
            console.error('Login falhou', err);
            alert('Credenciais inválidas. Tente novamente.');
            this.cdr.detectChanges();
          },
        });
    } else {
      const { name, email, password, role } = formValue;
      
     this.auth.register(name, email, password, role)
  .pipe(takeUntil(this.destroy$))
  .subscribe({
    next: (success: boolean) => {
      this.isLoading = false;
      if (success) {
        alert('Registro bem-sucedido! Agora você pode fazer login.');
        this.toggleMode();
      }
    },
    error: (err: any) => {
      this.isLoading = false;
      console.error('Registro falhou', err);
      alert('Falha no registro. Tente novamente.');
      this.cdr.detectChanges();
    },
  });
  }

}
}