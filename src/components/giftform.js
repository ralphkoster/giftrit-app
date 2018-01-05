import React from 'react'
import Dropzone from 'react-dropzone'

import '../stylesheets/components/_giftform.scss';

const url = 'https://giftrit-service.herokuapp.com/api/gifts';

export default class GiftForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            title:'',
            amount:'',
            description:'',
            created: new Date().toISOString().slice(0,10),
            modified: new Date().toISOString().slice(0,10),
            userId: 2,
            karma: 85
        }
    }

    onDrop(files) {
        this.setState({
            files: files
        });
    }

    handleSubmit = e => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(window.localStorage['access_token'])
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                amount: this.state.amount,
                created: this.state.created,
                modified: this.state.modified,
                userId: 2,
                karma: 85
            })
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(response => {
            this.setState({
                title: '',
                description: '',
                amount: '',
                created: this.state.created,
                modified: this.state.modified,
                userId: 0,
                type: 'success',
                message: 'Thank you for creating a new gift.'
            });
            console.log("Gift created successfully! " + response);
        }).catch(error => {
            this.setState({
                title: this.state.title,
                description: this.state.description,
                amount: this.state.amount,
                created: this.state.created,
                modified: this.state.modified,
                userId: 2,
                type: 'danger',
                message: 'Failed to create a new gift. Please try again or contact us via contact form.'
            });
            console.log("Failed to create a new gift! " + error.message);
        });

        e.preventDefault();
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        return (
            <div className="gift-form-container">
                <form className="gift-form" onSubmit={this.handleSubmit}>
                    <div className="gift-form-inputs">
                        <div className="gift-form-images">
                            <div className="dropzone">
                                <Dropzone accept="image/jpeg, image/png"
                                          onDrop={this.onDrop.bind(this)}>
                                    {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                                        if (isDragActive) {
                                            return "This file is authorized";
                                        }
                                        if (isDragReject) {
                                            return "This file is not authorized";
                                        }
                                        return acceptedFiles.length || rejectedFiles.length
                                            ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
                                            : "Drag images here to visualize your gift";
                                    }}
                                </Dropzone>
                            </div>
                            <aside>
                                <ul>
                                    {
                                        this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                                    }
                                </ul>
                            </aside>
                        </div>
                        <div className="gift-form-data">
                            <h2>State your wish...</h2>

                            <div className="gift-title">
                                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Enter a name for your gift" required />
                            </div>
                            <div className="gift-amount">
                                <input type="number" name="amount" value={this.state.amount} onChange={this.handleChange} placeholder="CHF" required />
                                <span>Enter the max amount of money you need to get this gift</span>
                            </div>
                            <div className="gift-description">
                                <textarea name="description" value={this.state.description} onChange={this.handleChange} placeholder="Enter a description for your gift. Your story decides, if a giftr wants to help you or not" required /></div>
                        </div>
                    </div>
                    <div className="gift-form-submit">
                        <div className="gift-gkp">This wish requires <span>150 gkp</span></div>
                        <div className="gift-gkp">After you stated your wish, you will have 100 bkp</div>
                        <button>That sounds fair!</button>
                        <a href="/" className="cancel">Cancel</a>
                    </div>
                </form>
            </div>
        );
    }
}