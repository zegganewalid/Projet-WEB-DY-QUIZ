document.addEventListener('DOMContentLoaded', function () {
    let quizForm = document.getElementById('quiz-form');
    let alertDiv = document.getElementById('alert');
    let allCorrect = false; // Variable pour suivre si toutes les réponses sont correctes

    // Vérifiez s'il y a déjà eu une réussite précédente
    let hasPreviousSuccess = localStorage.getItem('quizSuccess') === 'true';
    if (hasPreviousSuccess) {
        congratulationMessage();
    }

    quizForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
        checkAnswers(); // Appel de la fonction pour vérifier les réponses
    });

    function checkAnswers() {
        let questions = document.querySelectorAll('.question-item');
        resetAnswerStyles(questions);
        let currentAllCorrect = true; // Variable pour suivre si toutes les réponses sont correctes pour cette soumission

        questions.forEach(function (question) {
            let correctAnswer = question.querySelector('.answer[value="true"]');
            let answers = question.querySelectorAll('.answer');
            let isCorrectSelected = Array.from(answers).some(answer => answer.checked && answer.value === 'true');

            if (!isCorrectSelected) {
                highlightIncorrectQuestion(question);
                currentAllCorrect = false;
            } else {
                highlightCorrectQuestion(question);
            }
        });

        // Comparer l'état actuel avec l'état précédent
        if (currentAllCorrect && !allCorrect) {
            allCorrect = true;
            congratulationMessage();
        } else if (!currentAllCorrect && allCorrect) {
            // L'utilisateur a répondu correctement précédemment, mais la réponse actuelle est incorrecte
            allCorrect = false;
            hideCongratulationsMessage();
        }
    }

    function resetAnswerStyles(questions) {
        questions.forEach(function (question) {
            question.classList.remove('correct', 'incorrect');
        });
    }

    function highlightIncorrectQuestion(question) {
        question.classList.add('incorrect');
    }

    function highlightCorrectQuestion(question) {
        question.classList.add('correct');
    }

    function congratulationMessage() {
        // Affichez le message de félicitations seulement si toutes les réponses sont correctes
        if (allCorrect) {
            alertDiv.style.display = 'block';
            localStorage.setItem('quizSuccess', 'true');
            
            // Masquer le message après 1.3 secondes
            setTimeout(function() {
                hideCongratulationsMessage();
            }, 1300);
        }
    }       

    function hideCongratulationsMessage() {
        alertDiv.style.display = 'none';
        localStorage.removeItem('quizSuccess');
    }
});
