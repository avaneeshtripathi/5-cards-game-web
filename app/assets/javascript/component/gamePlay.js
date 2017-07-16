import {getSession, setSession} from '../utils/sessionUtils';

class GamePlay extends React.Component{
    constructor (props) {
        super(props);
        this.playerList = getSession('playerList');
        this.gameLimit = getSession('gameLimit');
        this.state = {
            playerData: getSession('playerData')
                ? getSession('playerData')
                : _.map(this.playerList, (row, key) => {
                      return {
                          name: row,
                          points: [],
                          total: 0
                      };
                  })
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.updatePointsTable = this.updatePointsTable.bind(this);
        this.getMaxArrayLength = this.getMaxArrayLength.bind(this);
        this.viewResults = this.viewResults.bind(this);
    }

    onSubmit (event = {preventDefault(){}}) {
        event.preventDefault();
        let gameLimit = this.refs.nameInput.value;
        if (gameLimit) {
            this.props.setGameLimit(gameLimit);
        }
    }

    updatePointsTable (playerIndex, pointIndex, event) {
        if (event) {
            let playerData = this.state.playerData;
            playerData[playerIndex].points[pointIndex] = Number(event.target.value);
            playerData[playerIndex].total = _.reduce(playerData[playerIndex].points, (memo, num) => (memo + num), 0);
            if (playerData[playerIndex].total >= this.gameLimit) {
                playerData[playerIndex].rank = getSession('playerRank');
                setSession('playerRank', getSession('playerRank') - 1);
            }
            setSession('playerData', playerData);
            this.setState({
                playerData: playerData
            });
        }
    }

    getMaxArrayLength () {
        let arrayLengths = [];
        _.times(this.playerList.length, (key) => {
            arrayLengths.push(this.state.playerData[key].points.length);
        });
        return Math.max(...arrayLengths);
    }

    viewResults () {
        this.props.showGameResults();
    }

    render () {
        let playerData = this.state.playerData,
            maxArrayLength = this.getMaxArrayLength();
        return (
            <div className="gamePlayView">
                <ul className="gamePlayWrapper displayTable">
                    <li className="displayTableRow" key={Math.random()}>
                        {_.times(this.playerList.length, (columnKey) => {
                            return (
                                <div style={{width: `${100/this.playerList.length}%`}} className={playerData[columnKey].total >= this.gameLimit ? "playerFinished displayTableCell tableHeader" : 'displayTableCell tableHeader'} key={columnKey}>
                                    {this.playerList[columnKey]}
                                </div>
                            );
                        })}
                    </li>
                    {_.times(maxArrayLength + 1, (rowKey) => {
                        return (
                            <li className="displayTableRow" key={rowKey}>
                                {_.times(this.playerList.length, (columnKey) => {
                                    return (
                                        <div className={playerData[columnKey].total >= this.gameLimit ? "playerFinished displayTableCell" : 'displayTableCell'} key={columnKey}>
                                            {playerData[columnKey].total < this.gameLimit
                                                ? <input type="number" defaultValue={playerData[columnKey].points[rowKey]} onBlur={this.updatePointsTable.bind(this, columnKey, rowKey)} />
                                                : playerData[columnKey].points[rowKey] ? playerData[columnKey].points[rowKey] : '-'
                                            }
                                        </div>
                                    );
                                })}
                            </li>
                        );
                    })}
                    <li className="displayTableRow" key={Math.random()}>
                        {_.times(this.playerList.length, (columnKey) => {
                            return (
                                <div className={playerData[columnKey].total >= this.gameLimit ? "playerFinished displayTableCell tableHeader" : 'displayTableCell tableHeader'} key={columnKey}>
                                    {playerData[columnKey].total}
                                </div>
                            );
                        })}
                    </li>
                </ul>
                {maxArrayLength
                    ? <div className="showResultsButton cursorPointer" onClick={this.viewResults}>View Results</div>
                    : null
                }
            </div>
        );
    }
};

export default GamePlay;
