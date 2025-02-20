export interface BanckAccountsResModel {
    img?: string;
    accountNumber: number;
    accountType: string;
    currency: string;
    balance: number;
    isShowAccountNumber: boolean;
    isShowBalance: boolean;
}