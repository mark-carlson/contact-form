import React, {Component} from 'react';
import { Button, Card, Col, Input, Preloader, Row, Icon } from 'react-materialize';
import SweetAlert from 'sweetalert-react'
import 'sweetalert/dist/sweetalert.css';
import './Contact.css';

export class Contact extends Component {
    state = {
        email: '',
        subject: '',
        body: '',
        copy: false,
        sendSuccessful: false,
        sendFailure: false,
        emailValid: false,
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
        if (name === 'copy') {
            return this.setState({
                copy: !this.state.copy
            });
        }
        this.setState({
            [name]: value
        });
    }

    sendForm = () => {
        const { body, copy, email, subject } = this.state;
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
                email,
                copy,
                subject,
                body
            })
        }).then((res) => {
            if (res.status === 503) {
                this.setState({
                    sendSuccessful: false,
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
                    copy: false,
                    isSending: false,
                    emailValid: false
                });
            }
        });
    }

    buttonContent = () => {
        if (this.state.isSending) {
            return (
                    <Preloader small />
            )
        } else {
            return (
                <div>
                    <Icon right>send</Icon>
                    <span>Send</span>
                </div>
            );
        }
    }

    render() {
        const { body, copy, email, emailValid, isSending, sendFailure, sendSuccessful, subject } = this.state;
        return (
            <Row>
                <Col s={12} m={6} offset="m3">
                    <Card
                        className="darken-1"
                        textClassName="grey-text"
                        title="Email Form"
                        >
                            <Row>
                                <Input
                                    value={email}
                                    name="email"
                                    type="email"
                                    s={12}
                                    label="Email Address"
                                    onChange={this.handleChange}
                                    className={(email.length &&
                                    !emailValid) ? 'invalid' : ''}
                                    autoComplete="off"
                                />
                            </Row>
                            <Row>
                                <Input
                                    value={subject}
                                    name="subject"
                                    type="text"
                                    s={12}
                                    label="Subject"
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                />
                            </Row>
                            <Row>
                                <Input
                                    value={body}
                                    name="body"
                                    type="textarea"
                                    s={12}
                                    label="Message"
                                    onChange={this.handleChange}
                                    height="300px"
                                />
                            </Row>
                            <Row>
                                <Input
                                    checked={(copy) ? 'checked': false}
                                    name="copy"
                                    id="copy"
                                    type="checkbox"
                                    label="Send a copy to you?"
                                    onChange={this.handleChange}
                                    s={12}
                                />
                            </Row>
                            <Row>
                                <Button
                                    s={3}
                                    large
                                    wave='light'
                                    disabled={!email ||
                                    !subject ||
                                    !body ||
                                    !emailValid ||
                                    isSending}
                                    onClick={this.sendForm}
                                >
                                {this.buttonContent()}
                                </Button>
                            </Row>


                            <SweetAlert
                                show={sendSuccessful}
                                type="success"
                                title="Email Sent"
                                text="Your email has been sent.  Thank you!"
                                onConfirm={() => this.setState({ sendSuccessful: false})}
                            />
                            <SweetAlert
                                show={sendFailure}
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