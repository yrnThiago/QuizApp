<script setup>
    import {useRoute} from "vue-router"
    import quizesData from "../data/quizes.json"
    import Question from "../components/Question.vue"
    import QuizHeader from "../components/QuizHeader.vue"
    import Result from "../components/Result.vue"
    import { ref, computed } from "vue"

    const route = useRoute();
    const quizId = parseInt(route.params.id);
    const [quiz] = quizesData.filter(quiz => quiz.id === quizId);
    const currentQuestionsIndex = ref(0);
    const numberOfCorrectAnswers = ref(0);
    const showResults = ref(false);

    const questionStatus = computed(() => `${currentQuestionsIndex.value}/${quiz.questions.length}`);
    const barPercentage = computed(() => `${currentQuestionsIndex.value/quiz.questions.length * 100}%`);

    const onOptionSelected = (isCorrect) => {
        if (isCorrect) {
            numberOfCorrectAnswers.value++;
        }

        if (currentQuestionsIndex.value === quiz.questions.length -1){
            showResults.value = true;
        }

        currentQuestionsIndex.value++;
    };
</script>

<template>
    <div v-if="quiz">
        <div v-if="!showResults">
            <QuizHeader  :questionStatus="questionStatus" :barPercentage="barPercentage" />
            <Question :question="quiz.questions[currentQuestionsIndex]" @selectOption="onOptionSelected" />
        </div>
        <div v-else>
            <Result :quizQuestionLength="quiz.questions.length" :numberOfCorrectAnswers="numberOfCorrectAnswers"/>
        </div>
    </div>
    <div v-else>
        <h1>Quiz Not Found!</h1>
    </div>
</template>