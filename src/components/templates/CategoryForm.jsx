import { useState } from "react";

import styles from "./CategoryForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "src/services/admin";

function CategoryForm() {

    const queryClient = useQueryClient();

    const [form, setForm] = useState({ name: "", slug: "", icon: "" })

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }



    const submitHandler = (event) => {
        event.preventDefault();

        if (!form.name || !form.slug || !form.icon) return;


        // console.log(form);

        mutate(form);

        setForm({
            name: '',
            slug: '',
            icon: ''
        })
    }


    const { mutate, isLoading, data, error } = useMutation(addCategory, {
        onSuccess: () => queryClient.invalidateQueries("get-categories")
    });

    // console.log({ error, isLoading, data })

    return (
        <form onSubmit={submitHandler} className={styles.form} >
            <h3>دسته بندی جدید</h3>
            {!!error && <p>{error.message}</p>}

            {data?.status === 201 && <p>دسته بندی با موفقیت اضافه شد</p>}

            <label htmlFor="name">اسم دسته بندی</label>
            <input
                type="text"
                name="name"
                id="name"
                onChange={changeHandler}
                value={form.name}
            />

            <label htmlFor="slug">اسلاگ</label>
            <input
                type="text"
                name="slug"
                id="slug"
                onChange={changeHandler}
                value={form.slug}
            />

            <label htmlFor="icon">آیکون</label>
            <input
                type="text"
                name="icon"
                id="icon"
                onChange={changeHandler}
                value={form.icon}
            />

            <button type="submit" disabled={isLoading} >ایجاد</button>
        </form>
    )
}

export default CategoryForm