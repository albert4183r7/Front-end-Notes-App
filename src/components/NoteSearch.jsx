import React from 'react'

class NoteSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchKeyword: '',
        }

        this.onSearchEventHandler = this.onSearchEventHandler.bind(this);
    }

    onSearchEventHandler(event) {
        this.setState({ searchKeyword: event.target.value });
        this.props.onSearch(event.target.value);
    }

    render () {
        return (
            <div className="note-search">
                <input type='text' placeholder='Cari catatan...' value={this.state.searchKeyword} onChange={this.onSearchEventHandler} />
            </div>
        );
    }
}

export default NoteSearch;