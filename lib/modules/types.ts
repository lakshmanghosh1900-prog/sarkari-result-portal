// এই ফাইলটি আপনার প্রজেক্টের বিভিন্ন মডিউলে শেয়ার করা টাইপগুলো ধারণ করে।

export interface ActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

// আপনার প্রজেক্টের প্রয়োজনে আরও প্রয়োজনীয় টাইপ এখানে যোগ করতে পারেন।
// যেমন:
export interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
}