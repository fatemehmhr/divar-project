import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { getCookie } from "utils/cookie";
import { getCategory } from "services/admin";
import { addPostSchema } from "src/validations/addPostValidationSchema";
import toast from "react-hot-toast";
import styles from './AddPost.module.css';


function AddPost() {
    const { data } = useQuery(["get-categories"], getCategory);


    const addHandler = async (values, { setSubmitting }) => {
        const formData = new FormData();


        //formData اضافه کردن تمام فیلدها به
        Object.keys(values).forEach(key => {
            if (values[key] !== null && values[key] !== undefined) {
                formData.append(key, values[key]);
            }
        });


        // console.log('formData:', formData);


        const token = getCookie("accessToken");
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}post/create`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `bearer ${token}`,
                    },
                }
            );
            toast.success(res.data.message);
        } catch (error) {
            toast.error("مشکلی پیش آمده است.");
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <Formik
            initialValues={{
                title: "",
                content: "",
                amount: "",
                city: "",
                category: null,
                images: null,
            }}
            validationSchema={addPostSchema}
            onSubmit={addHandler}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className={styles.form}>
                    <h3>افزودن آگهی</h3>


                    <label htmlFor="title">عنوان</label>
                    <Field type="text" name="title" id="title" />
                    <ErrorMessage
                        name="title"
                        render={(msg) => <div style={{ color: "red", marginBottom: '10px' }}>{msg}</div>}
                    />


                    <label htmlFor="content">توضیحات</label>
                    <Field as="textarea" name="content" id="content" />
                    <ErrorMessage
                        name="content"
                        render={(msg) => <div style={{ color: "red", marginBottom: '10px' }}>{msg}</div>}
                    />


                    <label htmlFor="amount">قیمت</label>
                    <Field type="number" name="amount" id="amount" />
                    <ErrorMessage
                        name="amount"
                        render={(msg) => <div style={{ color: "red", marginBottom: '10px' }}>{msg}</div>}
                    />


                    <label htmlFor="city">شهر</label>
                    <Field type="text" name="city" id="city" />
                    <ErrorMessage
                        name="city"
                        render={(msg) => <div style={{ color: "red", marginBottom: '10px' }}>{msg}</div>}
                    />


                    <label htmlFor="category">دسته بندی</label>
                    <Field as="select" name="category" id="category">
                        <option value="">انتخاب کنید</option>
                        {data?.data.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage
                        name="category"
                        render={(msg) => <div style={{ color: "red", marginBottom: '10px' }}>{msg}</div>}
                    />


                    <label htmlFor="images">عکس</label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue("images", file || null);
                        }}
                    />
                    <ErrorMessage
                        name="images"
                        render={(msg) => <div style={{ color: "red", marginBottom: '10px' }}>{msg}</div>}
                    />


                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "در حال ارسال..." : "ایجاد"}
                    </button>
                </Form>
            )}
        </Formik>
    );
}


export default AddPost;