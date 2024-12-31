import React from 'react';

class NoteInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            charLimit: 50,
        }

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event){
        const input = event.target.value;
        if (input.length <= 50) {
            this.setState({title: input, charLimit: 50 - input.length });
        }
    }

    onBodyChangeEventHandler(event){
        this.setState({body: event.target.value});
    }

    onSubmitEventHandler(event){
        event.preventDefault();
        this.props.addNote(this.state);
    }

    render() {
        return (
            <form onSubmit={this.onSubmitEventHandler}>
                <p className="note-input__title__char-limit">Sisa karakter: {this.state.charLimit}</p>
                <input className="note-input__title" type='text' placeholder='Ini adalah judul...' value={this.state.title} onChange={this.onTitleChangeEventHandler} maxLength={50}/>
                <textarea className="note-input__body" placeholder='Tuliskan catatanmu disini...' value={this.state.body} onChange={this.onBodyChangeEventHandler} />
                <button type='submit'>Buat</button>
            </form>
        )
    }
}

export default NoteInput;