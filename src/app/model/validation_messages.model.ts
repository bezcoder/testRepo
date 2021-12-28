export const validationMessages = {
  merchantLegalName: [
    { type: 'required', message: 'Legal Merchant Name is required.' },
    { type: 'pattern', message: 'Please Enter a valid legal merchant name.' },
    { type: 'minlength', message: 'Legal Merchant Name must be at least 3 Characters.' },
    { type: 'maxlength', message: 'Legal Merchant Merchant Name must be at most 100 Characters.' }
  ],
    merchantName: [
      { type: 'required', message: 'Merchant Name is required.' },
      { type: 'pattern', message: 'Please Enter a valid merchant name.' },
      { type: 'minlength', message: 'Merchant Name must be at least 3 Characters.' },
      { type: 'maxlength', message: 'Merchant Name must be at most 30 Characters.' }
    ],
    firstName: [
      { type: 'required', message: 'First Name is required.' },
      { type: 'pattern', message: 'Please Enter a valid first name.' },
      { type: 'minlength', message: 'First Name must be at least 3 Characters.' },
      { type: 'maxlength', message: 'First Name must be at most 50 Characters.' }
    ],
    lastName: [
      { type: 'required', message: 'Last Name is required.' },
      { type: 'pattern', message: 'Please Enter a valid last name.' },
      { type: 'minlength', message: 'Last Name must be at least 3 Characters.' },
      { type: 'maxlength', message: 'Last Name must be at most 50 Characters.' }
    ],
    country: [
      { type: 'required', message: 'Country is required.' }
    ],
    state: [
      { type: 'required', message: 'State is required.' }
    ],
    city: [
      { type: 'required', message: 'City is required.' }
    ],
    aadhaar: [
      { type: 'required', message: 'Aadhar Number is required.' },
      { type: 'pattern', message: 'Please Enter a valid Aadhaar Card Number.' }
    ],
    gst: [
      { type: 'required', message: 'GST Number is required.' },
      { type: 'pattern', message: 'Please Enter a valid GST number.' }
    ],
    currency: [
      { type: 'required', message: 'Currency is required.' }
    ],
    address1: [
      { type: 'required', message: 'Address1 is required.' },
      { type: 'minlength', message: 'Address1 must be at least 3 Characters.' },
      { type: 'maxlength', message: 'Address1 must be at most 50 Characters.' }
    ],
    address2: [
      { type: 'required', message: 'Address2 is required.' },
      { type: 'minlength', message: 'Address2 must be at least 3 Characters.' },
      { type: 'maxlength', message: 'Address2 must be at most 50 Characters.' }
    ],
    website: [
      { type: 'required', message: 'Website is required.' },
      { type: 'pattern', message: 'Please Enter a valid website.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please Enter a valid email.' },
      { type: 'email', message: 'Please Enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 Characters.' },
      { type: 'pattern', message: 'Please Enter a valid password.' }
    ],
    role: [
      { type: 'required', message: 'Role is required.' },
      { type: 'pattern', message: 'Please Enter a valid role.' }
    ],
    beneficiaryAccountNumber: [
      { type: 'required', message: 'Account Number is required.' },
      { type: 'pattern', message: 'Please Enter a valid account number.' },
      { type: 'minlength', message: 'Account Number must be at least 9 numbers.' },
      { type: 'maxlength', message: 'Account Number must be at most 18 numbers.' }
    ],
    beneficiaryIfscCode: [
      { type: 'required', message: 'IFSC is required.' },
      { type: 'pattern', message: 'Please Enter a valid IFSC.' }
    ],
    beneficiaryName: [
      { type: 'required', message: 'Beneficary Name is required.' },
      { type: 'pattern', message: 'Please Enter a valid Beneficary Name.' },
      { type: 'minlength', message: 'Beneficary Name must be at least 3 Characters.' },
      { type: 'maxlength', message: 'Beneficary Name must be at most 50 Characters.' }
    ],
    beneficiaryMobile: [
      { type: 'required', message: 'Beneficary Mobile is required.' },
      { type: 'pattern', message: 'Please Enter a valid Beneficary Mobile.' },
    ],
    beneficiaryEmail:[
      { type: 'required', message: 'Beneficary Email is required.' },
      { type: 'email', message: 'Please Enter a valid Beneficary Email.' }
    ],
    vpa: [
      { type: 'required', message: 'Beneficary VPA is required.' },
      { type: 'pattern', message: 'Please Enter a valid Beneficary VPA.' }
    ]
  };

