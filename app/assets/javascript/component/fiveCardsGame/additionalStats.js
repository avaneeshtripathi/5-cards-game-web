class AdditionalStats extends React.Component{
    constructor (props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit (status, event = {preventDefault(){}}) {
        event.preventDefault();
        this.props.setAviOneup({status: status, value: 50});
    }

    render () {
        return (
            <div className="playerFormWrapper additionalStatsForm">
                <h3>Do you want to play with @v! OneUp?</h3>
                <h5 className="text-center">&#34;The player must have scored a 50 <b>anyhow</b>.&#34;</h5>
                <h4>Rules</h4>
                <ul className="oneupRules text-justify">
                    <li>The first person to cross the limit will get a oneup of <b>50 points</b>.</li>
                    <li>The second person will grab a oneup of <b>25 points</b>.</li>
                    <li>The third person will get a oneup of <b>10 points</b>.</li>
                    <li>If you don&#39;t fall in any of the above, you are definitely having a hard time mate!</li>
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
