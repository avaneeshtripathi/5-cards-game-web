class PlayerDetails extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            playerList: []
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
        this.doneAdding = this.doneAdding.bind(this);
    }

    onSubmit (event = {preventDefault(){}}) {
        event.preventDefault();
        let playerName = this.refs.nameInput.value;
        if (playerName && playerName.trim()) {
            this.refs.nameInput.value = '';
            this.setState({
                playerList: [...this.state.playerList, playerName.trim().toLowerCase()]
            });
        }
    }

    removePlayer (key, event = {preventDefault(){}}) {
        event.preventDefault();
        let playerList = this.state.playerList;
        playerList.splice(key, 1);
        this.setState({
            playerList: playerList
        });
    }

    doneAdding () {
        if (this.state.playerList && this.state.playerList.length > 1) {
            this.props.updatePlayerList(this.state.playerList);
        } else {
            this.refs.notificationMessage.setAttribute('style', 'opacity: 1');
            setTimeout(() => {
                this.refs.notificationMessage.setAttribute('style', 'opacity: 0');
            }, 2000);
        }
    }

    render () {
        return (
            <div className="playerFormWrapper getPlayerDetailsForm">
                <div ref="notificationMessage" style={{opacity: 0}} className="alert alert-danger notificationMessage">
                    <strong>Hei!</strong> You need atleast two players to start.
                </div>
                <h3>Enter Player List</h3>
                <form className="getPlayerInfoForm" onSubmit={this.onSubmit}>
                    <div className="input-group">
                        <input autoFocus={true} required={true} ref="nameInput" type="text" className="form-control" placeholder="Enter Player Names" />
                        <span className="input-group-addon cursorPointer" onClick={this.onSubmit}>
                            <i className="glyphicon glyphicon-plus"></i>
                        </span>
                    </div>
                </form>
                {this.state.playerList && this.state.playerList.length
                    ? <ul className="playerListing clearfix">
                          {_.map(this.state.playerList, (row, key) => {
                              return (
                                  <li className="pull-left" key={key}>
                                      {row}
                                      <i className="glyphicon glyphicon-remove cursorPointer" onClick={this.removePlayer.bind(this, key)}></i>
                                  </li>
                              )
                          })}
                      </ul>
                    : null
                }
                <button className="btn btn-info" onClick={this.doneAdding}>Done adding players</button>
            </div>
        );
    }
};

export default PlayerDetails;
