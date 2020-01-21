import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Card } from 'antd';
import setAuthToken from '../../utils/setAuthorizationToken';
import { sendQuestionnaire, getRecommendation } from '../../utils/requests';
import DisplayError from '../DisplayError';
import { questions } from '../../questions';
import UserInput from './UserInput';

import './style.scss';

class Questionnaire extends Component {
    state = { 
        questions,
        currentQuestionIndex: 0,
        previousQuestionIndices: [],
        error: null,
        isLoading: false,
    };

    componentDidMount() {
        // Check if the questionaire state is saved in localStorage
        if (localStorage.questionnaireState) {
            const newState = JSON.parse(localStorage.questionnaireState);
            this.setState(newState);
        }
    }

    saveQuestionnaireState = () => {
        const { questions, currentQuestionIndex, previousQuestionIndices} = this.state;
        localStorage.setItem('questionnaireState', JSON.stringify({
            questions, currentQuestionIndex, previousQuestionIndices,
        }));
    }

    handleUserInput = userInput => {
        const { questions, currentQuestionIndex } = this.state;
        const updatedQuestions  = [...questions];
        updatedQuestions[currentQuestionIndex].answer = userInput;

        this.setState({
            questions: updatedQuestions,
        });
    }

    handlePrevious = () => {
        const { previousQuestionIndices } = this.state;
        const updatedPreviousQuestionIndices = [...previousQuestionIndices];
        const newCurrentQuestionIndex = updatedPreviousQuestionIndices.pop();
        this.setState({
            currentQuestionIndex: newCurrentQuestionIndex,
            previousQuestionIndices: updatedPreviousQuestionIndices,
        });
        this.saveQuestionnaireState();
    }

    handleNext = () => {
        const { questions, currentQuestionIndex, previousQuestionIndices } = this.state;
        let nextQuestionIndex = currentQuestionIndex;
        const currentQuestion = questions[currentQuestionIndex];

        // Only go to the next question if one exists & user has input an answer
        if (questions[currentQuestionIndex + 1] && currentQuestion.answer){
            nextQuestionIndex += 1;
            if (currentQuestion.options) {
                const optionSelected = currentQuestion.options.find(option => option.value === currentQuestion.answer);
                // Skip the following question if the selected option has the isNextQuestion skipped flag
                if (optionSelected.isNextQuestionSkipped) {
                    nextQuestionIndex += 1;
                }
            }

            this.setState({
                currentQuestionIndex: nextQuestionIndex,
                previousQuestionIndices: [
                    ...previousQuestionIndices,
                    currentQuestionIndex,
                ],
            });
            this.saveQuestionnaireState();
        }
    }

    handleSubmit = async () => {
        this.saveQuestionnaireState();
        this.setState({ isLoading: true });
        const { questions } = this.state;
        const requestObject = {};

        questions.forEach(question => {
            if (question.paramKey) {
                requestObject[question.paramKey] = question.answer || question.defaultAnswer;
            }
        })

        try {
            let response = await sendQuestionnaire(requestObject);
            let jwt = response.data.jwt;
            setAuthToken(jwt);
            let recommendation =  await getRecommendation()
            localStorage.setItem('recommendation', JSON.stringify(recommendation.data));
            localStorage.setItem('jwt', jwt);
            window.location.reload(true);
        } catch(error) {
            this.setState({ error })
        }
    }

    render() {
        if (localStorage.jwt) {
            return <Redirect to={{ pathname: '/recommendations' }} />
        } else if (this.state.error) {
            return <DisplayError error={this.state.error} />;
        }

        const { currentQuestionIndex, questions, isLoading } = this.state;
        const currentQuestion = questions[currentQuestionIndex];
        const finalQuestionIndex = questions.length - 1;

        return (
            <div className="questionaire__container">
                <Card
                    title={currentQuestion.prompt}
                    bordered={false}
                    style={{ maxWidth: 800 }}
                >
                    <UserInput
                        handleUserInput={this.handleUserInput}
                        handleNext={this.handleNext}
                        question={currentQuestion}
                    />
                    <div className="questionaire__buttons">
                        {currentQuestionIndex > 0 && (
                            <Button
                                onClick={this.handlePrevious}
                                type="primary"
                            >
                                Previous
                            </Button>
                        )}
                        {currentQuestionIndex < finalQuestionIndex && (
                            <Button
                                onClick={this.handleNext}
                                type="primary"
                                disabled={!currentQuestion.answer}
                            >
                                Next
                            </Button>
                        )}
                        {currentQuestionIndex === finalQuestionIndex && (
                            <Button
                                onClick={this.handleSubmit}
                                type="primary"
                                loading={isLoading}
                            >
                                Submit Answers
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        );
    }
}

export default Questionnaire 
