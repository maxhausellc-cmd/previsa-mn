
import { Language } from './types';

export const CHECKLIST_FILTERS = {
  occupations: [
    { value: 'employed', labelEn: 'Employed', labelMn: 'Ажил эрхэлдэг' },
    { value: 'self_employed', labelEn: 'Self-Employed', labelMn: 'Хувиараа бизнес эрхлэгч' },
    { value: 'director', labelEn: 'Company Director', labelMn: 'ААН-ийн захирал' },
    { value: 'student', labelEn: 'Student', labelMn: 'Оюутан / Сурагч' },
    { value: 'retiree', labelEn: 'Retiree', labelMn: 'Тэтгэврийн насны иргэн' },
    { value: 'unemployed', labelEn: 'Unemployed', labelMn: 'Ажилгүй' }
  ],
  funding: [
    { value: 'self', labelEn: 'Self-Funded', labelMn: 'Өөрөө санхүүжүүлэх' },
    { value: 'sponsor', labelEn: 'Sponsored', labelMn: 'Батлан даагчтай' }
  ]
};

export const PDF_CONTENT_TEMPLATE = `
Цахим виз мэдүүлгийн бүрдүүлэх бичиг баримтын жагсаалт

1. Гадаад паспорт (Энгийн паспорт)
2. Declaration form (Маягт татаж авах цэснээс татаж авна уу.)
3. Цээж зураг 1 хувь (сүүлийн 6 сарын дотор авхуулсан, цагаан дэвсгэртэй, малгайгүй, нүдний шилгүй)
4. Аялалын хөтөлбөр (Маягт татаж авах цэснээс татаж авна уу. Аялалын маршрут, байрлах газар, зочид буудлын нэр, хаяг, утасны дугаар зэргийг тодорхой дэлгэрэнгүй бичнэ үү.)
5. Нислэгийн захиалгын хуудас
6. Зочид буудлын захиалгын хуудас
7. Виз мэдүүлэгчийн ажил байдлыг тодорхойлох бичиг баримт
    7.1 Ажлын газрын тодорхойлолт
        (Анхааруулга 1) Тухайн компани, байгууллагын нэр, хаяг, утасны дугаар бүхий албан бланкан дээр бичигдсэн байна.
        (Анхааруулга 2) Овог нэр, төрсөн он сар өдөр, албан тушаал, ажилд орсон огноо, цалин зэргийг тодорхой тусгасан байна.
    7.2 Хувиараа бизнес эрхэлж байгаа бол тухайн үйл ажиллагааг тодорхойлох бичиг баримт (Гэрчилгээ, тусгай зөвшөөрөл, түрээсийн гэрээ)
    7.3 Нийгмийн даатгалын лавлагаа (сүүлийн 3 жил)
    7.4 Виз мэдүүлэгч нь компаний захирал бол (компани, байгууллага)-ын улсын бүртгэлийн гэрчилгээ, байгууллагын дүрмийн хуулбар болон эх хувь (төрийн өмчит байгууллага бол шаардахгүй)
    7.5 Оюутан, сурагч бол сургуулийн тодорхойлолт
    7.6 Тэтгэврийн насны хүн бол тэтгэврийн тодорхойлолт
8. Виз мэдүүлэгч нь санхүүгийн чадамжаа илтгэх материал
    8.1 Виз мэдүүлэгчийн нэр дээрх дансны хуулга (сүүлийн 6 сарын хураангуй)
    8.2 Хэрэв виз мэдүүлэгчийн нэр дээрх дансны сүүлийн 6 сарын хураангуй хуулга боломжгүй бол дансны эцсийн үлдэгдлийн тодорхойлолт болон дэлгэрэнгүй хуулга (сүүлийн 3 сар)
    (Анхааруулга 1) Банкны тодорхойлолт ба хуулга нь тамга тэмдэг болон QR кодтой байх ёстой.
    (Анхааруулга 2) Виз мэдүүлгэхээс өмнө дансанд гэнэт их хэмжээний орлого хийх нь виз олгохоос татгалзах үндэслэлийн нэг болдог тул анхаарна уу.
    (Анхааруулга 3) Виз мэдүүлэгч нь өөрийн хүсэлтээр хоёр ба түүнээс дээш банкны дансны эцсийн үлдэгдлийн тодорхойлолт болон хуулгыг бүрдүүлэн өгч болно.
    (Анхааруулга 4) Банк бус санхүүгийн байгууллагын тодорхойлолт, хуулга болон кредит картууд санхүүгийн баталгаа болохгүйг анхаарна уу.
9. Хэрэв насанд хүрээгүй хүүхэд виз мэдүүлэх бол эцэг эхийн зөвшөөрлийн хуудас
10. Хэрэв виз мэдүүлэгчийн Монгол дахь гэр бүл (эцэг эх, эхнэр нөхөр, ах дүү) эсвэл найз нь зардлыг хариуцах тохиолдолд:
    10.2 Ажлын газрын тодорхойлолт (7-д заасны дагуу)
    10.2 Нийгмийн даатгалын тодорхойлолт (сүүлийн 3 жил)
    10.3 Зардал хариуцах хүний нэр дээрх дансны хуулга (сүүлийн 6 сарын хураангуй)
    10.4 Хэрэв дансны сүүлийн 6 сарын хураангуй хуулга боломжгүй бол дансны эцсийн үлдэгдлийн тодорхойлолт болон дэлгэрэнгүй хуулга (сүүлийн 3 сар)
    10.5 Хоорондын хамаарлыг батлах бичиг баримт (төрсний гэрчилгээ, төрөл садангийн лавлагаа зэрэг)
`;

export const DETAILED_CHECKLIST_DATA = {
  core: [
    { 
      id: 'passport', 
      titleEn: 'Passport', 
      titleMn: 'Гадаад паспорт', 
      descEn: 'Valid for at least 6 months. Must have blank pages.', 
      descMn: 'Хүчинтэй хугацаа нь 6 сараас дээш, хоосон хуудастай байх.' 
    },
    { 
      id: 'app_form', 
      titleEn: 'Visa Application Form', 
      titleMn: 'Визний мэдүүлгийн хуудас', 
      descEn: 'Filled and signed accurately.', 
      descMn: 'Үнэн зөв бөглөж, гарын үсэг зурсан байх.' 
    },
    { 
      id: 'photo', 
      titleEn: 'Passport Photo', 
      titleMn: 'Цээж зураг', 
      descEn: '4.5x4.5cm, White background, taken within last 6 months. No hats or dark glasses.', 
      descMn: '4.5х4.5 хэмжээтэй, цагаан фонтой, сүүлийн 6 сард авахуулсан. Малгай, нүдний шилгүй.' 
    },
    { 
      id: 'declaration', 
      titleEn: 'Declaration Form', 
      titleMn: 'Мэдүүлэгч иргэний баталгаа', 
      descEn: 'Signed declaration form.', 
      descMn: 'Гарын үсэг зурсан баталгааны маягт.' 
    },
    { 
      id: 'itinerary', 
      titleEn: 'Detailed Itinerary', 
      titleMn: 'Аяллын дэлгэрэнгүй хөтөлбөр', 
      descEn: 'Must include daily route, specific addresses, hotel names, and phone numbers.', 
      descMn: 'Өдөр бүрийн маршрут, хаяг, буудлын нэр, утасны дугаарыг тодорхой бичих.' 
    },
    { 
      id: 'booking', 
      titleEn: 'Flight & Hotel Booking', 
      titleMn: 'Нислэгийн болон буудлын захиалга', 
      descEn: 'Confirmed reservations matching your itinerary.', 
      descMn: 'Аяллын хөтөлбөртэй таарсан баталгаажсан захиалга.' 
    }
  ],
  occupation: {
    employed: [
      { 
        id: 'job_cert', 
        titleEn: 'Employment Certificate', 
        titleMn: 'Ажлын тодорхойлолт', 
        descEn: 'On official letterhead. Must state: Position, Salary, Date of Hire. Signed & Stamped.', 
        descMn: 'Албан бланк дээр. Албан тушаал, цалин, ажилд орсон огноог бичиж, тамга гарын үсгээр баталгаажсан байх.' 
      },
      { 
        id: 'social_ins', 
        titleEn: 'Social Insurance (NDSH)', 
        titleMn: 'Нийгмийн Даатгалын Лавлагаа', 
        descEn: 'Statement for the last 3 years (Form ND-7/ND-8).', 
        descMn: 'Сүүлийн 3 жилийн нийгмийн даатгалын төлөлтийн лавлагаа.' 
      }
    ],
    self_employed: [
       { 
         id: 'business_license', 
         titleEn: 'Business Documents', 
         titleMn: 'Бизнесийн бичиг баримт', 
         descEn: 'Business activity certificate, special license, or lease agreement.', 
         descMn: 'Үйл ажиллагаа явуулж буй лавлагаа, тусгай зөвшөөрөл эсвэл түрээсийн гэрээ.' 
       },
       { 
         id: 'tax_ref', 
         titleEn: 'Tax Reference', 
         titleMn: 'Татварын тодорхойлолт', 
         descEn: 'Reference of tax payment for business activities.', 
         descMn: 'Татвар төлөлтийн тодорхойлолт.' 
       }
    ],
    director: [
      { 
        id: 'company_cert', 
        titleEn: 'Company Certificate', 
        titleMn: 'ААН-ийн гэрчилгээ', 
        descEn: 'Copy of State Registration Certificate.', 
        descMn: 'Улсын бүртгэлийн гэрчилгээний хуулбар.' 
      },
      { 
        id: 'company_charter', 
        titleEn: 'Company Charter', 
        titleMn: 'Компанийн дүрэм', 
        descEn: 'Copy of company charter (if non-state).', 
        descMn: 'Компанийн дүрмийн хуулбар.' 
      }
    ],
    student: [
      { 
        id: 'school_ref', 
        titleEn: 'Student Certificate', 
        titleMn: 'Сургуулийн тодорхойлолт', 
        descEn: 'Official reference from the school/university.', 
        descMn: 'Сургуулийн тодорхойлолт.' 
      }
    ],
    retiree: [
      { 
        id: 'pension_book', 
        titleEn: 'Pension Book', 
        titleMn: 'Тэтгэврийн дэвтэр', 
        descEn: 'Copy of pension book or reference.', 
        descMn: 'Тэтгэврийн дэвтрийн хуулбар эсвэл лавлагаа.' 
      }
    ],
    unemployed: []
  },
  financial: {
    self: [
      { 
        id: 'bank_statement', 
        titleEn: 'Bank Statement', 
        titleMn: 'Банкны хуулга', 
        descEn: 'Summary of last 6 months OR Final Balance Certificate + 3 months detailed statement.', 
        descMn: 'Сүүлийн 6 сарын хуулга ЭСВЭЛ Үлдэгдлийн тодорхойлолт + сүүлийн 3 сарын дэлгэрэнгүй хуулга.',
        warningsEn: [
          'Must have Stamp, Seal, and QR Code.',
          'Sudden large deposits before application may cause refusal.',
          'Non-bank financial institution (NBFI) records and Credit Cards are NOT valid.'
        ],
        warningsMn: [
           'Тамга, тэмдэг, QR кодтой байх шаардлагатай.',
           'Мэдүүлэг өгөхөөс өмнө гэнэт их хэмжээний орлого хийх нь татгалзах шалтгаан болно.',
           'ББСБ-ын тодорхойлолт болон Кредит карт тооцохгүй.'
        ]
      }
    ],
    sponsor: [
      { 
        id: 'sponsor_job', 
        titleEn: 'Sponsor: Employment Proof', 
        titleMn: 'Батлан даагч: Ажлын тодорхойлолт', 
        descEn: 'Certificate of employment and income.', 
        descMn: 'Ажил эрхлэлт, орлогын тодорхойлолт.' 
      },
      { 
        id: 'sponsor_social', 
        titleEn: 'Sponsor: Social Insurance', 
        titleMn: 'Батлан даагч: НДШ', 
        descEn: '3-year payment statement.', 
        descMn: 'Сүүлийн 3 жилийн НДШ-ийн лавлагаа.' 
      },
      { 
        id: 'sponsor_bank', 
        titleEn: 'Sponsor: Bank Statement', 
        titleMn: 'Батлан даагч: Банкны хуулга', 
        descEn: '6 months summary or 3 months detail. Same strict rules apply (QR code, no sudden deposits).', 
        descMn: 'Сүүлийн 6 сарын хуулга. QR кодтой, гэнэтийн орлогогүй байх.' 
      },
      { 
        id: 'relationship', 
        titleEn: 'Proof of Relationship', 
        titleMn: 'Ураг төрлийн лавлагаа', 
        descEn: 'Birth certificate or Kinship reference proving relationship to applicant.', 
        descMn: 'Төрсний гэрчилгээ эсвэл ураг төрлийн лавлагаа.' 
      }
    ]
  },
  minor: [
      { 
        id: 'parent_consent', 
        titleEn: 'Parental Consent', 
        titleMn: 'Эцэг эхийн зөвшөөрөл', 
        descEn: 'Notarized consent form from parents/guardians.', 
        descMn: 'Эцэг эх, асран хамгаалагчийн нотариатаар баталгаажуулсан зөвшөөрөл.' 
      }
  ]
};

export const TEXTS = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      guide: "Step-by-Step Guide",
      visa: "Visa",
      pricing: "Pricing",
      applyOnline: "Apply Online",
      applyInPerson: "Apply In-Person",
      checklist: "Required Documents",
      contact: "Contact / FAQ",
      login: "Sign In",
      logout: "Sign Out",
      dashboard: "My Dashboard"
    },
    hero: {
      title: "Premium Visa Preparation Service",
      tagline: "Your seamless journey to Japan starts here",
      description: "Expert guidance for Mongolian applicants preparing Japanese visa documentation with confidence and ease.",
      ctaPrimary: "Start Your Visa Application",
      ctaSecondary: "Learn More"
    },
    quickLinks: {
      title: "Quick Access Links",
      checklist: {
        title: "Required Documents",
        desc: "Access the interactive checklist customized for your visa type."
      },
      guide: {
        title: "Step-by-Step Guide",
        desc: "Follow the official 7-step process for a successful application."
      },
      pricing: {
        title: "Pricing & Plans",
        desc: "View our service fees and group discount options."
      },
      support: {
        title: "Expert Support",
        desc: "Get 24/7 assistance from our visa specialists via live chat."
      }
    },
    services: {
      title: "Our Advantages",
      checklist: {
        title: "Interactive Checklist",
        desc: "Dynamic document tracking tailored to your specific visa type."
      },
      guide: {
        title: "Visual Step-by-Step Guide",
        desc: "A clear timeline visualization of the entire application process."
      },
      expertSupport: {
        title: "24/7 Expert Support",
        desc: "Provides uninterrupted, timely expert consultation regarding complex Japanese immigration nuances and specific visa requirements."
      },
      financial: {
        title: "Risk-Free Financial Guidance",
        desc: "Ensures compliance with official requirements, fully guarding against risks from sudden deposits and non-bank documents."
      },
      process: {
        title: "Official 7-Step Guide",
        desc: "Clearly explains the official VFS Global 7-stage process step-by-step, saving you time and confusion."
      },
      aiCheck: {
        title: "AI Document Verification",
        desc: "Utilizes world-class advanced technology to meticulously verify your prepared documents for completeness and correctness before submission."
      }
    },
    pricing: {
      title: "Simple, Transparent Pricing",
      desc: "Choose the plan that suits your needs.",
      warning: "WARNING: This price is only for our service fee and DOES NOT include the separate VFS Global visa application fee.",
      cta: "Select Package",
      standard: {
        title: "Standard Service",
        price: "70,000₮",
        unit: "per person",
        features: ["Full Document Review", "Application Form Filling", "Itinerary Creation", "Interview Prep"]
      },
      group: {
        title: "Group Discount",
        price: "50,000₮",
        unit: "per person",
        subtitle: "For groups of 5+ people",
        features: ["All Standard Features", "Group Itinerary Sync", "Priority Support", "Bulk Processing"]
      }
    },
    terms: {
        title: "Terms of Service",
        legalBasisTitle: "Legal Basis",
        legalBasisText: "Our service provides information, consultation, and document preparation support for the visa application process in accordance with Mongolian and relevant international laws.",
        liabilityTitle: "Limitation of Liability",
        liabilityText: "The final decision to accept or reject a visa application lies solely with the Embassy of Japan (or Visa Application Center). Therefore, **Our company is not liable for visa rejections.**",
        agreeLabel: "I agree to the Terms of Service.",
        acceptBtn: "I Accept",
        cancelBtn: "Cancel"
    },
    gated: {
      locked: "Log in to access this premium content.",
      paymentLocked: "Payment Verification Required",
      paymentDesc: "This content is available only after your payment of 70,000₮ has been verified by our team.",
      unlock: "Sign in with Google",
      welcome: "Welcome back,"
    },
    chat: {
      placeholder: "Ask about visa requirements...",
      header: "Visa Expert Support",
      greeting: "Hello! How can I help you with your Japanese visa application today?",
      payment: {
        askCount: "Please specify the number of applicants in your group.",
        invoice: "Total Payment: {total}₮.\nBank: Khan Bank 5000000000 (PreVisa MN).\n\nIMPORTANT: Please enter your registered email address in the Transaction Details field.",
        confirmed: "Your payment has been confirmed. The Visa documents and checklist are now active. Good luck! Please leave your phone number. We will call you during business hours.",
        cancel: "Cancel Payment"
      }
    },
    dashboard: {
      welcome: "Welcome back,",
      statusCard: "Application Status",
      progressCard: "Completion",
      daysCard: "Est. Days Left",
      recentActivity: "Recent Activity",
      quickActions: "Quick Actions",
      downloadForm: "Download Visa Application Form",
      scheduleAppt: "Schedule Appointment",
      mockStatus: "Document Gathering",
      mockActivity1: "Account created successfully",
      mockActivity2: "Accessed Required Documents Checklist",
      emptyActivity: "No recent activity recorded."
    },
    admin: {
      title: "Admin Portal",
      overview: "Overview",
      applications: "Applications",
      liveChat: "Live Support",
      users: "User Management",
      banner: "Banner Management",
      stats: {
        totalUsers: "Total Users",
        pendingVisas: "Pending Reviews",
        activeChats: "Active Conversations"
      },
      chat: {
        activeList: "Active Inquiries",
        typeReply: "Type expert response...",
        send: "Send Reply"
      },
      approvePayment: "Approve Payment",
      bannerConfig: {
        title: "Homepage Banner Configuration",
        type: "Content Type",
        typeDiscount: "Discount / Special Offer",
        typeStandard: "Standard Advertisement",
        image: "Banner Image",
        upload: "Click to upload image",
        link: "Action Link (URL)",
        schedule: "Schedule & Visibility",
        startDate: "Start Date",
        endDate: "End Date",
        showOnHome: "Show on Homepage",
        save: "Save Banner Settings",
        preview: "Active Banner Preview",
        noActive: "No active banner configured."
      }
    },
    footer: {
      contactCol: "Contact & Logo",
      linksTitle: "Quick Links",
      legalTitle: "Legal & Support",
      tagline: "Your seamless journey to Japan starts here",
      email: "Email: Maxhause.llc@gmail.com",
      phone: "Phone: +976 88914891",
      workHours: "Working Hours: Mon-Fri, 09:00 - 18:00",
      address: "Address: Khan-Uul District 22th Khoroo, Ulaanbaatar, Mongolia",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      faq: "Contact / FAQ",
      copyright: "© 2025 PreVisa MN. All rights reserved."
    },
    steps: [
      { title: "1. Determine Visa Type", desc: "Identify the correct visa category (Tourist, Business, Transit) based on your purpose of travel." },
      { title: "2. Start Application", desc: "Download the application form and begin collecting all required documents." },
      { title: "3. Book Appointment", desc: "Schedule your submission appointment at the VFS Global Visa Application Center." },
      { title: "4. Pay Fees", desc: "Pay the visa and service fees via QPay, Card, or Cash at the center." },
      { title: "5. Visit VFS Center", desc: "Submit your printed application and biometric data in person." },
      { title: "6. Track Status", desc: "Monitor your application status online using your reference number." },
      { title: "7. Collect Passport", desc: "Retrieve your passport in person or opt for courier delivery." }
    ],
    checklistInfo: {
        feesLabel: "Total Fees (Est.)",
        timeLabel: "Processing Time",
        downloadPdf: "Download E-Visa Document Checklist (PDF)",
        types: {
            tourist: "Tourist Visa",
            business: "Business Visa",
            transit: "Transit Visa"
        },
        controls: {
          occupation: "Your Occupation Status",
          funding: "Funding Source",
          minor: "Applicant is a Minor (<18)"
        },
        sections: {
          core: "Mandatory Core Documents",
          occupation: "Employment & Status Proof",
          financial: "Financial Capability Proof",
          minor: "Additional Minor Requirements"
        }
    }
  },
  mn: {
    nav: {
      home: "Нүүр",
      services: "Нүүр",
      guide: "Заавар",
      visa: "Виз",
      pricing: "Үнэ",
      applyOnline: "Цахимаар мэдүүлэх",
      applyInPerson: "Биеээр уулзаж мэдүүлэх",
      checklist: "Бүрдүүлэх Материал",
      contact: "Холбоо барих / FAQ",
      login: "Нэвтрэх",
      logout: "Гарах",
      dashboard: "Миний Хуудас"
    },
    hero: {
      title: "Дээд Зэрэглэлийн Виз Бэлтгэлийн Үйлчилгээ",
      tagline: "Япон руу хийх таны аялал эндээс эхэлнэ",
      description: "Монгол иргэдэд зориулсан Японы визийн материалыг итгэлтэй бөгөөд хялбар бэлтгэх мэргэжлийн зөвлөгөө.",
      ctaPrimary: "Визний Материал Бэлтгэлээ Эхлүүл",
      ctaSecondary: "Дэлгэрэнгүй"
    },
    quickLinks: {
      title: "Шуурхай Холбоосууд",
      checklist: {
        title: "Бүрдүүлэх Бичиг Баримт",
        desc: "Визний төрөлдөө тохирсон бичиг баримтын жагсаалт."
      },
      guide: {
        title: "Заавар",
        desc: "Албан ёсны 7 үе шаттай виз мэдүүлэх үйл явц."
      },
      pricing: {
        title: "Үнэ Тариф",
        desc: "Үйлчилгээний хөлс болон групп хөнгөлөлт харах."
      },
      support: {
        title: "Мэргэжлийн Дэмжлэг",
        desc: "Визний мэргэжилтэнтэй 24/7 цаг шууд холбогдох."
      }
    },
    services: {
      title: "Манай Давуу Тал",
      checklist: {
        title: "Жагсаалт",
        desc: "Таны визний төрөлд тохирсон бичиг баримтын динамик жагсаалт."
      },
      guide: {
        title: "Заавар",
        desc: "Виз мэдүүлэх үйл явцыг бүхэлд нь харуулсан цаг хугацааны дүрслэл."
      },
      expertSupport: {
        title: "24/7 Мэргэжлийн Дэмжлэг",
        desc: "Японы цагаачлалын нарийн ширийн зүйл, визний онцгой шаардлагуудын талаарх мэргэжилтний зөвлөгөөг тасралтгүй, цаг алдалгүй хүргэнэ."
      },
      financial: {
        title: "Эрсдэлгүй Санхүүгийн Зөвлөгөө",
        desc: "Албан ёсны шаардлагуудад нийцүүлэн, гэнэтийн орлого, банк бус байгууллагын баримтын эрсдлээс бүрэн хамгаална."
      },
      process: {
        title: "Албан ёсны 7-н Алхамт Заавар",
        desc: "VFS Global-ийн албан ёсны 7 үе шаттай үйл явцыг алхам алхмаар, ойлгомжтойгоор тайлбарлаж, цаг хугацааг хэмнэнэ."
      },
      aiCheck: {
        title: "Хиймэл оюунаар Баримт Шалгах",
        desc: "Дэлхийн түвшний дэвшилтэт технологи ашиглан таны бүрдүүлсэн материалыг илгээхээс өмнө бүрэн эсэх, зөв эсэхийг нарийвчлан шалгана."
      }
    },
    pricing: {
      title: "Үнэ Тариф",
      desc: "Өөрийн хэрэгцээнд тохирох багцыг сонгоно уу.",
      warning: "АНХААРУУЛГА: Энэхүү үнэ нь зөвхөн манай үйлчилгээний хөлс бөгөөд VFS Global-ийн виз мэдүүлгийн хураамж ТУСДАА төлөгдөнө.",
      cta: "Багц Сонгох",
      standard: {
        title: "Стандарт Багц",
        price: "70,000₮",
        unit: "хүн бүр",
        features: ["Бичиг баримтын бүрэн хяналт", "Анкет бөглөх үйлчилгээ", "Аяллын хөтөлбөр гаргах", "Ярилцлагын бэлтгэл"]
      },
      group: {
        title: "Групп Хөнгөлөлт",
        price: "50,000₮",
        unit: "хүн бүр",
        subtitle: "5-аас дээш хүнтэй бүлэгт",
        features: ["Бүх Стандарт үйлчилгээ", "Нэгдсэн аяллын төлөвлөгөө", "Тэргүүн ээлжийн зөвлөгөө", "Бөөнөөр материал бүрдүүлэх"]
      }
    },
    terms: {
        title: "Үйлчилгээний Нөхцөл",
        legalBasisTitle: "Хууль Зүйн Үндэслэл",
        legalBasisText: "Манай үйлчилгээ нь Монгол Улсын болон холбогдох олон улсын хууль тогтоомжийн дагуу виз мэдүүлэх үйл явцад зөвхөн мэдээлэл, зөвлөгөө, болон бүрдүүлэлтийн дэмжлэг үзүүлнэ.",
        liabilityTitle: "Хариуцлагын Хязгаарлалт",
        liabilityText: "Визний мэдүүлгийг хүлээж авах эсвэл татгалзах бүрэн шийдвэр нь зөвхөн Япон Улсын ЭСЯ (эсвэл Виз мэдүүлгийн төв)-ний эрх мэдэлд хамаарах тул, **Манай компани виз татгалзсан тохиолдолд хариуцлага хүлээхгүй.**",
        agreeLabel: "Би Үйлчилгээний Нөгцөлийг зөвшөөрч байна.",
        acceptBtn: "Зөвшөөрөх",
        cancelBtn: "Болих"
    },
    gated: {
      locked: "Энэхүү хэсэгт нэвтрэхийн тулд бүртгүүлнэ үү.",
      paymentLocked: "Төлбөр Баталгаажуулалт Шаардлагатай",
      paymentDesc: "Энэхүү хэсэг нь 70,000₮ төлбөр төлөгдөж, манай багаар баталгаажсаны дараа нээгдэнэ.",
      unlock: "Google хаягаар нэвтрэх",
      welcome: "Тавтай морилно уу,"
    },
    chat: {
      placeholder: "Визний шаардлагын талаар асуух...",
      header: "Визний Зөвлөх",
      greeting: "Сайн байна уу! Өнөөдөр танд Японы визний талаар хэрхэн туслах вэ?",
      payment: {
        askCount: "Танай баг хэдэн хүнтэй вэ?",
        invoice: "Нийт Төлбөр: {total}₮.\nДанс: Хаан Банк MN810005005403058016 (Amarsanaa Bat-Ochir).\n\nЧУХАЛ: Гүйлгээний утга дээр бүртгүүлсэн Имэйл хаягаа заавал бичнэ үү!",
        confirmed: "Таны төлбөр баталгаажлаа. Визний бүрдүүлэх материал болон шалгах хуудас идэвхжлээ. Амжилт хүсье! Та утасны дугаараа үлдээнэ үү. Бид тантай ажлын цагаар залгах болно.",
        cancel: "Төлбөр Цуцлах"
      }
    },
    dashboard: {
      welcome: "Тавтай морилно уу,",
      statusCard: "Визний Төлөв",
      progressCard: "Нийт Гүйцэтгэл",
      daysCard: "Тооцоолсон Хугацаа",
      recentActivity: "Сүүлийн Үйл Явц",
      quickActions: "Шуурхай Цэс",
      downloadForm: "Визний Мэдүүлэг Татах",
      scheduleAppt: "Цаг Захиалах",
      mockStatus: "Бичиг Баримт Бүрдүүлэлт",
      mockActivity1: "Бүртгэл амжилттай үүслээ",
      mockActivity2: "Бүрдүүлэх материалын жагсаалт үзсэн",
      emptyActivity: "Сүүлийн үеийн үйлдэл алга."
    },
    admin: {
      title: "Админ Портал",
      overview: "Ерөнхий Төлөв",
      applications: "Визний Мэдүүлгүүд",
      liveChat: "Шууд Дэмжлэг",
      users: "Хэрэглэгчийн Удирдлага",
      banner: "Баннерын Удирдлага",
      stats: {
        totalUsers: "Нийт Хэрэглэгч",
        pendingVisas: "Хүлээгдэж буй",
        activeChats: "Идэвхтэй Чаат"
      },
      chat: {
        activeList: "Ирсэн Хүсэлтүүд",
        typeReply: "Хариулт бичих...",
        send: "Хариулах"
      },
      approvePayment: "Төлбөр Баталгаажуулах",
      bannerConfig: {
        title: "Нүүр Хуудасны Баннер Тохиргоо",
        type: "Агуулгын Төрөл",
        typeDiscount: "Хямдралын Зурган Хуудас",
        typeStandard: "Ердийн Зар",
        image: "Баннерын Зураг",
        upload: "Зураг оруулах (Click to upload)",
        link: "Холбоос Хаяг (URL)",
        schedule: "Хугацаа ба Харагдах байдал",
        startDate: "Эхлэх Огноо",
        endDate: "Дуусах Огноо",
        showOnHome: "Нүүр Хуудсанд Харуулах",
        save: "Тохиргоог Хадгалах",
        preview: "Идэвхтэй Баннер Хяналт",
        noActive: "Идэвхтэй баннер тохируулаагүй байна."
      }
    },
    footer: {
      contactCol: "Контакт ба Лого",
      linksTitle: "Шуурхай холбоосууд",
      legalTitle: "Хууль эрх зүй ба Дэмжлэг",
      tagline: "Япон руу хийх таны аялал эндээс эхэлнэ",
      email: "Имэйл: Maxhause.llc@gmail.com",
      phone: "Утас: +976 88914891",
      workHours: "Цагийн хуваарь: Даваа-Баасан, 09:00-18:00",
      address: "Хаяг: Хан-Уул Дүүрэг 22-Р Хороо Улаанбаатар, Монгол Улс",
      terms: "Үйлчилгээний Нөхцөл",
      privacy: "Нууцлалын Бодлого",
      faq: "Холбоо барих / FAQ",
      copyright: "© 2025 PreVisa MN. Бүх эрх хуулиар хамгаалагдсан."
    },
    steps: [
      { title: "1. Визийн төрлөө тодорхойлох", desc: "Аяллын зорилгодоо нийцүүлэн визийн ангиллаа сонгох (Аялал, Бизнес)." },
      { title: "2. Визийн мэдүүлгээ эхлэх", desc: "Мэдүүлгийн хуудсыг татан авч, шаардлагатай бичиг баримтыг цуглуулж эхлэх." },
      { title: "3. Цаг товлох", desc: "VFS Global Визийн Мэдүүлгийн Төвд материал өгөх цагаа цахимаар товлох.Манайх цаг товлож өгнө." },
      { title: "4. Төлбөр төлөх", desc: "Визний хураамж болон үйлчилгээний хөлсийг QPay, карт эсвэл бэлнээр төлөх." },
      { title: "5. Виз Мэдүүлгийн Төвд очих", desc: "Бэлтгэсэн материалаа биеэр авчирч, биометрийн өгөгдлөө өгөх." },
      { title: "6. Визийн явцаа хянах", desc: "Өргөдлийн дугаараа ашиглан визний шийдвэрлэлтийн явцыг цахимаар хянах." },
      { title: "7. Паспортоо авах", desc: "Паспортоо биеэр очиж авах эсвэл шуудангаар хүргүүлэн авах." }
    ],
    checklistInfo: {
        feesLabel: "Нийт Төлбөр (Тооц.)",
        timeLabel: "Шийдвэрлэх Хугацаа",
        downloadPdf: "Цахим Визний Бүрдүүлэлтийн Жагсаалтыг PDF-ээр Татах",
        types: {
            tourist: "Аялал жуулчлал",
            business: "Бизнес / Албан",
            transit: "Дамжих"
        },
        controls: {
          occupation: "Таны эрхэлж буй ажил",
          funding: "Санхүүжилтийн эх үүсвэр",
          minor: "Насанд хүрээгүй (18-аас доош)"
        },
        sections: {
          core: "Заавал бүрдүүлэх материал",
          occupation: "Ажил эрхлэлт / Статус",
          financial: "Санхүүгийн чадамж",
          minor: "Насанд хүрээгүй иргэн"
        }
    }
  }
};
