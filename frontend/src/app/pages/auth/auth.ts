import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';

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
export class Auth implements OnInit {
  form!: FormGroup;
  
  private _mode: 'login'|'signup' = 'login';
  @Input()
  set mode(value: 'login'|'signup') {
    this._mode = value ?? 'login';
    this.IsLoginMode = this._mode === 'login';
  }
  get mode(): 'login'|'signup' {
    return this._mode;
  }
  IsLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public bsModalRef: BsModalRef,
    private auth: AuthService
  ) {}

  fecharModal(): void {
    this.bsModalRef.hide();
  }
  
  ngOnInit(): void {
    this.IsLoginMode = this.mode === 'login';
    this.setupForm(); 
  }
  setupForm():void {
    this.form = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)] ],
      role: ['']
    });
  }

  toggleMode(): void {
    this.IsLoginMode = !this.IsLoginMode;
  }

  onSubmit(): void{
    console.log("Form enviado")  

    if (this.form.invalid) {
      console.log('Form inválido!', this.form.value);
      Object.keys(this.form.controls).forEach(key => {
        const controlErrors = this.form.get(key)?.errors;
        if (controlErrors) {
          console.log(`Erro em ${key}:`, controlErrors);
          }
      });
      return;
    }

     

    const { name, email, password } = this.form.value;
    const role = 'HOST';

    if (this.IsLoginMode) {
      this.auth.login(email, password).subscribe({
        next: () => {
          this.auth.getUser$().pipe(take(1)).subscribe((user) => {
            if (user) {
              localStorage.setItem('usuariologado', JSON.stringify(user));
            }
            this.bsModalRef.hide();
          });
        },
        error: (err) => {
          console.error('Login falhou', err);
          alert('Credenciais inválidas. Tente novamente.');
        },
      });
    } else {
      this.auth.register(name, email, password, role).subscribe({
        next: () => {
          alert('Registro bem-sucedido! Agora você pode fazer login.');
          this.toggleMode();
          console.log(this.form.value);

        },
        error: (err) => {
          console.error('Registro falhou', err);
          alert('Falha no registro. Tente novamente.');
          console.log(this.form.value);
        },
        
      });
    }


  }
}
