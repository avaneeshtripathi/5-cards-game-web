class AdditionalStats extends React.Component{
    constructor (props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.showNotification = this.showNotification.bind(this);
    }

    onSubmit (status, event = {preventDefault(){}}) {
        event.preventDefault();
        if (status) {
            this.showNotification("Love to see people are fun loving.", status);
        } else {
            this.showNotification("I don't understand why people are so boring.", status);
        }
    }

    showNotification (textMessage, status) {
        this.refs.notificationMessage.textContent = textMessage;
        this.refs.notificationMessage.setAttribute('style', 'opacity: 1');
        setTimeout(() => {
            this.refs.notificationMessage.setAttribute('style', 'opacity: 0');
            this.props.setAviOneup({status: status, value: 50});
        }, 1000);
    }

    render () {
        return (
            <div className="playerFormWrapper additionalStatsForm">
                <div ref="notificationMessage" style={{opacity: 0}} className="alert alert-info notificationMessage">
                    I don&#39;t understand why people are so boring.
                </div>
                <h3>Do you want to play with @v! OneUp?</h3>
                <h4>Rules</h4>
                <ul className="oneupRules">
                    <li>Lorem Epsum</li>
                    <li>Lorem Epsum</li>
                    <li>Lorem Epsum</li>
                    <li>Lorem Epsum</li>
                </ul>
                <div className="text-center">
                    <button className="btn btn-info" onClick={this.onSubmit.bind(this, true)}>Yes, I want to add more fun to it!</button>
                    <button className="btn btn-default" onClick={this.onSubmit.bind(this, false)}>No, I want to play my usual boring game.</button>
                </div>
            </div>
        );
    }
};

export default AdditionalStats;
