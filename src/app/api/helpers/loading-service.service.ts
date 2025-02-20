import { computed, Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {

  private activeRequests = signal(0); 
  isLoading: Signal<boolean> = computed(() => this.activeRequests() > 0); 

  show() {
    this.activeRequests.set(this.activeRequests() + 1);
  }

  hide() {
    if (this.activeRequests() > 0) {
      this.activeRequests.set(this.activeRequests() - 1);
    }
  }
}
