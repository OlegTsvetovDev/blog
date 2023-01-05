import { Route, Routes } from 'react-router-dom'

import AddPostForm from './features/posts/AddPostForm'
import PostsList from './features/posts/PostsList'
import Layout from './components/Layout'
import SinglePostPage from './features/posts/SinglePostPage'
import EditPostForm from './features/posts/EditPostForm'
import PageError from './components/PageError'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="posts">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
        <Route path="*" element={<PageError />} />
      </Route>
    </Routes>
  )
}


export default App
