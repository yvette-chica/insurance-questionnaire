import React, { Component } from 'react';
import { Card, Result } from 'antd';

import './style.scss';

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
            <div className="recommendation__container">
                <Result
                    status="success"
                    title="We got your recommendation"
                    subTitle="Based on your answers, this is what makes sense for you
                    and what you should pay."
                />
                {
                    this.state.recommendation.map(
                        (option, index) => (
                            <Card key={index} style={{ maxWidth: 800 }}>
                                <div className="insurance-type">
                                    {option.type.toLowerCase().replace('_', ' ')}
                                </div>
                                <div className="price">
                                    {`${option.price.amount} euros per ${option.price.periodicity.toLowerCase()}`}
                                </div>
                            </Card>
                        )
                    )
                }
            </div>
        );
    }
}
