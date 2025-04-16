import { useQuery } from "@tanstack/react-query"

import { sp } from "utils/numbers";
import { getPosts } from "services/user"
import Loader from "../modules/Loader";

import styles from './PostList.module.css';


function PostList() {

    const baseURL = import.meta.env.VITE_BASE_URL;
    // console.log('baseURL:', baseURL)

    const { data, isLoading } = useQuery(["my-post-list"], getPosts);

   // console.log(data); // دیتا هایی که کاربر ساخته است را به ما بر می گرداند



    return (
        <div className={styles.list} >
            {
                isLoading ? (<Loader />) : (
                    <>
                        <h3>آگهی های شما</h3>
                        {
                            data?.data.posts.map((post) => (
                                <div key={post._id} className={styles.post}>
                                    <img src={`${baseURL}${post.images[0]}`} />
                                    <div>
                                        <p>{post.options.title}</p>
                                        <span>{post.options.content}</span>
                                    </div>
                                    <div className={styles.price} >
                                        <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                                        <span>{sp(post.amount)} تومان</span>
                                    </div>
                                </div>
                            ))
                        }


                    </>
                )

            }
        </div>
    )
}

export default PostList 