import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, InjectionToken, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AUTH_INTERCEPTOR_PROVIDER } from './interceptors/auth.interceptor';
import {   LucideAngularModule, 
  Users, 
  Bed, 
  Bath, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Building,
  DoorClosed,
  Moon,
  Euro,
  Eye,
  Edit,
  AlertCircle,
  RefreshCw,
  Compass,
  Info,
  Wifi,
  Coffee,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Plus,
  Minus } from 'lucide-angular';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
          LucideAngularModule.pick({ 
            Users, 
        Bed, 
        Bath,
        Calendar,
        CheckCircle,
        XCircle,
        Clock,
        Search,
        Filter,
        Download,
        Building,
        DoorClosed,
        Moon,
        Euro,
        Eye,
        Edit,
        AlertCircle,
        RefreshCw,
        Compass,
        Info,
        Wifi,
        Coffee,
        ArrowRight,
        ArrowLeft,
        Check,
        X,
        Plus,
        Minus
          })
        ),
    BsModalService,
    { provide: API_BASE_URL, useValue: 'http://localhost:8080/auth' },
    AUTH_INTERCEPTOR_PROVIDER
  ]
};
