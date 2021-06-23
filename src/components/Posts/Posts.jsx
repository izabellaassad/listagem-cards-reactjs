import { PostCard } from "../PostCard/PostCard"
import "./styles.css"


export const Posts = ({ posts }) => (
     <div className="posts">
          {posts.map((post, id) => (
            <PostCard
              key={id}
              title={post.title}
              cover={post.cover}
              id={post.id}
              body={post.body}
            />
          ))}
        </div>
)