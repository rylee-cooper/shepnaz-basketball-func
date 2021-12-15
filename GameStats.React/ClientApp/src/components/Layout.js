import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { MessageDisplay } from './shared/Message';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavMenu />
                <Container className="d-flex flex-column flex-grow-1 mb-5">
                    <MessageDisplay />
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
