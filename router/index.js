// define our routing rules //

import { createRouter, createWebHistory } from "vue-router"
import QuizView from "../views/QuizView.vue"
import QuizesView from "../views/QuizesView.vue"
import NotFoundView from "../views/NotFoundView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "quizes",
            component: QuizesView
        },
        {
            path: "/quizes",
            redirect: "/"
        },
        {
            path: "/quiz/:id",
            name: "quiz",
            component: QuizView
        },
        {
            path: "/:catchall(.*)*",
            name: "not found",
            component: NotFoundView
        }
    ]
})

export default router