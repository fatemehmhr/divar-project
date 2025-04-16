import * as Yup from 'yup';

export const addPostSchema = Yup.object().shape({
    title: Yup.string()
        .required('عنوان آگهی الزامی است.')
        .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد.')
        .max(100, 'عنوان نمی‌تواند بیش از ۱۰۰ کاراکتر باشد.')
        .trim('عنوان نمی‌تواند فقط فاصله باشد'),
    content: Yup.string()
        .required('توضیحات محصول الزامی است.')
        .min(10, 'توضیحات باید حداقل ۱۰ کاراکتر باشد.')
        .max(1000, 'توضیحات نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد.')
        .trim('توضیحات نمی‌تواند فقط فاصله باشد.'),
    amount: Yup.number()
        .typeError('قیمت باید یک عدد باشد.')
        .required('قیمت الزامی است.')
        .min(0, 'قیمت نمی‌تواند منفی باشد.')
        .test(
            'maxDecimals',
            'قیمت نمی‌تواند بیش از دو رقم اعشار داشته باشد.',
            (value) => !value || Number.isInteger(value * 100)
        ),
    city: Yup.string()
        .required('نوشتن شهر الزامی است.')
        .min(2, 'نام شهر باید حداقل ۲ کاراکتر باشد.')
        .trim('شهر نمی‌تواند فقط فاصله باشد.'),
    category: Yup.string()
        .required('انتخاب دسته‌بندی الزامی است.'),

    images: Yup.mixed()
        .nullable()
        .test(
            "fileType",
            "فقط فایل‌های تصویری (JPEG، JPG، PNG، GIF) مجاز هستند.",
            (value) => !value || ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(value.type)
        )
        .test(
            "fileSize",
            "حجم فایل باید کمتر از ۵ مگابایت باشد.",
            (value) => !value || value.size <= 5 * 1024 * 1024
        ),
});