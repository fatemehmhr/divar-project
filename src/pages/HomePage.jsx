import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "services/user";
import { getCategory } from "services/admin";

import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import Loader from "components/modules/Loader";


const style = { display: "flex" }

function HomePage() {

  const { data: posts, isLoading: postLoading } = useQuery({
    queryKey: ["post-list"],
    queryFn: getAllPosts,
  });
  // console.log({posts, isLoading});

  const { data: categories, isLoading: categoryLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });
  // console.log("categories:", categories)

  return (
    <>
      {postLoading || categoryLoading ? <Loader /> : (
        <div style={style}>
          <Sidebar categories={categories} />
          <Main posts={posts} />
        </div>
      )}
    </>
  )
}

export default HomePage