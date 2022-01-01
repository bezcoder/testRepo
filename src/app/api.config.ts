import {environment} from '../environments/environment';

export const API_CONFIG = {
    MERCHANT_BASE_URL: environment.serverBaseUrl  + '/' +  environment.merchantApiPath,
    AUTH_BASE_URL: environment.serverBaseUrl  + '/' + environment.authApiPath,
    TRANSACTIONS_BASE_URL: environment.serverBaseUrl + '/' + environment.transactionApiPath,

    // USERS
    GETUSERS: '/getusers',

    //KEYCLOAK
    GETUSERID: '/get-userid',
    GETUSERROLES: '/get-roles',
    GETGROUPID: '/get-groupid',
    GETFULLNAME: '/get-full-name',
    GETGROUPNAME: '/get-group-name',
    LOGOUTUSER  : '/logout',

    GETUSERSBYPRIM: '/getUserDetailsbyPrimMerchants',

    CREATEUSER: '/createuser',
    EMAILRESET: '/emailreset',
    CHANGEPASSWORD: '/resetPasswordByAdmin',

    // MERCHANT
    GETMERCHANTS: '/getusers',
    CREATEMERCHANT: '/createParentMerchant',
    UPDATEUSERINFO: '/updateUserInfo',

    // SUB MERCHANT
    GETALLSUBMERCHANTS: '/getAllSubMerchant',
    GETSUBMERCHANTS: '/getSubMerchants',
    CREATESUBMERCHANT: '/createSubMerchant',

    // QR
    GETQR: '/getqr',
    CREATEQR: '/createQR',

    // BANK ACCOUNTS
    GETBANKACCOUNTS: '/getBankAccount',
    ADDBANKACCOUNT: '/addEditBankAccount',

    GETPRIMARYMERCHANTS: '/getPrimMerchants',
    SEARCHPRIMARYMERCHANTS: '/searchPrimMerchants',
    GETSUBMERCBYPARENT: '/getSubmerchantsByPrimMerchants',
    ACTIVATEDEACTIVATE: '/activateDeactivateMerchant',
    UPDATEPRIMARYMERCHANT: '/updatePrimaryMerchant',
    UPDATESUBMERCHANT: '/updateSubMerchant',

    GETSUBMERCHANTDETAILS: '/getSubMerchant',
    GETPRIMARYMERCHANTDETAILS: '/getPrimMerchant',

    // Transactions
    GETTRANSACTIONS: '/payu/getTransactionLedger',
    GETREFUNDS     :'/payu/getRefundLedger',
    SENDPAYMENTLINK: '/sendpaymentlink',

    GETTERMINALIDS : '/get-terminal',
    SEARCHUTRID : '/search-utrid',

    // Configurations
    CHANGECONFIGURATIONS: '/changeSubmerchantConfig',
    CHANGECONFIGURATIONSALL: '/changeSubmerchantConfigAll',
    GETCONFIGURATIONS: '/getSubmerchantConfig',

    // DASHBOARDAPI
    TOTALSALES: '/dashboard/gettransactionsTotal',
    NEWCUSTOMERS: '/dashboard/dashboardNewCustomers',
    REPEATCUSTOMERS: '/dashboard/dashboardRepeatCustomers',
    CUSTOMERBASE: '/dashboard/getCustomerBase',
    MONTHSALES: '/dashboard/getSalesMonth',
    TODAYSALES: '/dashboard/getSalesToday',
    VISITSMONTH: '/dashboard/getVisitsMonth',
    VISITSTODAY: '/dashboard/getVisitsToday',

    // Settlements
    GETSETTLEMENTS: '/payu/getSettlementLedger',

    // Upload Documents
    GETDOCUMENTS: '/get-doc-info',
    UPLOADOCUMENTS: '/upload-file',

    //OTP
    OTPINITIATESERVICE : '/payu/initiate-refund',
    OTPVALIDATESERVICE : '/payu/validate-otp-refund',

    GETTERMINALIDFROMGROUPID : '/get-terminalid-using-groupid',

    // SALES ANALYTICS
    HOURSALES: '/dashboard/sales/hour-sales',
    MONTHSALESANALYTICS: '/dashboard/sales/month-sales',
    HOURFF: '/dashboard/sales/hour-ff',
    MONTHFF: '/dashboard/sales/month-ff',
    FFINADAY: '/dashboard/sales/ff-day',

    // NOTIFICATIONS SERVICE
    STREAMMESSAGE : '/stream-messages',
    GETNOTIFICATIONS : '/get-notification',
    ADDMODIFYNOTIFICATIONS : '/post-notification',

    // RFM Service
    RFMCENTERM : '/dashboard/dashboard/rfm/center-m',
    RFMCENTERF : '/dashboard/dashboard/rfm/center-f',
    RFMCENTERR : '/dashboard/dashboard/rfm/center-r',
    NEARBYCUSTOMER : '/dashboard/dashboard/rfm/nearby-customers-by-distance',
    RFMSEGMENTS : '/dashboard/dashboard/rfm/rfm-segments',

    //Add Feedback Config
    GETFEEDBACKCONFIG : '/get-fb-config',
    GETFEEDBACKCONFIGOPTIONS : '/get-fb-config-options',
    ADDFEEDBACKCONFIG : '/add-fb-config',
    GETFEEDBACKS: '/getFeedbackLedger',
    GETFEEDBACKDASHBOARD: '/dashboard/get-feedback-dashboard',
    GETAVGTRANSACTIONBYFEEDBACK: '/dashboard/get-avg-trans-feedback-dashboard',
    ACTIVATEFEEDBACK : '/activate-feedback'




};
