import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Auth } from '../auth/auth';
import { Accommodations } from '../accommodations/accommodations';


@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [Auth, Accommodations]
})
export class Home {
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  abrirModal(mode: 'login' | 'signup'): void {
    this.bsModalRef = this.modalService.show(Auth, {
      initialState: { mode } as any,
    });
  }
}
