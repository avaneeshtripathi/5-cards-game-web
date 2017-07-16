class GameStats extends React.Component{
    constructor (props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.showNotification = this.showNotification.bind(this);
    }

    onSubmit (event = {preventDefault(){}}) {
        event.preventDefault();
        let gameLimit = this.refs.nameInput.value;
        if (gameLimit) {
            if (gameLimit > 0) {
                this.props.setGameLimit(gameLimit);
            } else {
                this.showNotification('Game Limit must be greater than 0.');
            }
        } else {
            this.showNotification('Game Limit is required.');
        }
    }

    showNotification (textMessage) {
        this.refs.notificationMessage.textContent = textMessage;
        this.refs.notificationMessage.setAttribute('style', 'opacity: 1');
        setTimeout(() => {
            this.refs.notificationMessage.setAttribute('style', 'opacity: 0');
        }, 2000);
    }

    render () {
        return (
            <div className="playerFormWrapper gameStatsForm">
                <div ref="notificationMessage" style={{opacity: 0}} className="alert alert-danger notificationMessage"></div>
                <h3>Set Game Limit</h3>
                <form className="getPlayerInfoForm" onSubmit={this.onSubmit}>
                    <div className="input-group">
                        <input autoFocus={true} ref="nameInput" type="number" className="form-control" placeholder="Enter Game Limit" />
                    </div>
                    <button className="btn btn-info">Set Limit</button>
                </form>
            </div>
        );
    }
};

export default GameStats;
