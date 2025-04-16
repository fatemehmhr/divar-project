import { sp } from "src/utils/numbers";

import styles from "./Main.module.css";

function Main({ posts }) {

  // console.log("posts:", posts);

  const baseURL = import.meta.env.VITE_BASE_URL?.replace(/\/+$/, "") || "http://localhost:3400";

  // تابع برای نرمال‌سازی مسیر تصویر
  const normalizeImagePath = (path) => {
    if (!path) return "";
    // تبدیل بک‌اسلش به اسلش و اطمینان از شروع با /
    return `/${path.replace(/\\/g, "/")}`;
  };


  // console.log(posts);

  return (
    <div className={styles.container}>
      {
        posts.data.posts.map((post) => {
          const imageUrl = post.images?.length > 0
            ? `${baseURL}${normalizeImagePath(post.images[0])}`
            : "/placeholder.jpg";
          console.log(`Image URL for post ${post._id}:`, imageUrl); // برای دیباگ

          
          
          
          return (
            <div key={post._id} className={styles.card}>
              <div className={styles.info}>
                <p>{post.options?.title || "بدون عنوان"}</p>
                <div >
                  <p>{sp(post.amount)} تومان</p>
                  <span>{post.options?.city || "بدون شهر"}</span>
                </div>
              </div>
              <img src={imageUrl}
              // alt={post.options?.title || "تصویر پست"}
              />
            </div>
          )
        })
      }

    </div>
  )
}

export default Main