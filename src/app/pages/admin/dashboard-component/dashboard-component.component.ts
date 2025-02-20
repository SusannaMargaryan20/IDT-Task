import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from "../../../global/pipes/translations.pipe";
import { BankAccountDetailInfoComponent } from "../../../global/components/bank-account-detail-info/bank-account-detail-info.component";
import { UserService } from '../../../api/user/user.service';
import { BanckAccountsResModel } from '../../../api/user/res/bank-accounts.res.model';
import { CommonModule, NgFor } from '@angular/common';
import { catchError, forkJoin, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-component',
  imports: [TranslatePipe, BankAccountDetailInfoComponent, NgFor, CommonModule],
  templateUrl: './dashboard-component.component.html',
  styleUrl: './dashboard-component.component.scss'
})
export class DashboardComponentComponent {
  bankAccounts = signal<BanckAccountsResModel[]>([]);
  additionalInfo = signal<string>('');
  destroy$ = new Subject();
  private userService = inject(UserService);


  ngOnInit() {
   this.fetchDataInParallel();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  fetchDataInParallel() {
      forkJoin({
        additionalInfo: this.userService.getAdditionalInfo().pipe(
          catchError(error => {
            console.error("Error fetching additional info:", error);
            return of(null);  // Return null or a fallback value
          })
        ),
        getTransactionInfo: this.userService.getTransactions().pipe(
          catchError(error => {
            console.error("Error fetching additional info:", error);
            return of(null);  // Return null or a fallback value
          })
        ),
        bankAccounts: this.userService.getBankAccounts().pipe(
          catchError(error => {
            console.error("Error fetching bank accounts:", error);
            return of(null);  // Return null or a fallback value
          })
        )
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ additionalInfo, bankAccounts }) => {
          // Set additional info if available
          if (additionalInfo && additionalInfo.message) {
            this.additionalInfo.set(additionalInfo.result.description);
          }
    
          // Set bank accounts if available
          if (bankAccounts && bankAccounts.message === "Success") {
            this.bankAccounts.set(
              bankAccounts.result.map((el: BanckAccountsResModel) => ({
                ...el,
                isShowAccountNumber: false,
                isShowBalance: false
              }))
            );
          }
        },
        error: (error) => console.error("Error in forkJoin:", error)
      });
  }
}
