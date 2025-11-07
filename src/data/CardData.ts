import type { Service } from "../types";

export const cardData: Service[] = [
  {
    title: "ISEE Form",
    description:
      "The Equivalent Economic Situation Indicator (ISEE) is a numerical value that certifies the economic situation of a household in Italy, used to determine access to social benefits and tax reductions.",
    price: 29.99,
    vatIncluded: true,
    hours: "6 hours",
    link: "/services/isee-form",
    category: "Tax Services",
    inDepthAnalysis:
      "The Equivalent Economic Situation Indicator (ISEE) combines family income, assets, and composition to determine eligibility for social benefits such as scholarships, reduced taxes, and family allowances. It standardizes the economic evaluation process across the country.",
    advantages: [
      "Essential for accessing public scholarships and welfare benefits.",
      "Simplifies the evaluation of a family's financial situation.",
      "Recognized by all Italian public administrations.",
      "Allows reductions on school fees, healthcare, and social services.",
    ],
  },
  {
    title: "University ISEE Form",
    description:
      "The University ISEE certifies the financial situation of a student and their family, required to access scholarships and reduced university fees.",
    price: 19.5,
    vatIncluded: true,
    hours: "6 hours",
    link: "/services/university-isee-form",
    category: "Education",
    inDepthAnalysis:
      "The University ISEE (ISEE Università) is used by universities to assess students’ financial conditions for determining scholarship eligibility, tuition reductions, and housing benefits. It reflects the family’s real disposable income.",
    advantages: [
      "Access to university scholarships and reduced tuition fees.",
      "Recognized by all public and private universities in Italy.",
      "Helps students obtain housing and cafeteria discounts.",
      "Simplifies the verification of financial eligibility for aid.",
    ],
  },
  {
    title: "ISEE Form for Minors",
    description:
      "The ISEE Minorenni is a specific economic indicator used for families with minors, determining access to family-related welfare benefits.",
    price: 32.99,
    vatIncluded: true,
    hours: "6 hours",
    link: "/services/isee-form-minors",
    category: "Tax Services",
    inDepthAnalysis:
      "ISEE Minorenni is required when applying for benefits or services linked to children, including childcare subsidies and school assistance. It takes into account both parents’ income, even if they are not married or cohabiting.",
    advantages: [
      "Required for childcare and school support applications.",
      "Evaluates both parents’ economic situations fairly.",
      "Ensures transparency in benefit distribution.",
      "Mandatory for nursery, kindergarten, and family subsidies.",
    ],
  },
  {
    title: "Rental Agreement Registration",
    description:
      "Registration of a lease agreement is a mandatory tax requirement for all rental contracts in Italy, ensuring legal validity and compliance.",
    price: 39.99,
    vatIncluded: true,
    hours: "6 hours",
    link: "/services/rental-agreement-registration",
    category: "Consulting",
    inDepthAnalysis:
      "Rental agreement registration guarantees the legal recognition of your lease. It provides protection to both landlord and tenant, confirming compliance with Italian tax regulations and enabling access to legal remedies in case of disputes.",
    advantages: [
      "Makes rental contracts legally enforceable.",
      "Prevents disputes through official registration.",
      "Required for tax deductions on rental income.",
      "Protects both landlords and tenants under Italian law.",
    ],
  },
  {
    title: "Signing a Rental Agreement",
    description:
      "Formalize the agreements between landlord and tenant with a properly structured and legally binding rental contract.",
    price: 12.5,
    vatIncluded: true,
    hours: "6 hours",
    link: "/services/signing-rental-agreement",
    category: "Consulting",
    inDepthAnalysis:
      "Signing a rental agreement establishes a formal contract that outlines the obligations of both parties. It ensures compliance with national housing regulations and prevents misunderstandings about terms and conditions.",
    advantages: [
      "Ensures compliance with rental laws and conditions.",
      "Clearly defines rent, deposit, and maintenance terms.",
      "Protects both parties’ rights and obligations.",
      "Avoids future disputes with written terms.",
    ],
  },
  {
    title: "Land Registry Search",
    description:
      "The Land Registry report provides official property data from the Revenue Agency, including ownership and cadastral details.",
    price: 15.0,
    vatIncluded: true,
    hours: "6 hours",
    link: "/services/land-registry-search",
    category: "Property Services",
    inDepthAnalysis:
      "A land registry search (Visura Catastale) identifies a property’s ownership details, cadastral information, and boundaries. It’s essential for buying, selling, or legal disputes regarding land or real estate.",
    advantages: [
      "Confirms property ownership and location details.",
      "Helps prevent fraudulent transactions.",
      "Essential for legal and real estate documentation.",
      "Provides official property value information.",
    ],
  },
  {
    title: "Property Tax Support",
    description:
      "Receive expert help to calculate and pay your property taxes correctly and on time, avoiding penalties and errors.",
    price: 39.99,
    vatIncluded: true,
    hours: "8 hours",
    link: "/services/services/property-tax-support",
    category: "Tax Services",
    inDepthAnalysis:
      "Property tax support ensures compliance with IMU and TASI obligations, helping you avoid fines for late or incorrect payments. Professional assistance guarantees accurate calculations based on property category and ownership period.",
    advantages: [
      "Avoid penalties for incorrect tax declarations.",
      "Ensure accurate IMU and TASI calculations.",
      "Save time with expert guidance.",
      "Stay compliant with local tax regulations.",
    ],
  },
  {
    title: "Tax Declaration",
    description:
      "Get your annual tax declaration prepared by professionals according to Italian tax laws and filing requirements.",
    price: 49.99,
    vatIncluded: true,
    hours: "12 hours",
    link: "/services/tax-declaration",
    category: "Tax Services",
    inDepthAnalysis:
      "The annual tax declaration (Modello 730 or Redditi PF) summarizes income, deductions, and credits. Our experts ensure timely and accurate submission to the Revenue Agency, minimizing errors and optimizing refunds.",
    advantages: [
      "Optimized deductions and credits for higher refunds.",
      "Accurate and timely submission to the Tax Authority.",
      "Minimized risk of penalties and audits.",
      "Professional review of all financial documents.",
    ],
  },
  {
    title: "Business Registration",
    description:
      "Quick and compliant registration of new businesses, including necessary documents and tax setup.",
    price: 99.99,
    vatIncluded: false,
    hours: "24 hours",
    link: "/services/business-registration",
    category: "Business",
    inDepthAnalysis:
      "Business registration ensures legal recognition and compliance with Chamber of Commerce and Revenue Agency regulations. Our service manages all forms, tax IDs, and VAT registrations for your enterprise.",
    advantages: [
      "Fast and compliant company registration process.",
      "Covers VAT, INPS, and Chamber of Commerce setup.",
      "Professional guidance for required documentation.",
      "Ideal for startups, freelancers, and small businesses.",
    ],
  },
  {
    title: "Freelancer Package",
    description:
      "A complete setup for freelancers, including tax registration, invoicing tools, and ongoing fiscal support.",
    price: 59.99,
    vatIncluded: true,
    hours: "10 hours",
    link: "/services/freelancer-package",
    category: "Business",
    inDepthAnalysis:
      "The Freelancer Package includes everything needed to start self-employment: VAT activation, simplified accounting setup, and invoicing system integration, ensuring full tax compliance.",
    advantages: [
      "Start freelancing with a fully legal setup.",
      "Includes VAT activation and accounting guidance.",
      "Simple invoicing tools integrated into your workflow.",
      "Ongoing fiscal advice and support.",
    ],
  },
  {
    title: "VAT Number Activation",
    description:
      "Assistance in obtaining and activating your VAT number for freelancers or new businesses in Italy.",
    price: 35.0,
    vatIncluded: true,
    hours: "5 hours",
    link: "/services/vat-number-activation",
    category: "Business",
    inDepthAnalysis:
      "VAT number activation (Partita IVA) is essential for professionals and freelancers in Italy. We manage the full activation process with the Revenue Agency, including proper tax regime classification.",
    advantages: [
      "Full assistance with Revenue Agency registration.",
      "Advice on the most suitable tax regime.",
      "Fast turnaround and documentation review.",
      "Compliant with Italian fiscal regulations.",
    ],
  },
  {
    title: "Change of Residence Declaration",
    description:
      "Submit your official change of residence request with full compliance with Italian registry requirements.",
    price: 22.99,
    vatIncluded: true,
    hours: "4 hours",
    link: "/services/change-of-residence",
    category: "House",
    inDepthAnalysis:
      "The change of residence declaration allows citizens to update their registered address in municipal and tax records. Proper filing ensures timely updates in ID, healthcare, and tax databases.",
    advantages: [
      "Ensures proper update across government databases.",
      "Avoids penalties for incorrect residency records.",
      "Required for tax, ID, and healthcare services.",
      "Simple and guided process via municipal channels.",
    ],
  },
  {
    title: "Succession Declaration",
    description:
      "Comprehensive assistance with inheritance and succession declarations to the Revenue Agency.",
    price: 85.5,
    vatIncluded: true,
    hours: "18 hours",
    link: "/services/succession-declaration",
    category: "Legal",
    inDepthAnalysis:
      "The succession declaration is a mandatory tax procedure that transfers ownership of assets from a deceased person to their heirs. Our service prepares all necessary forms and filings to the Revenue Agency.",
    advantages: [
      "Handles complete inheritance declaration process.",
      "Ensures legal compliance with succession tax laws.",
      "Avoids disputes among heirs with proper documentation.",
      "Professional management of complex asset transfers.",
    ],
  },
  {
    title: "Marriage Certificate Request",
    description:
      "Request and receive your marriage certificate or official copies from the relevant Italian authorities.",
    price: 18.0,
    vatIncluded: true,
    hours: "4 hours",
    link: "/services/marriage-certificate-request",
    category: "Documents",
    inDepthAnalysis:
      "Marriage certificates are official documents issued by the municipality to certify marital status. This service simplifies the retrieval process for legal, immigration, or administrative use.",
    advantages: [
      "Fast request and delivery of official certificates.",
      "Valid for legal and immigration procedures.",
      "Handled directly with the issuing municipality.",
      "Includes translation and legalization options.",
    ],
  },
  {
    title: "Birth Certificate Request",
    description:
      "We handle the request and retrieval of official birth certificates for individuals or family members.",
    price: 15.99,
    vatIncluded: true,
    hours: "3 hours",
    link: "/services/birth-certificate-request",
    category: "Documents",
    inDepthAnalysis:
      "The birth certificate service retrieves official birth records from the civil registry. It is essential for citizenship, passport, and school enrollment applications.",
    advantages: [
      "Official copy from the civil registry.",
      "Accepted for legal and international use.",
      "Quick and verified retrieval process.",
      "Optional translation and legalization service.",
    ],
  },
  {
    title: "Identity Card Renewal",
    description:
      "Guided support for renewing your Italian identity card or electronic ID with the local municipality.",
    price: 25.0,
    vatIncluded: true,
    hours: "5 hours",
    link: "/services/identity-card-renewal",
    category: "Documents",
    inDepthAnalysis:
      "The identity card renewal service assists with scheduling, documentation, and submission for renewal. It ensures compliance with biometric ID and residency regulations.",
    advantages: [
      "Avoid delays in renewal or expiration penalties.",
      "Assistance with biometric ID submission.",
      "Guided process for documentation and booking.",
      "Valid for travel within the EU and official ID purposes.",
    ],
  },
  {
    title: "Car Ownership Transfer",
    description:
      "Assistance in legally transferring ownership of a vehicle, ensuring correct registration and documentation.",
    price: 49.5,
    vatIncluded: true,
    hours: "8 hours",
    link: "/services/car-ownership-transfer",
    category: "Transport",
    inDepthAnalysis:
      "Vehicle ownership transfer must be recorded within 60 days of sale. This service ensures proper documentation and updates with the Public Vehicle Registry (PRA).",
    advantages: [
      "Compliant with Public Vehicle Registry procedures.",
      "Avoids fines for unregistered ownership changes.",
      "Covers both buyer and seller obligations.",
      "Full documentation handled by professionals.",
    ],
  },
  {
    title: "Vehicle Registration Certificate",
    description:
      "Request or renew your vehicle registration certificate through the official channels.",
    price: 22.5,
    vatIncluded: true,
    hours: "6 hours",
    link: "/services/vehicle-registration",
    category: "Transport",
    inDepthAnalysis:
      "Vehicle registration certificates confirm the legal registration of your car or motorcycle. Renewal ensures compliance with transport and insurance regulations.",
    advantages: [
      "Renew or reissue official registration documents.",
      "Avoid penalties for outdated records.",
      "Compliant with insurance and MOT requirements.",
      "Fast turnaround and direct registry handling.",
    ],
  },
  {
    title: "Tax Refund Request",
    description:
      "We handle your tax refund application, ensuring all documents are correctly submitted for faster reimbursement.",
    price: 29.99,
    vatIncluded: true,
    hours: "8 hours",
    link: "/services/tax-refund-request",
    category: "Tax Services",
    inDepthAnalysis:
      "Tax refund requests allow taxpayers to reclaim overpaid amounts. Our team ensures accurate submission, validation, and follow-up with the Revenue Agency to expedite reimbursements.",
    advantages: [
      "Ensure faster refund processing.",
      "Avoid rejection from missing documents.",
      "Track refund status until completion.",
      "Professional verification of all declarations.",
    ],
  },
  {
    title: "Social Benefits Application",
    description:
      "Get assistance with applications for social benefits, family allowances, and economic aid programs.",
    price: 19.99,
    vatIncluded: true,
    hours: "5 hours",
    link: "/services/social-benefits-application",
    category: "Consulting",
    inDepthAnalysis:
      "Social benefits applications include family allowances, housing support, and income aid. We guide you through eligibility, document collection, and submission to relevant institutions.",
    advantages: [
      "Maximize eligibility for welfare programs.",
      "Assistance with documentation and submission.",
      "Reduce waiting times and bureaucratic errors.",
      "Compliant with regional and national policies.",
    ],
  },
];
