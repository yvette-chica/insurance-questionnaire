import React, { Component } from 'react';
import { Layout } from 'antd';
import './style.scss';

const { Header, Content } = Layout;

class SiteLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            <Layout className="site-layout">
                <Header className="site-layout__header">
                    <span className="site-layout__title">
                        Insurance Questionnaire
                    </span>
                </Header>
                <Content className="site-layout__content">
                    {children}
                </Content>
            </Layout> 
        );
    }
}

export default SiteLayout;
