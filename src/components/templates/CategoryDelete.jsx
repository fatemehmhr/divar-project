import { deleteCategory } from "src/services/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteIcon from "../../../public/Delete.svg";

function CategoryDelete({ categoryId }) {

    console.log(categoryId)

    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {

            queryClient.invalidateQueries(['get-categories']);
            console.log('دسته‌بندی با موفقیت حذف شد');
        },
        onError: (error) => {
            console.error('خطا در حذف دسته‌بندی:', error);
        },
    });

    const handleDelete = () => {
        mutate(categoryId); // اجرای درخواست DELETE با شناسه
    };


    return (
        <>
            <button
                onClick={handleDelete}
                disabled={isLoading}
            >
                <img src={deleteIcon} />
            </button>
        </>
    )
}

export default CategoryDelete;