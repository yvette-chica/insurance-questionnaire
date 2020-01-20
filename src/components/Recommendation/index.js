import React, { Component } from 'react';
import { Card } from 'antd';

export default class  Recommendation extends Component {
    state = {
        recommendation: [],
    }

    componentDidMount() {
        if (localStorage.questionnaireState) {
            const recommendation = JSON.parse(localStorage.recommendation);
            this.setState({ recommendation });
        }
    }

    render() {
        return (
            <div>
                <h1>We got your recommendation</h1>
                <h3>
                    Based on your answers, this is what makes sense for you
                    and what you should pay.
                </h3>
                {
                    this.state.recommendation.map(
                        (option, index) => (
                            <Card key={index} style={{ maxWidth: 800 }}>
                                <div>
                                    {option.type}
                                </div>
                                <div>
                                    {`${option.price.amount} euros per ${option.price.periodicity}`}
                                </div>
                            </Card>
                        )
                    )
                }
            </div>
        );
    }
}
