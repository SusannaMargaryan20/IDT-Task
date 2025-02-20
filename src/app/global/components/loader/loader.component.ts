import { Component, inject } from '@angular/core';
import { LoadingServiceService } from '../../../api/helpers/loading-service.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  loadingService = inject(LoadingServiceService);
}
