import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReservationService } from '../../services/reservation.service';
import { LucideAngularModule } from 'lucide-angular';
import { Auth } from '../auth/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule]
})
export class Reservation implements OnInit, AfterViewInit, OnDestroy {
  @Input() room: any;
  @Input() accommodation: any;
  
  currentStep: number = 1;
  steps = ['Datas', 'Hóspedes', 'Confirmação'];
  
  // Dados do formulário
  reservationData = {
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    paymentMethod: 'on_site'
  };
  
  // Estado
  loading: boolean = false;
  errorMessage: string = '';
  isAuthenticated: boolean = false;
  isInitialized: boolean = false;
  
  // Calendário
  currentMonth: Date = new Date();
  checkInCalendar: boolean = false;
  checkOutCalendar: boolean = false;
  selectedCheckIn: Date | null = null;
  selectedCheckOut: Date | null = null;
  
  // Resumo
  totalNights: number = 0;
  roomTotal: number = 0;
  serviceFee: number = 0;
  totalAmount: number = 0;

  // Dias da semana
  weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  private initializationTimeout: any;
  
  constructor(
    public bsModalRef: BsModalRef,
    private reservationService: ReservationService,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef,
    public authService: AuthService // ✅ Já injetado corretamente
  ) {}

  ngOnInit(): void {
    console.log('✅ AuthService injetado:', this.authService);
    console.log('✅ Usuário atual:', this.authService.getCurrentUser());
    console.log('✅ Autenticado?', this.authService.isAuthenticated());
    
      this.checkAuthentication();
    
    this.initializationTimeout = setTimeout(() => {
      this.initializeComponent();
    }, 0);

  }

  private checkAuthentication(): void {
    console.log('🔐 Verificando autenticação...');
    
    // Verificar se o authService existe
    if (!this.authService) {
      console.error('❌ AuthService não foi injetado!');
      this.isAuthenticated = false;
      return;
    }
    
    // Usar o método isAuthenticated() do serviço
    this.isAuthenticated = this.authService.isAuthenticated();
    
    console.log('🔐 Resultado da verificação:', {
      isAuthenticated: this.isAuthenticated,
      currentUser: this.authService.getCurrentUser(),
      token: this.authService.getAccessToken()?.substring(0, 20) + '...'
    });
    
    // Se não estiver autenticado, mostrar mensagem
    if (!this.isAuthenticated) {
      this.errorMessage = 'Você precisa estar logado para fazer uma reserva.';
      console.log('⚠️ Usuário não autenticado:', this.errorMessage);
    }
  }

    // ✅ IMPLEMENTE ESTE MÉTODO (AfterViewInit)
  ngAfterViewInit(): void {
    console.log('✅ ngAfterViewInit executado');
    this.cdr.detectChanges();
  }

  // ✅ IMPLEMENTE ESTE MÉTODO (OnDestroy)
  ngOnDestroy(): void {
    console.log('✅ ngOnDestroy executado');
    if (this.initializationTimeout) {
      clearTimeout(this.initializationTimeout);
    }
  }


  private initializeComponent(): void {
    // ✅ Use o AuthService diretamente
    this.isAuthenticated = this.authService.isAuthenticated();
    
    if (this.isAuthenticated) {
      this.loadUserData();
      this.setDefaultDates();
      this.calculateTotal();
    } else {
      this.errorMessage = 'Você precisa estar logado para fazer uma reserva.';
    }
    
    this.isInitialized = true;
    this.cdr.detectChanges();
  }

  loadUserData(): void {
    // ✅ Use o AuthService para obter dados do usuário
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.reservationData.guestEmail = currentUser.email || '';
      this.reservationData.guestName = currentUser.name || '';
    }
    
    // Se ainda precisar do localStorage como fallback:
    const userData = localStorage.getItem('usuariologado'); // ✅ Nome correto
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.reservationData.guestName = user.name || user.fullName || this.reservationData.guestName;
        this.reservationData.guestEmail = user.email || this.reservationData.guestEmail;
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }
  }
  

  setDefaultDates(): void {
    const today = new Date();
    const checkOut = new Date(today);
    checkOut.setDate(today.getDate() + 3);
    
    this.selectedCheckIn = today;
    this.selectedCheckOut = checkOut;
    
    this.reservationData.checkIn = this.formatDate(today);
    this.reservationData.checkOut = this.formatDate(checkOut);
    
    this.calculateTotal();
    this.cdr.detectChanges();
  }

  // ========== MÉTODO PARA ABRIR MODAL DE LOGIN ==========
// reservation.component.ts - método corrigido
openLoginModal(): void {
  // Fechar modal de reserva primeiro
  this.bsModalRef.hide();
  
  // Aguardar um pouco antes de abrir o modal de login
  setTimeout(() => {
    const modalRef = this.modalService.show(Auth, {
      initialState: {
        mode: 'login'
      },
      class: 'modal-dialog-centered'
    });
    
    // ✅ Quando o login for bem-sucedido, reabra o modal de reserva
    if (modalRef.content) {
      // Você pode adicionar um evento de login bem-sucedido aqui
      // Ou recarregar a página após login
    }
  }, 300);
}

  // ========== FORMATAÇÃO DE DATAS ==========
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getShortDate(dateString: string): string {
    if (!dateString) return '--';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '--';
      
      return date.getDate().toString();
    } catch (error) {
      return '--';
    }
  }

  formatBrazilianDate(dateString: string): string {
    if (!dateString) return '--/--/----';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '--/--/----';
      
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return '--/--/----';
    }
  }

  // ========== NAVEGAÇÃO DOS PASSOS ==========
  nextStep(): void {
    if (this.currentStep < 3 && this.isStepValid()) {
      this.currentStep++;
      this.calculateTotal();
      this.cdr.detectChanges();
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.cdr.detectChanges();
    }
  }

  isStepValid(): boolean {
    if (!this.isAuthenticated) return false;

    switch (this.currentStep) {
      case 1:
        return !!this.reservationData.checkIn && 
               !!this.reservationData.checkOut &&
               new Date(this.reservationData.checkOut) > new Date(this.reservationData.checkIn);
      case 2:
        const emailValid = !!this.reservationData.guestEmail && 
                          this.isValidEmail(this.reservationData.guestEmail);
        const nameValid = !!this.reservationData.guestName?.trim();
        const phoneValid = !!this.reservationData.guestPhone?.trim() && 
                          this.isValidPhone(this.reservationData.guestPhone);
        return emailValid && nameValid && phoneValid;
      case 3:
        return true;
      default:
        return false;
    }
  }

  // ========== VALIDAÇÕES ==========
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10;
  }

  // ========== CÁLCULO DE PREÇOS ==========
  calculateTotal(): void {
    if (this.reservationData.checkIn && this.reservationData.checkOut) {
      const checkIn = new Date(this.reservationData.checkIn);
      const checkOut = new Date(this.reservationData.checkOut);
      
      if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
        this.resetTotals();
        return;
      }

      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      this.totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (this.totalNights < 1) {
        this.totalNights = 1;
      }
      
      const roomPrice = this.room?.pricePerNight || 250;
      this.roomTotal = roomPrice * this.totalNights;
      this.serviceFee = this.roomTotal * 0.10;
      this.totalAmount = this.roomTotal + this.serviceFee;
      
      this.cdr.detectChanges();
    } else {
      this.resetTotals();
    }
  }

  private resetTotals(): void {
    this.totalNights = 0;
    this.roomTotal = 0;
    this.serviceFee = 0;
    this.totalAmount = 0;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(value);
  }

confirmReservation(): void {
    console.log('🔍 DIAGNÓSTICO DE USUÁRIO:');
  
  // Obter usuário atual
  const currentUser = this.authService.getCurrentUser();
  console.log('👤 Usuário atual:', {
    email: currentUser?.email,
    id: currentUser?.id,
    role: currentUser?.role,
    name: currentUser?.name
  });
  
  // Verificar token
  const token = this.authService.getAccessToken();
  console.log('🔐 Token (primeiros 100 chars):', token?.substring(0, 100) + '...');
  
  if (token) {
    try {
      // Decodificar token para ver payload
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('🔍 Payload do token:', payload);
    } catch (error) {
      console.error('❌ Erro ao decodificar token:', error);
    }
  }
  console.log('✅ CONFIRMAR RESERVA - Iniciando...');
  
  // Verificar autenticação novamente
  this.checkAuthentication();
  
  if (!this.isAuthenticated) {
    console.error('❌ Usuário não autenticado!');
    this.errorMessage = 'Você precisa estar logado para fazer uma reserva.';
    alert('Por favor, faça login para continuar.');
    this.openLoginModal();
    return;
  }
  
  if (!this.isStepValid()) {
    const errorMsg = 'Por favor, preencha todos os campos obrigatórios corretamente.';
    console.error('❌ Formulário inválido:', errorMsg);
    alert(errorMsg);
    return;
  }

  console.log('🔍 Verificando autenticação com reservationService...');
  
  // Verificar autenticação com o reservationService também
  if (!this.reservationService.isUserAuthenticated()) {
    console.error('❌ ReservationService não reconhece usuário autenticado');
    this.errorMessage = 'Sessão expirada. Por favor, faça login novamente.';
    alert('Sessão expirada. Por favor, faça login novamente.');
    this.openLoginModal();
    return;
  }

  // Preparar dados para a API
  const reservationData = {
    roomId: this.room?.id,
    initialDate: this.reservationData.checkIn,
    finalDate: this.reservationData.checkOut,
    specialRequests: this.reservationData.specialRequests,
    guests: this.reservationData.guests,
    guestName: this.reservationData.guestName,
    guestPhone: this.reservationData.guestPhone,
    paymentMethod: this.reservationData.paymentMethod
  };

  console.log('📤 Enviando dados da reserva:', reservationData);

  // Mostrar loading
  this.loading = true;
  this.errorMessage = '';
  this.cdr.detectChanges();

  // Chamar o serviço
  this.reservationService.createReservation(reservationData).subscribe({
    next: (response) => {
      console.log('✅ Reserva criada com sucesso:', response);
      this.loading = false;
      
      // Mostrar mensagem de sucesso mais elaborada
      this.showSuccessMessage(response);
      
      // Fechar modal após um tempo
      setTimeout(() => {
        this.bsModalRef.hide();
        
        // Recarregar a página para atualizar o estado
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }, 3000); // Dar tempo para o usuário ler a mensagem
    },
    error: (error) => {
      console.error('❌ Erro ao criar reserva:', error);
      this.loading = false;
      this.handleReservationError(error);
      this.cdr.detectChanges();
    }
  });
}

private showSuccessMessage(response: any): void {
  // Criar um modal de sucesso mais bonito
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;
  
  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 10px;
    max-width: 500px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  `;
  
  content.innerHTML = `
    <div style="font-size: 60px; color: #4CAF50; margin-bottom: 20px;">✓</div>
    <h2 style="color: #4CAF50; margin-bottom: 15px;">Reserva Confirmada!</h2>
    <p style="margin-bottom: 20px;">Sua reserva foi realizada com sucesso.</p>
    
    <div style="text-align: left; background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p><strong>Código da Reserva:</strong> ${response.id || 'N/A'}</p>
      <p><strong>Status:</strong> ${response.status || 'Confirmada'}</p>
      <p><strong>Check-in:</strong> ${this.formatBrazilianDate(this.reservationData.checkIn)}</p>
      <p><strong>Check-out:</strong> ${this.formatBrazilianDate(this.reservationData.checkOut)}</p>
      <p><strong>Total:</strong> ${this.formatCurrency(this.totalAmount)}</p>
      <p><strong>Hóspede:</strong> ${this.reservationData.guestName}</p>
    </div>
    
    <p style="color: #666; font-size: 14px;">
      Um email de confirmação foi enviado para ${this.reservationData.guestEmail}
    </p>
    
    <button id="closeSuccessModal" 
            style="background: #4CAF50; color: white; border: none; padding: 10px 20px; 
                   border-radius: 5px; cursor: pointer; margin-top: 20px; font-size: 16px;">
      Fechar
    </button>
  `;
  
  modal.appendChild(content);
  document.body.appendChild(modal);
  
  // Adicionar evento para fechar o modal
  content.querySelector('#closeSuccessModal')?.addEventListener('click', () => {
    document.body.removeChild(modal);
    this.bsModalRef.hide();
    window.location.reload();
  });
  
  // Fechar automaticamente após 5 segundos
  setTimeout(() => {
    if (document.body.contains(modal)) {
      document.body.removeChild(modal);
      this.bsModalRef.hide();
      window.location.reload();
    }
  }, 5000);
}
  private handleReservationError(error: any): void {
    let errorMessage = 'Erro ao realizar reserva. Tente novamente.';
    
    if (error.message.includes('já reservado') || error.message.includes('409')) {
      errorMessage = 'Este quarto já está reservado para as datas selecionadas. Por favor, escolha outras datas.';
    } else if (error.message.includes('Datas inválidas') || error.message.includes('422')) {
      errorMessage = 'Datas inválidas. Verifique se as datas estão corretas.';
    } else if (error.message.includes('Não autorizado') || error.message.includes('401')) {
      errorMessage = 'Sessão expirada. Por favor, faça login novamente.';
      this.openLoginModal();
      return;
    } else if (error.message.includes('Usuário não autenticado')) {
      errorMessage = 'Você precisa estar logado para fazer uma reserva.';
      this.openLoginModal();
      return;
    }
    
    this.errorMessage = errorMessage;
    alert(`❌ ${errorMessage}`);
  }

  // ========== CALENDÁRIO ==========
  getDaysInMonth(year: number, month: number): Date[] {
    const date = new Date(year, month, 1);
    const days: Date[] = [];
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(firstDay);
      prevDate.setDate(prevDate.getDate() - (i + 1));
      days.push(prevDate);
    }
    
    const currentDate = new Date(firstDay);
    while (currentDate <= lastDay) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const nextMonthDate = new Date(lastDay);
    nextMonthDate.setDate(nextMonthDate.getDate() + 1);
    while (days.length < 42) {
      days.push(new Date(nextMonthDate));
      nextMonthDate.setDate(nextMonthDate.getDate() + 1);
    }
    
    return days;
  }

  getMonthName(date: Date): string {
    return `${this.monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }

  prevMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
    this.cdr.detectChanges();
  }

  nextMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.cdr.detectChanges();
  }

  selectDate(date: Date): void {
    if (this.isDateDisabled(date)) return;

    const dateStr = this.formatDate(date);
    
    if (!this.selectedCheckIn || (this.selectedCheckIn && this.selectedCheckOut)) {
      this.selectedCheckIn = date;
      this.selectedCheckOut = null;
      this.reservationData.checkIn = dateStr;
      this.reservationData.checkOut = '';
    } else if (this.selectedCheckIn && !this.selectedCheckOut) {
      if (date > this.selectedCheckIn) {
        this.selectedCheckOut = date;
        this.reservationData.checkOut = dateStr;
      } else {
        this.selectedCheckOut = this.selectedCheckIn;
        this.selectedCheckIn = date;
        this.reservationData.checkOut = this.reservationData.checkIn;
        this.reservationData.checkIn = dateStr;
      }
      this.calculateTotal();
    }
    
    this.checkInCalendar = false;
    this.checkOutCalendar = false;
    this.cdr.detectChanges();
  }

  getDayClass(date: Date): string {
    const classes = ['calendar-day'];
    
    if (this.isDateSelected(date)) {
      classes.push('selected');
    } else if (this.isDateInRange(date)) {
      classes.push('in-range');
    } else if (this.isDateDisabled(date)) {
      classes.push('disabled');
    } else if (date.getMonth() !== this.currentMonth.getMonth()) {
      classes.push('other-month');
    }
    
    return classes.join(' ');
  }

  isDateSelected(date: Date): boolean {
    if (!this.selectedCheckIn && !this.selectedCheckOut) return false;
    
    const dateStr = this.formatDate(date);
    const checkInStr = this.selectedCheckIn ? this.formatDate(this.selectedCheckIn) : '';
    const checkOutStr = this.selectedCheckOut ? this.formatDate(this.selectedCheckOut) : '';
    
    return dateStr === checkInStr || dateStr === checkOutStr;
  }

  isDateInRange(date: Date): boolean {
    if (!this.selectedCheckIn || !this.selectedCheckOut) return false;
    
    const dateTime = date.getTime();
    const checkInTime = this.selectedCheckIn.getTime();
    const checkOutTime = this.selectedCheckOut.getTime();
    
    return dateTime > checkInTime && dateTime < checkOutTime;
  }

  isDateDisabled(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    return checkDate < today;
  }

  // ========== CONTROLE DE HÓSPEDES ==========
  incrementGuests(): void {
    const maxCapacity = this.room?.capacity || 4;
    if (this.reservationData.guests < maxCapacity) {
      this.reservationData.guests++;
      this.cdr.detectChanges();
    }
  }

  decrementGuests(): void {
    if (this.reservationData.guests > 1) {
      this.reservationData.guests--;
      this.cdr.detectChanges();
    }
  }

  // ========== FORMATAÇÃO DE TELEFONE ==========
  formatPhone(event: any): void {
    let phone = event.target.value.replace(/\D/g, '');
    
    if (phone.length > 11) {
      phone = phone.substring(0, 11);
    }
    
    if (phone.length > 10) {
      phone = phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (phone.length > 6) {
      phone = phone.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (phone.length > 2) {
      phone = phone.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (phone.length > 0) {
      phone = phone.replace(/^(\d{0,2})$/, '($1');
    }
    
    this.reservationData.guestPhone = phone;
    this.cdr.detectChanges();
  }
}