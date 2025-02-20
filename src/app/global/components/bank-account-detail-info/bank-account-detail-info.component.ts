import { Component, Input } from '@angular/core';
import { BgImageDirective } from "../../directives/bg.img.directive";
import { BanckAccountsResModel } from '../../../api/user/res/bank-accounts.res.model';
import { TranslatePipe } from "../../pipes/translations.pipe";
import { MaskedInfoPipe } from "../../pipes/masked-info.pipe";

@Component({
  selector: 'app-bank-account-detail-info',
  imports: [BgImageDirective, TranslatePipe, MaskedInfoPipe],
  templateUrl: './bank-account-detail-info.component.html',
  styleUrl: './bank-account-detail-info.component.scss'
})
export class BankAccountDetailInfoComponent {

  @Input() data: BanckAccountsResModel = {} as BanckAccountsResModel;
}
