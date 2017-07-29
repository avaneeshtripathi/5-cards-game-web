import {getSession, setSession} from '../../utils/sessionUtils';
import {getClassSet} from '../../utils/appUtils';

const oneupPoints = [50, 25, 10];

class GamePlay extends React.Component{
    constructor (props) {
        super(props);
        this.playerList = getSession('playerList');
        this.aviOneup = getSession('aviOneup');
        this.state = {
            playerData: getSession('playerData')
                ? getSession('playerData')
                : underscore.map(this.playerList, (row, key) => {
                      return {
                          name: row,
                          points: [],
                          total: 0,
                          oneup: []
                      };
                  }),
            editGameLimit: false,
            gameLimit: getSession('gameLimit')
        };
        this.updatePointsTable = this.updatePointsTable.bind(this);
        this.getMaxArrayLength = this.getMaxArrayLength.bind(this);
        this.viewResults = this.viewResults.bind(this);
        this.editGameLimit = this.editGameLimit.bind(this);
    }

    updatePointsTable (playerIndex, pointIndex, event) {
        if (event) {
            let playerData = this.state.playerData;
            playerData[playerIndex].points[pointIndex] = Number(event.target.value);
            playerData[playerIndex].oneup[pointIndex] = false;
            playerData[playerIndex].total = underscore.reduce(playerData[playerIndex].points, (memo, num) => (memo + num), 0);
            if (playerData[playerIndex].total >= this.state.gameLimit.value && this.aviOneup.status) {
                let oneupIndex = underscore.indexOf(playerData[playerIndex].points, 50);
                if (oneupIndex !== -1) {
                    playerData[playerIndex].points[oneupIndex] = playerData[playerIndex].points[oneupIndex] - this.aviOneup.value;
                    playerData[playerIndex].total = playerData[playerIndex].total - this.aviOneup.value;
                    playerData[playerIndex].oneup[oneupIndex] = true;
                    let oneupPointIndex = underscore.indexOf(oneupPoints, this.aviOneup.value);
                    this.aviOneup.value = oneupPoints[oneupPointIndex + 1];
                    if (!this.aviOneup.value) {
                        this.aviOneup.value = 50;
                        this.aviOneup.status = false;
                    }
                    setSession('aviOneup', this.aviOneup);
                }
            }
            if (playerData[playerIndex].total >= this.state.gameLimit.value) {
                playerData[playerIndex].rank = getSession('playerRank');
                playerData[playerIndex].hasFinished = true;
                setSession('playerRank', getSession('playerRank') - 1);
                if (this.state.gameLimit.isEditable) {
                    this.state.gameLimit.isEditable = false;
                    setSession('gameLimit', this.state.gameLimit);
                }
            }
            setSession('playerData', playerData);
            let playerCount = underscore.countBy(playerData, (row) => row.hasFinished ? 'finished' : 'notFinished');
            if (playerCount.notFinished === 1) {
                this.viewResults();
            }
            this.setState({
                playerData: playerData
            });
        }
    }

    getMaxArrayLength () {
        let arrayLengths = [];
        underscore.times(this.playerList.length, (key) => {
            arrayLengths.push(this.state.playerData[key].points.length);
        });
        return Math.max(...arrayLengths);
    }

    viewResults () {
        this.props.showGameResults();
    }

    editGameLimit (status, event = {preventDefault(){}}) {
        event.preventDefault();
        if (!status) {
            this.state.gameLimit.value = this.refs.gameLimitInput.value;
            setSession('gameLimit', this.state.gameLimit);
        }
        this.setState({
            editGameLimit: status
        });
    }

    render () {
        let playerData = this.state.playerData,
            maxArrayLength = this.getMaxArrayLength();
        return (
            <div className="gamePlayView">
                <ul ref="gamePlayWrapper" className="gamePlayWrapper displayTable">
                    <li className="displayTableRow" key={Math.random()}>
                        {underscore.times(this.playerList.length, (columnKey) => {
                            return (
                                <div style={{width: `${100/this.playerList.length}%`}} className={playerData[columnKey].total >= this.state.gameLimit.value ? "playerFinished displayTableCell tableHeader" : 'displayTableCell tableHeader'} key={columnKey}>
                                    {this.playerList[columnKey]}
                                </div>
                            );
                        })}
                    </li>
                    {underscore.times(maxArrayLength + 1, (rowKey) => {
                        return (
                            <li className="displayTableRow" key={rowKey}>
                                {underscore.times(this.playerList.length, (columnKey) => {
                                    let cellClass = getClassSet({
                                        'displayTableCell': true,
                                        'playerFinished': playerData[columnKey].total >= this.state.gameLimit.value,
                                        'oneupWrapper': playerData[columnKey].oneup[rowKey]
                                    });
                                    return (
                                        <div className={cellClass} key={columnKey}>
                                            {playerData[columnKey].total < this.state.gameLimit.value && rowKey >= (maxArrayLength - 1)
                                                ? <input type="number" defaultValue={playerData[columnKey].points[rowKey]} onBlur={this.updatePointsTable.bind(this, columnKey, rowKey)} />
                                                : typeof playerData[columnKey].points[rowKey] !== 'undefined' ? playerData[columnKey].points[rowKey] : '-'
                                            }
                                        </div>
                                    );
                                })}
                            </li>
                        );
                    })}
                    <li className="displayTableRow" key={Math.random()}>
                        {underscore.times(this.playerList.length, (columnKey) => {
                            return (
                                <div className={playerData[columnKey].total >= this.state.gameLimit.value ? "playerFinished displayTableCell tableHeader" : 'displayTableCell tableHeader'} key={columnKey}>
                                    {playerData[columnKey].total}
                                </div>
                            );
                        })}
                    </li>
                </ul>
                {this.state.editGameLimit
                    ? <form className="showResultsButton" onSubmit={this.editGameLimit.bind(this, false)}>
                          <input className="gamePlayLimitInput" ref="gameLimitInput" type="number" min="1" defaultValue={this.state.gameLimit.value} />
                          <button className="glyphicon glyphicon-ok-sign gamePlayLimitButton"></button>
                      </form>
                    : <div className="showResultsButton">
                          Game Limit: {this.state.gameLimit.value}
                          {this.state.gameLimit.isEditable
                              ? <button className="glyphicon glyphicon-edit gamePlayLimitEditButton cursorPointer" onClick={this.editGameLimit.bind(this, true)}></button>
                              : null
                          }
                      </div>
                }
                <div className="showResultsButton gamePlayResetButton cursorPointer" onClick={this.props.resetGame}>
                    Reset Game
                </div>
            </div>
        );
    }
};

export default GamePlay;
