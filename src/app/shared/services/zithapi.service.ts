import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../api.config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { KeycloakService } from 'keycloak-angular';
import {environment} from '../../../environments/environment';
import { createEditBankAccount } from '../../model/merchant/createBankAccount.model';
import { createParentMerchantModel } from '../../model/merchant/createParentMerchant.model';
import { UpdatePrimMerchant } from '../../model/update-prim-merchant';
import { UpdateSubMerchant } from '../../model/update-sub-merchant';
import { UpdateUserInfo } from '../../model/user-info';
import { FeedbackConfigAddRequest } from '../../model/feedback/config';



@Injectable({
  providedIn: 'root'
})
export class ZithapiService {
  private authToken: any;
  private getUsersURL = API_CONFIG.AUTH_BASE_URL + API_CONFIG.GETUSERS;
  private getUsersURLByPrim = API_CONFIG.AUTH_BASE_URL + API_CONFIG.GETUSERSBYPRIM;

  // KEYCLOAK
  private getUserIdURL = API_CONFIG.AUTH_BASE_URL + API_CONFIG.GETUSERID;
  private getUserRolesURL = API_CONFIG.AUTH_BASE_URL + API_CONFIG.GETUSERROLES;
  private getGroupIdURL = API_CONFIG.AUTH_BASE_URL + API_CONFIG.GETGROUPID;
  private getGroupNameURL = API_CONFIG.AUTH_BASE_URL + API_CONFIG.GETGROUPNAME;
  private getFullNameURL = API_CONFIG.AUTH_BASE_URL + API_CONFIG.GETFULLNAME;
  private logOutURL = API_CONFIG.AUTH_BASE_URL + API_CONFIG.LOGOUTUSER;

  private changeMerchantPasswordURL = API_CONFIG.AUTH_BASE_URL + API_CONFIG.CHANGEPASSWORD;
  private getMerchantsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETMERCHANTS;
  private getAllSubMerchantsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETALLSUBMERCHANTS;
  private getSubMerchantsURL = API_CONFIG.AUTH_BASE_URL + API_CONFIG.GETSUBMERCHANTS;
  private createUserURL = API_CONFIG.AUTH_BASE_URL + API_CONFIG.CREATEUSER;
  private createParentMerchantURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.CREATEMERCHANT;
  private createSubMerchantURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.CREATESUBMERCHANT;
  private getQrCodeURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETQR;
  private createQrCodeURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.CREATEQR;
  private getParentMerchantsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETPRIMARYMERCHANTS;
  private searchParentMerchantsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.SEARCHPRIMARYMERCHANTS;
  private getBankAccountURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETBANKACCOUNTS;
  private createBankAccountURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.ADDBANKACCOUNT;
  private activateDeactivateURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.ACTIVATEDEACTIVATE;
  private transactionsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETTRANSACTIONS;
  private refundsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETREFUNDS;
  private getSubMerchByparentURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETSUBMERCBYPARENT;

  private getTerminalIdByGroupidURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETTERMINALIDFROMGROUPID;

  private GETTERMINALIDSURL =  API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETTERMINALIDS;
  private SEARCHUTRIDURL =  API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.SEARCHUTRID;

  private updateParentMerchantURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.UPDATEPRIMARYMERCHANT;
  private updateSubMerchantURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.UPDATESUBMERCHANT;

  private getPrimMerchantDetailsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETPRIMARYMERCHANTDETAILS;
  private getSubMerchantDetailsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETSUBMERCHANTDETAILS;


  private changeSubMerchantConfURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.CHANGECONFIGURATIONS;
  private changeSubMerchantConfAllURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.CHANGECONFIGURATIONSALL;

  private getSubMerchantConfURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETCONFIGURATIONS;
  private updateUserInfoURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.UPDATEUSERINFO;

  private getDocumentsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETDOCUMENTS;
  private uploadDocumentURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.UPLOADOCUMENTS;

  private getTotalSalesURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.TOTALSALES;
  private settlementsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETSETTLEMENTS;
  private getNewCustomersURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.NEWCUSTOMERS;
  private getRepeatCustomersURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.REPEATCUSTOMERS;
  private getCustomerBaseURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.CUSTOMERBASE;
  private getMonthSalesURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.MONTHSALES;
  private getTodaySalesURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.TODAYSALES;
  private getVisitsMonthURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.VISITSMONTH;
  private getVisitsTodayURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.VISITSTODAY;
  private sendPaymentLinkURL = API_CONFIG.MERCHANT_BASE_URL;

  // DASHBOARD SALES ANALYTICS
  private getMonthSalesAnalyticsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.MONTHSALESANALYTICS;
  private getHourSalesAnalyticsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.HOURSALES;
  private getHourFFAnalyticsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.HOURFF;
  private getMonthFFAnalyticsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.MONTHFF;
  private getDayFFSalesAnalyticsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.FFINADAY;

  // RFM APIS
  private getRFMCentersMURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.RFMCENTERM;
  private getRFMCentersFURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.RFMCENTERF;
  private getRFMCentersRURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.RFMCENTERR;

  //FEEDBACK
  private getFeedConfigURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETFEEDBACKCONFIG;
  private addFeedConfigURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.ADDFEEDBACKCONFIG;
  private getFeedConfigOptionsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETFEEDBACKCONFIGOPTIONS;
  private feedbackURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETFEEDBACKS;

  getStreamMessagesURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.STREAMMESSAGE;
  getNotificationsConfigURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.GETNOTIFICATIONS;
  addModifyNotificationsConfigURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.ADDMODIFYNOTIFICATIONS;

  private IFSCDetailsURL = 'https://ifsc.razorpay.com/'

  private initiateOTPURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.OTPINITIATESERVICE;
  private validateOTPURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.OTPVALIDATESERVICE;

  private nearbyCustomersURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.NEARBYCUSTOMER;
  private rfmSegmentsURL = API_CONFIG.MERCHANT_BASE_URL + API_CONFIG.RFMSEGMENTS;

  constructor(private http: HttpClient,
    //  private keycloakService: KeycloakService
     ) { }

  getUsers(page:number, limit:number, search = null): Observable <any> {

    // let headers = new HttpHeaders();
  // headers = headers.set('Access-Control-Allow-Origin', '*');

  if(search ===null){
    return this.http.post<any>(this.getUsersURL + '?limit=' + limit + '&page=' + page, {
    });
  } else {
    return this.http.post<any>(this.getUsersURL + '?limit=' + limit + '&page=' + page + '&search=' + search, {
    });
  }


  }

  getUserIdKC(){
    return this.http.get<string>(this.getUserIdURL );
  }

  getGroupIdKC(){
    return this.http.get<string>(this.getGroupIdURL);
  }

  getGroupNameKC(){
    return this.http.get<string>(this.getGroupNameURL);
  }

  getFullNameKC(){
    return this.http.get<string>(this.getFullNameURL);
  }

  logOutUser(){
    return this.http.get<string>(this.logOutURL);
  }

  getUserRolesKC(){
    return this.http.get<any>(this.getUserRolesURL);
  }

  getUsersByPrim(page:number, limit:number,prim:string,search = null): Observable <any> {

    if(search ===null){
      return this.http.post<any>(this.getUsersURLByPrim + '?limit=' + limit + '&page=' + page + '&primaryMerchantid=' + prim, {
      });
    } else {
      return this.http.post<any>(this.getUsersURLByPrim + '?limit=' + limit + '&page=' + page + '&primaryMerchantid=' + prim+ '&search=' + search, {
      });
    }


  }

  createParentMerchant(parentMerchantData:createParentMerchantModel): Observable<any> {
    return this.http.post(this.createParentMerchantURL, parentMerchantData);
  }

  createSubMerchant(subMerchantData:any, parentMerchantID:string): Observable<any> {
    return this.http.post(this.createSubMerchantURL + '?parentSubMerchantid=' + parentMerchantID,
                          subMerchantData);
  }

  createMerchantUser(merchantUserData:any, parentMerchantID:string, subMerchantId:string): Observable<any> {
    return this.http.post(this.createUserURL + '?prim=' + parentMerchantID
                          + '&subm=' + subMerchantId , merchantUserData);
  }

  getQrCode(submerchantId:string): Observable <any> {
    return this.http.post<any>(this.getQrCodeURL + '?submerchantid=' + submerchantId + '&terminalid=' + submerchantId, {
    });
  }

  createQrCode(submerchantId:string): Observable <any> {
    return this.http.post<any>(this.createQrCodeURL + '?submerchantid=' + submerchantId, {
    });
  }

  getSubMerchants(): Observable <any> {
    return this.http.get<any>(this.getSubMerchantsURL, {
    });
  }

  changeMerchantPassword(passwordData:any): Observable <any> {
    return this.http.post<any>(this.changeMerchantPasswordURL, passwordData, {
    });
  }

  getPrimaryMerchants(): Observable <any> {
    return this.http.get<any>(this.getParentMerchantsURL, {
    });
  }

  searchPrimaryMerchants(search:string): Observable <any> {
    return this.http.get<any>(this.searchParentMerchantsURL +'?search=' + search, {
    });
  }

  getSubmerchantsByParentId(primaryMerchantid:string): Observable <any> {
    return this.http.post<any>(this.getSubMerchByparentURL +'?primaryMerchantid=' + primaryMerchantid, {
    });
  }

  getSubMerchantDetails(submerchantid:string): Observable <any> {
    return this.http.get<any>(this.getSubMerchantDetailsURL + '?submerchantid='
                               + submerchantid, {
    });
  }

  getTerminalIdByGroupId(groupid:string): Observable <any> {
    return this.http.get<any>(this.getTerminalIdByGroupidURL + '?groupid='
                               + groupid, {
    });
  }

  getPrimMerchantDetails(primmerchantid:string): Observable <any> {
    return this.http.get<any>(this.getPrimMerchantDetailsURL + '?primmerchantid='
                               + primmerchantid, {
    });
  }


  updateSubMerchantDetails(submerchant:UpdateSubMerchant ): Observable <any> {

    return this.http.post<any>(this.updateSubMerchantURL, submerchant);
  }

  updatePrimMerchantDetails(primmerchant:UpdatePrimMerchant): Observable <any> {
    return this.http.post<any>(this.updateParentMerchantURL, primmerchant);
  }

  sendPaymentLink(phone:string,amount:number,merchantid:string): Observable <any> {
    return this.http.get<any>(this.sendPaymentLinkURL + '?amount=' +amount+
                                '&phone=' +phone+ '&merchantid=' +merchantid,{}
    );
  }

  getBankAccount(parentMerchantID:string): Observable <any> {
    return this.http.get<any>(this.getBankAccountURL + '?parentmerchantid=' + parentMerchantID, {
    });
  }

  getDocuments(parentMerchantID:string): Observable <any> {
    return this.http.get<any>(this.getDocumentsURL + '?merchantid=' + parentMerchantID);
  }

  uploadDocument(parentMerchantID:string,type:string,subtype:string,formdata: FormData): Observable <any> {
    return this.http.post<any>(this.uploadDocumentURL + '?merchantid=' + parentMerchantID + 'type=' + type + 'subtype=' + subtype,
    formdata
    );
  }

  createBankAccount(bankAccountData:createEditBankAccount): Observable <any> {
    return this.http.post<any>(this.createBankAccountURL, bankAccountData, {
    });
  }

  activateDeactivate(data:any): Observable <any> {
    return this.http.post<any>(this.activateDeactivateURL, data, {
    });
  }

  getTerminalIDs(data: Array<String>, userinfo? : Boolean): Observable <any> {
    // if(userinfo===undefined || userinfo === null){
    //   userinfo = false;
    // }
    return this.http.post<any>(this.GETTERMINALIDSURL + '?userinfo=' +userinfo, data, {
    });
  }

  getTransactions(startDate:string, endDate:string, limit:number, page:number, data:any): Observable <any> {
    return this.http.post<any>(this.transactionsURL + '?datehigh=' +endDate+
                                '&datelow=' +startDate+ '&limit=' + limit +
                                '&page=' + page, data, {
    });
  }

  getTransactionsUTR( limit:number, page:number, data:any,search?:string): Observable <any> {
    return this.http.post<any>(this.transactionsURL + '?&limit=' + limit +
                                '&page=' + page + '&search=' + search, data, {
    });
  }

  searchUTR(search:string ,data:any): Observable <any> {
    return this.http.post<any>(this.SEARCHUTRIDURL + '?search=' + search, data, {
    });
  }

  getRefunds(startDate:string, endDate:string, limit:number, page:number, data:any): Observable <any> {
    return this.http.post<any>(this.refundsURL + '?datehigh=' +endDate+
                                '&datelow=' +startDate+ '&limit=' + limit +
                                '&page=' + page, data, {
    });
  }

  getSettlements(startDate:string, endDate:string, limit:number, page:number, primmerchant:number): Observable <any> {
    return this.http.get<any>(this.settlementsURL + '?datehigh=' +endDate+
                                '&datelow=' +startDate+ '&limit=' + limit +
                                '&page=' + page + '&primmerchant=' + primmerchant, {
    });
  }

  changeSubMerchantConf(submerchantid:string, data:any): Observable <any> {
    return this.http.post<any>(this.changeSubMerchantConfURL + '?submerchantid='
                               + submerchantid, data, {
    });
  }

  changeSubMerchantConfAll(submerchantid:string, data:any): Observable <any> {
    return this.http.post<any>(this.changeSubMerchantConfAllURL + '?submerchantid='
                               + submerchantid, data, {
    });
  }

  updateUserInfo(userinfo:UpdateUserInfo): Observable <any> {

    return this.http.post<any>(this.updateUserInfoURL, userinfo);
  }

  getSubMerchantConf(submerchantid:string): Observable <any> {
    return this.http.get<any>(this.getSubMerchantConfURL + '?submerchantid='
                               + submerchantid);
  }


  getTotalSalesApi(mode:string,metric:string, data:any): Observable <any> {
    return this.http.post<any>(this.getTotalSalesURL + '?mode='
                               + mode + '&metric='
                               + metric, data, {
    });
  }

  getNewCustomers(data:any): Observable <any> {
    return this.http.post<any>(this.getNewCustomersURL, data, {
    });
  }

  getRepeatCustomers(data:any): Observable <any> {
    return this.http.post<any>(this.getRepeatCustomersURL, data, {
    });
  }

  getCustomerBase(data:any): Observable <any> {
    return this.http.post<any>(this.getCustomerBaseURL, data, {
    });
  }

  getMonthSales(data:any): Observable <any> {
    return this.http.post<any>(this.getMonthSalesURL , data, {
    });
  }

  getTodaySales(data:any): Observable <any> {
    return this.http.post<any>(this.getTodaySalesURL , data, {
    });
  }

  getVisitsMonth(data:any): Observable <any> {
    return this.http.post<any>(this.getVisitsMonthURL, data, {
    });
  }

  getVisitsToday(data:any): Observable <any> {
    return this.http.post<any>(this.getVisitsTodayURL, data, {
    });
  }

  getIFSCDetails(ifsc:string): Observable <any> {
    var header = new HttpHeaders()
    header = header.set('Access-Control-Allow-Origin','*')
    header = header.set('Authorization','*')
    return this.http.get<any>(this.IFSCDetailsURL + ifsc, {headers : header});
  }

  initiateRefundOTP(transactionid:string): Observable <any> {
    return this.http.get<any>(this.initiateOTPURL + '?transactionid='
                               + transactionid);
  }

  validateRefundOTP(transactionid:string,otp:string): Observable <any> {
    return this.http.get<any>(this.validateOTPURL + '?transactionid='
                               + transactionid +
                               '&otp=' + otp
                               );
  }

  getMonthSalesAnalytics(submerchantids:Array<string>, monthyear1:string,monthyear2:string){
    return this.http.post<any>(this.getMonthSalesAnalyticsURL + '?monthyear1=' + monthyear1 + '&monthyear2=' + monthyear2 , submerchantids, {
    });

  }
  getHourSalesAnalytics(submerchantids:Array<string>, date1:string,date2:string){
    return this.http.post<any>(this.getHourSalesAnalyticsURL + '?date1=' + date1 + '&date2=' + date2 , submerchantids, {
    });

  }
  getHourFFAnalytics(submerchantids:Array<string>, date1:string,date2:string){
    return this.http.post<any>(this.getHourFFAnalyticsURL + '?date1=' + date1 + '&date2=' + date2 , submerchantids, {
    });

  }
  getMonthFFAnalytics(submerchantids:Array<string>, monthyear1:string,monthyear2:string){
    return this.http.post<any>(this.getMonthFFAnalyticsURL + '?monthyear1=' + monthyear1 + '&monthyear2=' + monthyear2 , submerchantids, {
    });
  }
  getDayFFSalesAnalytics(submerchantids:Array<string>, from_date:string,to_date:string,weekdayname:string){
    return this.http.post<any>(this.getDayFFSalesAnalyticsURL + '?from_date=' + from_date + '&to_date=' + to_date + '&weekdayname=' + weekdayname , submerchantids, {
    });
  }

  getRFMCenterM(submerchantids:Array<string>){
    return this.http.post<any>(this.getRFMCentersMURL , submerchantids, {
    });
  }

  getRFMCenterF(submerchantids:Array<string>){
    return this.http.post<any>(this.getRFMCentersFURL , submerchantids, {
    });
  }

  getRFMCenterR(submerchantids:Array<string>){
    return this.http.post<any>(this.getRFMCentersRURL , submerchantids, {
    });
  }

  getNearbyCustomers(submerchantids:Array<string>,distance:number,subcat:boolean){
    return this.http.post<any>(this.nearbyCustomersURL + '?subcat=' + subcat + '&distance=' + distance , submerchantids, {
    });
  }

  getRFMSegments(submerchantids:Array<string>){
    return this.http.post<any>(this.rfmSegmentsURL , submerchantids, {
    });
  }


  getFeedbackConfig(submerchantid:string, min:number,max:number){
    return this.http.get<any>(this.getFeedConfigURL+ '?storeid=' + submerchantid + '&min=' + min + '&max=' + max , );
  }

  getFeedbackConfigOptions(submerchantid:string){
    return this.http.get<any>(this.getFeedConfigOptionsURL+ '?storeid=' + submerchantid  );
  }


  addFeedbackConfig(submerchantid:string,min:number,max:number,feed:FeedbackConfigAddRequest,all:boolean){
    return this.http.post<any>(this.addFeedConfigURL+ '?storeid=' + submerchantid + '&min=' + min + '&max=' + max + '&all=' + all , feed, {
    });
  }

  getFeedbacks(startDate:string, endDate:string, limit:number, page:number, data:any): Observable <any> {
    return this.http.post<any>(this.feedbackURL + '?datehigh=' +endDate+
                                '&datelow=' +startDate+ '&limit=' + limit +
                                '&page=' + page, data, {
    });
  }


  getNotificationsConfig(storeid:string): Observable <any> {
    return this.http.get<any>(this.getNotificationsConfigURL+ '?storeid=' +storeid);
  }

  addModifyNotifications(data:any): Observable <any> {
    return this.http.post<any>(this.addModifyNotificationsConfigURL, data, {
    });
  }




}
