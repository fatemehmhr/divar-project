import { useQuery } from "@tanstack/react-query";
import { getCategory } from "services/admin";
import Loader from "../modules/Loader";

import styles from "./CategoryList.module.css";
import CategoryDelete from "./CategoryDelete";

function CategoryList() {

    const { data, isLoading } = useQuery(["get-categories"], getCategory);

    // console.log({ isLoading, data })
   

    return (
        <div className={styles.list}>
            {isLoading ? <Loader /> : (
                data?.data.map((item) => (
                    <div key={item._id} >
                        <img src={`${item.icon}.svg`} />
                        <h5>{item.name}</h5>

                        
                        <p>slug: {item.slug}</p>
                        <CategoryDelete categoryId={item._id} />
                        

                    </div>
                )

                )
            )}
        </div>
    )
}

export default CategoryList