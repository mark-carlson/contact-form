import React, {Component} from 'react';
import { Button, Card, Col, Input, Preloader, Row } from 'react-materialize';
import SweetAlert from 'sweetalert-react'
import 'sweetalert/dist/sweetalert.css';
import './Contact.css';

export class Contact extends Component {
    state = {
        email: '',
        subject: '',
        body: '',
        sendSuccessful: false,
        sendFailure: false,
        emailValid: false,
        isSent: false,
        isSending: false
    }

    handleChange = (evt) => {
        const {name, value} = evt.target;
        if (name === 'email') {
            const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            this.setState({
                emailValid
            });
        }
        this.setState({
            [name]: value
        });
    }

    sendForm = () => {
        this.setState({
            isSending: true
        });

        fetch('api/v1/send', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                email: this.state.email,
                subject: this.state.subject,
                body: this.state.body
            })
        }).then((res) => {
            if (res.status === 503) {
                this.setState({
                    sendSuccessful: false,
                    isSent: false,
                    isSending: false,
                    sendFailure: true
                });
            }
            return res.json();
        }).then((data) => {
            if (data.message === 'mail sent') {
                this.setState({
                    sendSuccessful: true,
                    sendFailure: false,
                    email: '',
                    subject: '',
                    body: '',
                    isSent: true,
                    isSending: false,
                    emailValid: false
                });
            }
        });
    }

    buttonContent = () => {
        if (this.state.isSending) {
            return (
                <Preloader size="small" />
            )
        } else {
            return 'Send';
        }
    }

    render() {
        return (
            <Row>
                <Col s={12} m={6} offset="m3">
                    <Card
                        className="darken-1"
                        textClassName="grey-text"
                        title="Email Form"
                        >
                            <Input
                                value={this.state.email}
                                name="email"
                                type="email"
                                s={12}
                                label="Email Address"
                                onChange={this.handleChange}
                                className={(this.state.email.length &&
                                !this.state.emailValid) ? 'invalid' : ''}
                                autoComplete="off"
                            />
                            <Input
                                value={this.state.subject}
                                name="subject"
                                type="text"
                                s={12}
                                label="Subject"
                                onChange={this.handleChange}
                                autoComplete="off"
                            />
                            <Input
                                value={this.state.body}
                                name="body"
                                type="textarea"
                                s={12}
                                label="Message"
                                onChange={this.handleChange}
                                height="300px"
                            />
                            <Button
                                s={3}
                                wave='light'
                                disabled={!this.state.email ||
                                !this.state.subject ||
                                !this.state.body ||
                                !this.state.emailValid ||
                                this.isSending ||
                                this.isSent}
                                onClick={this.sendForm}
                            >
                            {this.buttonContent()}
                            </Button>

                            <SweetAlert
                                show={this.state.sendSuccessful}
                                type="success"
                                title="Email Sent"
                                text="Your email has been sent.  Thank you!"
                                onConfirm={() => this.setState({ sendSuccessful: false})}
                            />
                            <SweetAlert
                                show={this.state.sendFailure}
                                type="error"
                                title="Email Failed"
                                text="Your email was not sent.  Please try again."
                                onConfirm={() => this.setState({sendFailure: false})}
                            />
                    </Card>
                </Col>
            </Row>
        )
    }
}