import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export interface Post {
    "id": string,
    "title": string,
    "content": string
    "author": {
        "name": string
    }
}

export const usePost = (id: { id: string }) => {
    const [loading, setLoading] = useState(true)
    const [Post, setPost] = useState<Post>()
    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/Post/${id.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })

                setPost(response.data.post)
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        fetchPost()
    }, [])

    return { loading, Post }
}

export const usePosts = () => {
    const [loading, setLoading] = useState(true)
    const [Posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        async function fetchPosts() {
            try {
                console.log(localStorage.getItem("token"))
                const response = await axios.get(`${BACKEND_URL}/api/v1/Post/bulk`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setPosts(response.data.posts)
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        fetchPosts()
    }, [])

    return { loading, Posts }
}