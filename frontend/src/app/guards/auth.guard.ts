import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Using functional guard (CanActivateFn) with inject to keep things standalone-friendly
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  if (auth.isAuthenticated()) {
    return true;
  }
  // Not authenticated: redirect to root (or show modal)
  router.navigate(['/']);
  return false;
};
