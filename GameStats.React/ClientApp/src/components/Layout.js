import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import { MessageDisplay } from './shared/Message';

const Layout = (props) => {
    return (
        <div>
            <NavMenu />
            <Container className="d-flex flex-column flex-grow-1 mb-5">
                <MessageDisplay />
                {props.children}
            </Container>
        </div>
    );
}

export default Layout;